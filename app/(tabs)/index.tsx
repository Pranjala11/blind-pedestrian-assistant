import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Signal = "RED" | "YELLOW" | "GREEN";

export default function HomeScreen() {
  const [signal, setSignal] = useState<Signal>("RED");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!running) return;

    let duration = 0;
    let message = "";

    if (signal === "RED") {
      duration = 10;
      message = "Red signal. Please stop.";
    } else if (signal === "YELLOW") {
      duration = 3;
      message = "Yellow signal. Get ready.";
    } else {
      duration = 15;
      message = "Green signal. You may cross now.";
    }

    Speech.stop();
    Speech.speak(message);

    setTimeLeft(duration);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          changeSignal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [signal, running]);

  const changeSignal = () => {
    if (signal === "RED") setSignal("YELLOW");
    else if (signal === "YELLOW") setSignal("GREEN");
    else setSignal("RED");
  };

  const startAssistance = () => {
    setRunning(true);
    setSignal("RED");
    Speech.speak("Blind pedestrian assistance started");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blind Pedestrian Assistant</Text>

      <View
        style={[
          styles.signal,
          signal === "RED"
            ? styles.red
            : signal === "YELLOW"
            ? styles.yellow
            : styles.green,
        ]}
      />

      {running && (
        <Text style={styles.timer}>
          {signal} | {timeLeft}s
        </Text>
      )}

      {!running && (
        <Button title="Start Assistance" onPress={startAssistance} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  signal: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  red: { backgroundColor: "red" },
  yellow: { backgroundColor: "yellow" },
  green: { backgroundColor: "green" },
  timer: {
    fontSize: 18,
    marginBottom: 20,
  },
});
