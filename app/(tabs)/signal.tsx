import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import * as Speech from "expo-speech";

import { Signal, getNextSignal, SIGNAL_DURATION } from "@/logic/trafficLogic";

export default function SignalScreen() {
  const [signal, setSignal] = useState<Signal>("RED");
  const [timeLeft, setTimeLeft] = useState(SIGNAL_DURATION["RED"]);

  useEffect(() => {
    Speech.speak(`${signal} signal`);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          setSignal((current) => getNextSignal(current));
          return SIGNAL_DURATION[getNextSignal(signal)];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [signal]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Traffic Signal</Text>

      <View
        style={[
          styles.signalCircle,
          signal === "RED" && styles.red,
          signal === "YELLOW" && styles.yellow,
          signal === "GREEN" && styles.green,
        ]}
      />

      <Text style={styles.text}>{signal}</Text>
      <Text style={styles.text}>Time left: {timeLeft}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  signalCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  red: {
    backgroundColor: "red",
  },
  yellow: {
    backgroundColor: "yellow",
  },
  green: {
    backgroundColor: "green",
  },
  text: {
    fontSize: 18,
    marginTop: 5,
  },
});
