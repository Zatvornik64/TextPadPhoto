import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 

  const toMain = navigation => {
    navigation.navigate('Main') 
  }
  const toCreate = navigation => {
    navigation.navigate('Create') 
  }
  const toAbout = navigation => {
    navigation.navigate('About') 
  }

export const BookedHeaderIcons = ({ navigation }) => {

    return (
        <View style={styles.headerButtonsWrapper}>
          <Pressable 
            style={styles.headerButtons}
            onPress={() => toMain(navigation)}
            >
            <MaterialIcons name="star" size={24} color="black" />
          </Pressable>
          <Pressable 
            style={styles.headerButtons}
            onPress={() => toCreate(navigation)}
            >
            <MaterialIcons name="add-circle-outline" size={24} color="black" />
          </Pressable>
          <Pressable 
            style={styles.headerButtons}
            onPress={() => toAbout(navigation)}
            >
            <MaterialIcons name="settings" size={24} color="black" />
          </Pressable>
        </View>
      )
    }

    const styles = StyleSheet.create({
        headerButtonsWrapper: {
          flexDirection: 'row',
        },
        headerButtons: {
          marginHorizontal: 10
        }
      })
      