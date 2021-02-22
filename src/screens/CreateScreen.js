import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button, TextInput, Alert, FlatList, LogBox } from 'react-native'
import { useDispatch } from 'react-redux'
import { THEME } from '../theme'
import { CreateHeaderIcons } from '../components/CreateHeaderIcons'
import { createItems } from '../redux/actions/itemsActions'
import { PhotoPiker } from '../components/PhotoPiker'
import { PhotoItem } from '../components/PhotoItem'

export const CreateScreen = ({ navigation }) => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);

  //const recipe = route.params.recipe; 
  const [title, setTitle] = useState('');
  //const [ingredients, setIngredients] = useState('');
  //const [cooking, setCooking] = useState('');
  const [text, setText] = useState('');
  //const [booked, setBooked] = useState(0);
  const [image, setImage] = useState([]);

  const dispatch = useDispatch();
//console.log(image)
  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => ( <CreateHeaderIcons navigation={navigation} /> ),
    })
  }, [])
  
  const goBackHandler = () => {
    navigation.goBack()
  }

  const saveHandler = () => {
    const item = { 
      //id: new Date().toString(),
      title,
      //cooking,
      text,
      img: image,
    };
    dispatch(createItems(item));
    navigation.goBack();
  }

  const deletePhotoHandler = (id) => {
    return function () {
      setImage(image.splice(1, id));  
    }
  }

  const addImage = (uri) => {
    setImage([...image, uri]);
  }

  return (
    <ScrollView>
      <View style={styles.textWrap}>
        <Text style={styles.title}>Заголовок</Text>
        <TextInput 
          style={styles.text}
          onChangeText={text => setTitle(text)} 
          value={title} 
        />
      </View>
      <PhotoPiker onPick={uri => addImage(uri)}/>
      <View style={styles.textWrap}>
        <Text style={styles.title}>Текст</Text>
        <TextInput 
          style={styles.text}
          multiline={true}
          onChangeText={text => setText(text)} 
          value={text} 
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttons}>
          <Button
            title='Назад'
            color={THEME.MAIN_COLOR}
            onPress={goBackHandler}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            title='Сохранить'
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
          />
        </View>
      </View>
      <View>
      <FlatList
        data={image}
        keyExtractor={i => i}
        renderItem={(item, i) => <PhotoItem image={item} deletePhoto={deletePhotoHandler} id={i}/>}
      />
      </View>
    </ScrollView> 
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: "100%",
    height: 300
  },
  textWrap: {
    padding: 10
  }, 
  title: {
    fontSize: 20
  },
  text: {
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16
  },
  button: {
    width: '90%',
    marginTop: 10
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  buttons: {
    width: '40%'
  }
})
