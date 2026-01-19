import { View, Text, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import * as Speech from "expo-speech";

type Signal = "RED" | "YELLOW" | "GREEN";

export default function HomeScreen() {
  const [isActive, setIsActive] = useState(false);
  const [signal, setSignal] = useState<Signal>("RED");

  useEffect(() => {
    if (!isActive) return;

    let interval: number;

    Speech.speak("Blind pedestrian assistance started");

    interval = setInterval(() => {
      setSignal((prev) => {
        if (prev === "RED") {
          Speech.speak("Get ready. Signal is yellow.");
          return "YELLOW";
        }
        if (prev === "YELLOW") {
          Speech.speak("You may cross now. Signal is green.");
          return "GREEN";
        }
        Speech.speak("Please stop. Signal is red.");
        return "RED";
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Blind Pedestrian Assistant</Text>
        <Button title="Start Assistance" onPress={() => setIsActive(true)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assistance Active</Text>

      <Text
        style={[
          styles.signalText,
          signal === "RED" && { color: "red" },
          signal === "YELLOW" && { color: "orange" },
          signal === "GREEN" && { color: "green" },
        ]}
      >
        {signal}
      </Text>

      <Button
        title="Stop Assistance"
        onPress={() => {
          setIsActive(false);
          setSignal("RED");
          Speech.speak("Assistance stopped");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  signalText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
});