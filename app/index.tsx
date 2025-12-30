import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Agente de Impressão Rangooo</Text>
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
