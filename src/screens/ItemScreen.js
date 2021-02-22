import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button, TextInput, Alert, FlatList, LogBox } from 'react-native'
import { useDispatch } from 'react-redux'
import { THEME } from '../theme'
import { ItemHeaderIcons } from '../components/ItemHeaderIcons'
import { removeItems, updateItems } from '../redux/actions/itemsActions'
import { PhotoPiker } from '../components/PhotoPiker'
import { PhotoItem } from '../components/PhotoItem'

export const ItemScreen = ({ navigation, route }) => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);
  const items = route.params.item; 
  const [title, setTitle] = useState(items.title);
  //const [ingredients, setIngredients] = useState(recipe.ingredients);
  //const [cooking, setCooking] = useState(recipe.cooking);
  const [text, setText] = useState(items.text);
  const [booked, setBooked] = useState(items.booked);
  const [image, setImage] = useState(items.img);
  const id = items.id;
//console.log(image)
  const dispatch = useDispatch();

  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => ( <ItemHeaderIcons navigation={navigation} booked={booked} setBookedHandler={setBookedHandler} /> ),
    })
  }, [booked])
  
  const goBackHandler = () => {
    navigation.goBack()
  }
  const setBookedHandler = () => {
    setBooked(booked? 0 : 1)
  }
  const removeHandler = () => {
    Alert.alert(
      "Удаление",
      "Точно удалить запись?",
      [
        {
          text: "Отменить",
          style: "cancel"
        },
        { text: "Удалить", 
          style: "destructive",
          onPress: () => {
            dispatch(removeItems(id));
            navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  }

  const saveHandler = () => {
    const item = { 
      id,
      title,
      booked,
      text,
      img: image,
    };
    dispatch(updateItems(item));
    navigation.goBack();
  }

  const deletePhotoHandler = (id) => {
    return function () {
      const temp = [...image];
      temp.splice(id, 1);
      setImage(temp);  
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
      {/*<Image source={{ uri: image }} style={styles.image} />*/}
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
      <View style={styles.buttonsWrapper}>
        <View style={styles.button}> 
          <Button
            title='Удалить запись'
            color={THEME.DANGER_COLOR}
            onPress={removeHandler}
          />
        </View>
      </View>
      <FlatList
        data={image}
        keyExtractor={item => item}
        renderItem={(item, i) => <PhotoItem image={item} deletePhoto={deletePhotoHandler} id={i}/>}
      />
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
