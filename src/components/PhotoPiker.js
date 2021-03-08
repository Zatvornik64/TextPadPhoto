import react from "react";
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, Image, Button, Alert } from 'react-native';
import { THEME } from '../theme';

async function askPermission () {
    const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
    )
    if (status !== 'granted') {
        Alert.alert('Ошибка', 'Нет прав на камеру');
        return false
    }
    return true
}

export const PhotoPiker = ({onPick}) => {
    //const [image, setImage] = useState(img);
    
    const takePhoto = async () => {
        const hasPermissions = await askPermission();
        if (!hasPermissions) { return }
        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9],
        });
        //console.log(img)
        onPick(img.uri);
    }

    return (
        <View style={styles.wrapper}>
            {/*image && 
                <>
                    <Image style={styles.image} source={{ uri: item }} />
                    <Button 
                        title={'Удалить фото'} 
                        color={THEME.MAIN_COLOR}
                        onPress={delPhotoHandler} 
                    />
                </>*/}
            <View style={styles.button}>
                <Button 
                    title={'Сделать фото'} 
                    color={THEME.MAIN_COLOR}
                    onPress={takePhoto} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 10
    },
    image: {
        width: '100%',
        height: 250
    },
    button: {
        marginTop: 10,
        width: '60%',
        marginLeft: '20%'
    }
})