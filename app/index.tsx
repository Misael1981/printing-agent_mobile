import { printerService } from "@/services/printer";
import { socketService } from "@/services/socket";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Componentes
import Header from "@/components/Header";
import InitialConfig from "@/components/InitialConfig";
import LogSection from "@/components/LogSection";
import PrintTestButton from "@/components/PrintTestButton";
import StatusBadge from "@/components/StatusBadge";

export default function Screen() {
  const [idInput, setIdInput] = useState(""); // Valor do TextInput
  const [isConnected, setIsConnected] = useState(false); // Status do Socket
  const [logs, setLogs] = useState<string[]>([]);

  // Função para adicionar logs sem duplicar esforço
  const addLog = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${msg}`, ...prev]);
  }, []);

  const handleConnect = () => {
    if (!idInput.trim()) return;

    addLog("🚀 Iniciando conexão...");

    socketService.connect(
      idInput,
      async (message) => {
        if (message.type === "print_order") {
          addLog(`📩 Pedido #${message.order.id} recebido do servidor`);

          const success = await printerService.printOrder(message.order);

          if (success) {
            addLog(
              `✅ Pedido #${message.order.id} enviado para a fila de impressão`
            );
          }
        }
      },
      (status) => {
        setIsConnected(status);
        if (status) {
          addLog("✅ Conectado ao servidor Rangooo!");
        } else {
          addLog("❌ Conexão perdida com o servidor.");
        }
      }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        {/* LÓGICA DE TRANSIÇÃO */}
        {!isConnected ? (
          // Se NÃO está conectado, mostra o input
          <InitialConfig
            value={idInput}
            onChange={setIdInput}
            onSubmit={handleConnect}
          />
        ) : (
          // Se ESTÁ conectado, mostra o painel de logs e badges
          <View style={styles.dashboard}>
            <View style={styles.badgesRow}>
              <StatusBadge
                label="Impressora"
                status="DESCONECTADA"
                variant="offline"
              />
              <StatusBadge
                label="Servidor"
                status="CONECTADO"
                variant="online"
              />
            </View>

            <LogSection logs={logs} />

            <PrintTestButton
              onPress={() => addLog("📑 Teste de impressão disparado...")}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#061320",
  },
  content: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  dashboard: {
    flex: 1,
    width: "100%",
  },
  badgesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});
