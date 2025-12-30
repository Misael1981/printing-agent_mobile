import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Remove a barra de título chata
          contentStyle: { backgroundColor: "#061320" }, // Seu azul escuro global
        }}
      />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
