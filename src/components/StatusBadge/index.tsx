import React from "react";
import { StyleSheet, Text, View } from "react-native";

// 1. Definimos a "cara" das propriedades do componente
interface StatusBadgeProps {
  label: string;
  status: string;
  variant?: "online" | "offline"; // O '?' diz que é opcional
}

// 2. Aplicamos a interface nas Props
const StatusBadge = ({
  label,
  status,
  variant = "offline",
}: StatusBadgeProps) => {
  const isOnline = variant === "online";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>

      <View
        style={[
          styles.badge,
          isOnline ? styles.badgeOnline : styles.badgeOffline,
        ]}
      >
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    color: "#e5e7eb",
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6, // Aumentei um tiquinho para ficar mais "clicável" visualmente
    borderRadius: 999,
    minWidth: 80, // Garante que o badge não fique minúsculo com textos curtos
    alignItems: "center",
  },
  badgeOnline: {
    backgroundColor: "#22c55e",
  },
  badgeOffline: {
    backgroundColor: "#ef4444",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
    textTransform: "uppercase", // Dá um ar mais oficial de "status"
  },
});

export default StatusBadge;
