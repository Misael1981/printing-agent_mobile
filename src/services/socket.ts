// src/services/socket.ts
class SocketService {
  private socket: WebSocket | null = null;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  private isManualClose = false; // Para saber se nós fechamos ou se caiu

  connect(
    estabelecimentoId: string,
    onMessage: (data: any) => void,
    onStatusChange: (status: boolean) => void
  ) {
    this.isManualClose = false;

    // 1. Limpa a URL (remove barra final)
    const baseUrl = process.env.EXPO_PUBLIC_WS_URL?.replace(/\/$/, "");
    const secret = process.env.EXPO_PUBLIC_WS_SECRET;

    // 2. Monta a URL IDÊNTICA ao Electron
    // Formato: wss://link?token=...&restaurantId=...&role=agent
    const url = `${baseUrl}?token=${secret}&restaurantId=${estabelecimentoId}&role=agent`;

    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    if (this.socket) this.socket.close();

    console.log("🔁 Tentando conectar ao WS com as credenciais do Electron...");
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("🟢 Conectado ao servidor!");
      onStatusChange(true);

      // 3. 👋 ENVIAR O HANDSHAKE (Obrigatório pelo seu backend)
      const hello = JSON.stringify({
        type: "agent_hello",
        restaurantId: estabelecimentoId,
        agentName: "rangooo-mobile-agent",
        capabilities: ["print"],
      });

      this.socket?.send(hello);
      console.log("👋 Handshake 'agent_hello' enviado.");
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Trata o PING/PONG para manter a conexão viva
        if (data.type === "ping") {
          this.socket?.send(JSON.stringify({ type: "pong" }));
          return;
        }

        // Repassa as mensagens de pedido para o componente
        onMessage(data);
      } catch (e) {
        console.error("Erro ao processar mensagem:", e);
      }
    };

    this.socket.onclose = (e) => {
      onStatusChange(false);

      // Só tenta reconectar se não foi um fechamento manual (ex: logout)
      if (!this.isManualClose) {
        console.log("Conexão perdida. Reconectando em 5s...", e.reason);
        this.reconnectTimeout = setTimeout(() => {
          this.connect(estabelecimentoId, onMessage, onStatusChange);
        }, 5000);
      }
    };

    this.socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };
  }

  disconnect() {
    this.isManualClose = true;
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
