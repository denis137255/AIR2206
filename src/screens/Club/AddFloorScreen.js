import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';
import { PRIMARY_COLOR, StyleUtils } from '../../utils/StyleUtils';
import Svg, { Circle, Path } from 'react-native-svg';

const AddFloorScreen = ({ route, navigation }) => {
  const { clubId } = route.params;
  const [numDots, setNumDots] = useState(1);
  const [dots, setDots] = useState([]);
  const [drawingMode, setDrawingMode] = useState(true);
  const [pathData, setPathData] = useState('');
  const [locked, setLocked] = useState(false);
  const [drawingMarker, setDrawingMarker] = useState(null);

  useEffect(() => {
    const maxTables = 36; // Maximum number of tables
    const evenlySpreadDots = [];
    // ... Rest of your code ...
    setDots(evenlySpreadDots);
  }, [numDots]);

  const handleCanvasTouch = (event) => {
    const { locationX, locationY } = event;

    if (drawingMode) {
      const point = `${locationX},${locationY}`;
      const newPathData = pathData ? `${pathData} L${point}` : `M${point}`;
      setPathData(newPathData);
    } else if (locked) {
      // Check if the tapped point is inside the shape or on an edge to mark the axis
      if (drawingMarker) {
          // Create a new table at the drawing marker's position
          const newTable = {
            x: drawingMarker.x,
            y: drawingMarker.y,
            radius: 8,
            color: 'blue',
            reserved: false,
          };

          setDots((prevDots) => [...prevDots, newTable]);
        }
    }
  };

  const handleToggleMode = () => {
    if (drawingMode) {
      setLocked(true);
      setDrawingMode(false);
      if (pathData === '') {
        // Drawing is not completed, alert the user and switch back to drawing mode
        Alert.alert('Incomplete Drawing', 'Please complete the drawing before proceeding.');
        setLocked(false);
        setDrawingMode(true);
      }
    }
  };

  const handleMarkerPress = (event) => {
    if (locked) {
      const { locationX, locationY } = event;
      setDrawingMarker({ x: locationX, y: locationY });
    }
  };

  const handleResetDrawing = () => {
      setPathData('');
      setDots([]);
      setDrawingMarker(null);
      setLocked(false);
      setDrawingMode(true);

  };

  const handleConfirm = async () => {
    if (!locked) {
      Alert.alert('Incomplete Drawing', 'Please complete the drawing and lock the canvas before confirming.');
      return;
    }

    try {
      // Save the drawing data to Firebase
      const floorData = {
        clubId: clubId,
        dots: dots,
        floorPlanData: pathData, // Include the generated floor plan data
      };

      const floorDocRef = doc(FIRESTORE_INSTANCE, 'floor', clubId);
      await setDoc(floorDocRef, floorData);

      // Provide user feedback
      Alert.alert('Success', 'Drawing confirmed and saved successfully.');

      // Navigate to the menu screen
      navigation.navigate('Menu');
    } catch (error) {
      console.error('Error during confirmation: ', error);
      // Handle the error here, show an alert or perform other error handling actions
      Alert.alert('Error', 'An error occurred during confirmation. Please try again.');
    }
  };

  const screenWidth = Dimensions.get('window').width * 0.95;
  const screenHeight = Dimensions.get('window').height * 0.7;

  return (
    <View style={StyleUtils.CENTERED_CONTAINER}>
      <Text style={styles.title}>Add Floor Plan</Text>

      <View style={styles.selectionContainer}>
        <Text style={styles.numDots}>NUM OF TABLES COUNTER</Text>
      </View>

      <View
        style={[styles.canvasContainer, { width: screenWidth, height: screenHeight }]}
        onTouchStart={(e) => handleCanvasTouch(e.nativeEvent)}
        onTouchMove={(e) => handleMarkerPress(e.nativeEvent)}
      >
        <Svg style={styles.canvas}>
          {/* Render the drawing */}
          <Path
            d={pathData}
            fill="transparent"
            stroke={locked ? 'yellow' : 'red'}
            strokeWidth={2}
          />

          {/* Render the drawing marker */}
          {drawingMarker && (
            <Circle
              cx={drawingMarker.x}
              cy={drawingMarker.y}
              r={12}
              fill="yellow"
            />
          )}

          {/* Render locked shape */}
          {locked && (
            <Path
              d={pathData}
              fill="transparent"
              stroke="white"
              strokeWidth={2}
            />
          )}

          {/* Render dots (tables) */}
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
            title={locked ? 'Locked' : 'Lock'}
            onPress={handleToggleMode}
            color={StyleUtils.PRIMARY_COLOR}
            disabled={locked}
          />
        </View>
        <View style={StyleUtils.BUTTON_WRAPPER}>
          <Button
            title="Reset Drawing"
            onPress={handleResetDrawing}
            color={StyleUtils.PRIMARY_COLOR}
          />
        </View>
        <View style={StyleUtils.BUTTON_WRAPPER}>
          <Button
            title="Confirm"
            onPress={handleConfirm}
            color={StyleUtils.PRIMARY_COLOR}
            disabled={!locked}
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
    width: '95%',
    marginTop: StyleUtils.SPACING_MEDIUM,
    marginBottom: StyleUtils.SPACING_LARGE,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  canvas: {
    backgroundColor: 'black',
    padding: 5,
  },
});

export default AddFloorScreen;
