import React, { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// 1. Tipando a estrutura do Log
interface LogSectionProps {
  logs: string[];
}

const LogSection = ({ logs }: LogSectionProps) => {
  // Referência para o ScrollView para podermos fazer o "auto-scroll" depois
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <View style={styles.logSectionContainer}>
      <Text style={styles.logTitle}>Log de Atividades</Text>

      <View style={styles.logContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.logContent}
          // Isso aqui faz o scroll ir para o final automaticamente quando o conteúdo muda
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {logs.map((entry, index) => (
            <Text key={index} style={styles.logEntry}>
              {entry}
            </Text>
          ))}
          {logs.length === 0 && (
            <Text style={[styles.logEntry, { opacity: 0.5 }]}>
              Aguardando atividades...
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logSectionContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  logTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#e5e7eb",
    letterSpacing: 0.5,
  },
  logContainer: {
    backgroundColor: "#0b1f33", // Azul combinando com o InitialConfig
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  logContent: {
    height: 150, // Um pouco maior para caber mais histórico
  },
  logEntry: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 6,
    color: "#cbd5e1", // Texto cinza claro para não cansar a vista
    fontFamily: "System", // No Android/iOS usa a fonte padrão
  },
});

export default LogSection;
