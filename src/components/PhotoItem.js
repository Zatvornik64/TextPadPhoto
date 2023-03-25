import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, TouchableWithoutFeedback, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { THEME } from '../theme';
import * as Sharing from 'expo-sharing';
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
              <Button
                  title={'Сохранить фото'}
                  color={THEME.SAVE_COLOR}
                  onPress={saveHandler}
              />
              <Button
                  title={'Поделиться фото'}
                  color={THEME.SHARED_COLOR}
                  onPress={sharingHandler}
              />
              <Button
                  title={'Удалить фото'}
                  color={THEME.MAIN_COLOR}
                  onPress={removeHandler}
              />
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
      backgroundColor: '#00FF00',
      textAlign: 'center',
    }
})
