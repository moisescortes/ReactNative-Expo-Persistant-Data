import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(255);
  const [blue, setBlue] = useState(255);

  const backgroundColor = `rgb(${red}, ${green}, ${blue})`;

  // Keys for AsyncStorage
  const STORAGE_KEYS = {
    RED: '@color_red',
    GREEN: '@color_green',
    BLUE: '@color_blue',
  };

  // Load stored color values when the app starts
  useEffect(() => {
    const loadColors = async () => {
      try {
        const savedRed = await AsyncStorage.getItem(STORAGE_KEYS.RED);
        const savedGreen = await AsyncStorage.getItem(STORAGE_KEYS.GREEN);
        const savedBlue = await AsyncStorage.getItem(STORAGE_KEYS.BLUE);

        if (savedRed !== null) setRed(parseInt(savedRed));
        if (savedGreen !== null) setGreen(parseInt(savedGreen));
        if (savedBlue !== null) setBlue(parseInt(savedBlue));
      } catch (error) {
        Alert.alert('Error', 'Failed to load saved colors');
      }
    };

    loadColors();
  }, []);

  // Save color values whenever they change
  const saveColor = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      Alert.alert('Error', 'Failed to save color');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>Adjust Background Color</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Red: {red}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          value={red}
          onValueChange={(value) => {
            setRed(value);
            saveColor(STORAGE_KEYS.RED, value);
          }}
          minimumTrackTintColor="red"
          thumbTintColor="red"
        />
        <Text style={styles.label}>Green: {green}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          value={green}
          onValueChange={(value) => {
            setGreen(value);
            saveColor(STORAGE_KEYS.GREEN, value);
          }}
          minimumTrackTintColor="green"
          thumbTintColor="green"
        />
        <Text style={styles.label}>Blue: {blue}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={255}
          step={1}
          value={blue}
          onValueChange={(value) => {
            setBlue(value);
            saveColor(STORAGE_KEYS.BLUE, value);
          }}
          minimumTrackTintColor="blue"
          thumbTintColor="blue"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 15,
  },
});
