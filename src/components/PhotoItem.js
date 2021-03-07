import react from "react";
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, Image, Button, Alert } from 'react-native';
import { THEME } from '../theme';

export const PhotoItem = ({image, deletePhoto, id}) => {
//console.log(image)
    return (
        <View style={styles.wrapper}>
            <Image style={styles.image} source={{ uri: image }} />
            <Button 
                title={'Удалить фото'} 
                color={THEME.MAIN_COLOR}
                onPress={deletePhoto(id)} 
            />
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