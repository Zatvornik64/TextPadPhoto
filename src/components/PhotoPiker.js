import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export const  PhotoPiker = ({onPick, setPikerVisible}) => {
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashType, setFlashType] = useState(Camera.Constants.FlashMode.auto);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Ошибка доступа к камере</Text>;
  }

  const flashTypeHandler = () => {
    if (flashType === Camera.Constants.FlashMode.auto) setFlashType(Camera.Constants.FlashMode.on)
    if (flashType === Camera.Constants.FlashMode.on) setFlashType(Camera.Constants.FlashMode.off)
    if (flashType === Camera.Constants.FlashMode.off) setFlashType(Camera.Constants.FlashMode.auto)
  }
  
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      onPick(data.uri);
      setPikerVisible(false);
    }
  };

  return (
      <Camera style={styles.camera} type={type} flashMode={flashType} ref={(ref) => setCamera(ref)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <AntDesign name="retweet" size={34} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={flashTypeHandler}>
            {flashType === Camera.Constants.FlashMode.auto && <MaterialIcons name="flash-auto" size={34} color="black" />}
            {flashType === Camera.Constants.FlashMode.on && <MaterialIcons name="flash-on" size={34} color="black" />}
            {flashType === Camera.Constants.FlashMode.off && <MaterialIcons name="flash-off" size={34} color="black" />}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={()=>setPikerVisible(false)} >
            <AntDesign name="back" size={34} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoButton} onPress={takePicture} >
            <AntDesign name="camerao" size={44} color="black" />
        </TouchableOpacity>
      </Camera>
  );
}


const styles = StyleSheet.create({
    camera:{
        aspectRatio: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        marginBottom: -40
    },
    photoButton: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'white',
        height: 50,
        width:50,
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    flipButton: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'white',
        height: 40,
        width:40,
        backgroundColor: 'white',
        marginLeft: 10,
    },
    flashButton: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'white',
        height: 40,
        width:40,
        backgroundColor: 'white',
    },
    backButton: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'white',
        height: 40,
        width:40,
        backgroundColor: 'white',
        marginBottom: -40
    }
    });
