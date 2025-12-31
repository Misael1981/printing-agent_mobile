import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 1. Tipando as Props:
// onChange espera uma string. onSubmit é uma função que não retorna nada (void).
interface InitialConfigProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

const InitialConfig = ({ value, onChange, onSubmit }: InitialConfigProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Configuração Inicial</Text>

        <Text style={styles.subtitle}>
          Insira o ID do Estabelecimento para começar:
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ID do Estabelecimento"
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChange} // O TS já sabe que onChangeText passa uma string
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default" // No mobile, é bom definir o teclado
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}
          activeOpacity={0.7} // Feedback visual de clique
        >
          <Text style={styles.buttonText}>Salvar e Conectar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%", // No mobile, melhor usar width que flex: 1 se for uma seção
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#061320",
  },
  container: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#0b1f33", // Azul um pouco mais claro que o fundo
    borderRadius: 16, // Deixei um pouco mais arredondado para o mobile
    padding: 24,
    // Sombra leve para dar profundidade (Android)
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#cbd5e1",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12, // Um pouco mais de área de toque (importante no mobile!)
    fontSize: 16, // Fonte 16 evita que o iOS dê zoom automático no input
    color: "#000000",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default InitialConfig;
