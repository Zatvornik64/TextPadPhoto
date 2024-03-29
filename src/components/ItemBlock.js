import React from 'react'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native'

export const ItemBlock = ({ item, onOpen }) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(item)}> 
      <ImageBackground style={styles.image} source={item.img[0] ? { uri: item.img[0] } : require('../../assets/noimage.png')}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>
            {item.title}
          </Text>
        </View>
      </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    color: '#fff',
  }
})
