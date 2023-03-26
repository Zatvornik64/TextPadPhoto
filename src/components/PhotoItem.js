import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, TouchableWithoutFeedback, Modal, TouchableOpacity } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { THEME } from '../theme';
import * as Sharing from 'expo-sharing';
import { AntDesign } from '@expo/vector-icons';
import { saveItems } from '../redux/actions/itemsActions';

export const PhotoItem = ({item, image, deletePhoto, id}) => {
const images = image.map(el => ({url: el}));
const [modalVisible, setModalVisible] = useState(false);
const [saveResult, setSaveResult] = useState('');
const [showResult, setShowResult] = useState(false);

const removeHandler = () => {
    Alert.alert(
      "Удаление",
      "Точно удалить фото?",
      [
        {
          text: "Отменить",
          style: "cancel"
        },
        { text: "Удалить",
          style: "destructive",
          onPress: () => {
            deletePhoto(id);
          }
        }
      ],
      { cancelable: false }
    );
  }

const sharingHandler = () => {
  Sharing.shareAsync(item)
}

const modalOnHandler = () => {
  setModalVisible(true)
}

const modalOffHandler = () => {
  setModalVisible(!modalVisible)
}

function saveHandler () {
  try {
    saveItems(item);
    setSaveResult('Сохранено')
  } catch (error) {
    console.log(error);
    setSaveResult('Ошибка')
  }
  setShowResult(true);
  setTimeout(() => setShowResult(false), 5000);
  }

    return (
        <TouchableWithoutFeedback activeOpacity={0.7} onPress={modalOnHandler} onLongPress={sharingHandler} style={styles.wrapper}>
            <View>
              <Image style={styles.image} source={{ uri: item }} />
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.actionButton} onPress={saveHandler} >
                    <AntDesign name="save" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={sharingHandler} >
                    <AntDesign name="sharealt" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={removeHandler} >
                    <AntDesign name="delete" size={40} color="black" />
                </TouchableOpacity>
              </View>
              {showResult && <Text style={styles.result}>
                  {saveResult}
              </Text>}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={modalOffHandler}
              >
                  <ImageViewer imageUrls={images} index={id} saveToLocalByLongPress={false}/>
              </Modal>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 250
    },
    button: {
        marginTop: 10,
        width: '60%',
        marginLeft: '20%'
    },
    result: {
      marginTop: 0,
      fontSize: 40,
      width: '100%',
      backgroundColor: '#00FF00',
      textAlign: 'center',
      position: 'absolute',
      borderRadius: 5,
      bottom: 0
    },
    buttons: {
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: 5,
      marginBottom: 5,
    },
    actionButton: {
      width: '25%',
      height: 40,
      backgroundColor: THEME.BUTTONS_COLOR,
      margin: 'auto',
      marginLeft: '5%',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: 10,
    }
})
