import Header from "@/components/Header";
import InitialConfig from "@/components/InitialConfig";
import LogSection from "@/components/LogSection";
import PrintTestButton from "@/components/PrintTestButton";
import StatusBadge from "@/components/StatusBadge";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [restaurantId, setRestaurantId] = useState("");
  const [logEntries, setLogEntries] = useState<string[]>([
    "✅ Aplicativo iniciado",
    "📁 Arquivo processado: documento.pdf",
    "🔄 Sincronização concluída",
    "⚠️ Atenção: Verifique conexão",
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <View style={styles.badges}>
          <StatusBadge
            label="Status impressora"
            status="Desconectado"
            variant="offline"
          />

          <StatusBadge
            label="Status Servidor"
            status="Conectado"
            variant="online"
          />
        </View>
        <InitialConfig
          value={restaurantId}
          onChange={setRestaurantId}
          onSubmit={() => {
            console.log("Conectar com:", restaurantId);
          }}
        />
        <LogSection logs={logEntries} />
        <PrintTestButton
          disabled={false}
          onPress={() => {
            console.log("🖨️ Teste de impressão");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Isso faz o SafeArea preencher a tela
    backgroundColor: "#061320", // Cor de fundo no SafeArea evita "piscada" branca
  },
  container: {
    flex: 1,
    backgroundColor: "#061320",
    alignItems: "center",
    paddingBottom: 16,
  },
  badges: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#e5e7eb",
  },
});
