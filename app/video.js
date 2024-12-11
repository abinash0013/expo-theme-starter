import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
// import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { CameraType } from "expo-image-picker";

export default function Video() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef(null);

  // Request camera permissions
  React.useEffect(() => {
    (async () => {
      const { status } = await CameraType.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; 
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setRecording(true);
        const video = await cameraRef.current.recordAsync();
        console.log("Video recorded: ", video.uri);
        setRecording(false);
      } catch (error) {
        console.error("Error recording video: ", error);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setRecording(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        onCameraReady={() => setCameraReady(true)}
      >
        <View style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.recordButton,
              recording ? styles.recording : styles.notRecording,
            ]}
            onPress={recording ? stopRecording : startRecording}
            disabled={!cameraReady}
          >
            <MaterialIcons
              name={recording ? "stop" : "fiber-manual-record"}
              size={40}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  recordButton: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  recording: {
    backgroundColor: "red",
  },
  notRecording: {
    backgroundColor: "transparent",
  },
});
