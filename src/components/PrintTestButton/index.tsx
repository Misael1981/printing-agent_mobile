import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// 1. Tipagem das Props
interface PrintTestButtonProps {
  onPress: () => void;
  disabled?: boolean; // O '?' torna o disabled opcional
}

const PrintTestButton = ({
  onPress,
  disabled = false,
}: PrintTestButtonProps) => {
  // Em TS, se definimos o default como false, ele já garante que é boolean
  // Mas o seu !!disabled é uma ótima prática de JS/TS para "limpar" o valor
  const isDisabled = !!disabled;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isDisabled && styles.buttonDisabled]}
        onPress={onPress}
        activeOpacity={0.85}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>🖨️ Imprimir teste</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20, // Ajuste leve para o mobile
    marginBottom: 20, // Espaço extra para não ficar colado na borda inferior
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12, // Um pouco mais arredondado seguindo a linha do InitialConfig
    alignItems: "center",
    // Feedback visual de elevação (Android)
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#475569", // Um cinza azulado mais escuro para o modo dark
    elevation: 0,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default PrintTestButton;
