// src/services/printer.ts

export interface OrderData {
  id: string;
  items: { name: string; qtty: number; price: number }[];
  total: number;
  customer: string;
}

class PrinterService {
  private isSimulation = true; // Muda pra false quando tiver a impressora

  async printOrder(order: OrderData): Promise<boolean> {
    if (this.isSimulation) {
      // Simula o delay de uma impressora real
      return new Promise((resolve) => {
        console.log(`🖨️ [MOCK] Imprimindo Pedido #${order.id}`);
        setTimeout(() => resolve(true), 2000);
      });
    }

    // Aqui entrará o código real da lib de Bluetooth futuramente
    return true;
  }

  // Função para "traduzir" o JSON do servidor para o formato de cupom
  formatTicket(order: OrderData): string {
    let ticket = `--- RANGOOO ---\n`;
    ticket += `Pedido: #${order.id}\n`;
    ticket += `Cliente: ${order.customer}\n`;
    ticket += `----------------\n`;
    order.items.forEach((item) => {
      ticket += `${item.qtty}x ${item.name}\n`;
    });
    ticket += `----------------\n`;
    ticket += `TOTAL: R$ ${order.total.toFixed(2)}\n\n\n`;
    return ticket;
  }
}

export const printerService = new PrinterService();
