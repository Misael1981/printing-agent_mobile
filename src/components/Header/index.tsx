import { Image, StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@assets/images/logo-agente-60.png")}
        style={styles.imageLogo}
      />
      <View style={styles.containerText}>
        <Text style={styles.title} accessibilityRole="header">
          Agente de Impressão Rangooo
        </Text>
        <Text style={styles.textVersion}>Versão: v1.0.3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#424950",
  },
  imageLogo: {
    width: 52,
    height: 52,
    resizeMode: "contain",
  },
  containerText: {
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
  },
  textVersion: {
    fontSize: 12,
    color: "#b5b7bb",
    marginTop: 4,
  },
});

export default Header;
