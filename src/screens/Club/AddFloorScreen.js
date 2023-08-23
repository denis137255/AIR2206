import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';
import { StyleUtils } from '../../utils/StyleUtils';
import Svg, { Circle } from 'react-native-svg';

const AddFloorScreen = ({ route, navigation }) => {
  const { clubId } = route.params;
  const [numDots, setNumDots] = useState(1);
  const [dots, setDots] = useState([]);

 useEffect(() => {
    const maxTables = 36; // Maximum number of tables
    const evenlySpreadDots = [];
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height * 0.7;
    const maxCols = 6;
    const minGap = 20;

    const numCols = Math.min(maxCols, Math.floor(screenWidth / (minGap * 2)));
    const numRows = Math.ceil(numDots / numCols); // Calculate based on the number of dots and columns

    const colWidth = (screenWidth - minGap * (numCols - 1)) / numCols;
    const rowHeight = (screenHeight - minGap * (numRows - 1)) / numRows;

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const x = col * (colWidth + minGap) + minGap;
        const y = row * (rowHeight + minGap) + minGap;

        if (evenlySpreadDots.length < numDots && evenlySpreadDots.length < maxTables) {
          evenlySpreadDots.push({ x, y, radius: 8, color: 'blue', reserved:false });
        }
      }
    }

    setDots(evenlySpreadDots);
  }, [numDots]);

  const handleIncreaseDots = () => {
    if (numDots < 36) { // Maximum number of tables is 36
      setNumDots(prevValue => prevValue + 1);
    }
  };

  const handleDecreaseDots = () => {
    if (numDots > 1) {
      setNumDots(prevValue => prevValue - 1);
    }
  };
  const handleConfirm = async () => {
    try {
      const floorData = {
        clubId: clubId,
        dots: dots,
      };

      const floorDocRef = doc(FIRESTORE_INSTANCE, 'floor', clubId);
      await setDoc(floorDocRef, floorData);

      console.log('Floor data saved to Firebase for club with ID: ', clubId);
    } catch (error) {
      console.error('Error saving floor data: ', error);
    }
    navigation.navigate('Menu');
  };

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height * 0.7;
  const canvasWidth = screenWidth;
  const canvasHeight = screenHeight;

  return (
    <View style={StyleUtils.CENTERED_CONTAINER}>
      <Text style={styles.title}>Add Floor Plan</Text>

      <View style={styles.selectionContainer}>
        <Button title="-" onPress={handleDecreaseDots} />
        <Text style={styles.numDots}>{numDots}</Text>
        <Button title="+" onPress={handleIncreaseDots} />
      </View>

      <View style={[styles.canvasContainer, { width: canvasWidth, height: canvasHeight }]}>
        <Svg width={canvasWidth} height={canvasHeight} style={styles.canvas}>
          {dots.map((dot, index) => (
            <Circle
              key={index}
              cx={dot.x}
              cy={dot.y}
              r={dot.radius}
              fill={dot.color}
            />
          ))}
        </Svg>
      </View>

      <View style={StyleUtils.BUTTON_CONTAINER}>
        <View style={StyleUtils.BUTTON_WRAPPER}>
          <Button
            title="Confirm"
            onPress={handleConfirm}
            color={StyleUtils.PRIMARY_COLOR}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: StyleUtils.FONT_SIZE_LARGE,
    marginBottom: StyleUtils.SPACING_MEDIUM,
    color: StyleUtils.TEXT_COLOR,
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numDots: {
    fontSize: StyleUtils.FONT_SIZE_MEDIUM,
    marginHorizontal: StyleUtils.SPACING_MEDIUM,
    color: StyleUtils.TEXT_COLOR,
  },
  canvasContainer: {
    alignSelf: 'center',
    width: '100%',
    marginTop: StyleUtils.SPACING_MEDIUM,
  },
  canvas: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: StyleUtils.PRIMARY_COLOR,
  },
});

export default AddFloorScreen;
