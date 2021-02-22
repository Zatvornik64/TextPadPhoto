import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button, TextInput, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { THEME } from '../theme'
import { CreateHeaderIcons } from '../components/CreateHeaderIcons'
import { createRecipes } from '../redux/actions/recipeActions'
import { PhotoPiker } from '../components/PhotoPiker'

export const CreateScreen = ({ navigation }) => {
  //const recipe = route.params.recipe; 
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cooking, setCooking] = useState('');
  //const [booked, setBooked] = useState(0);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => ( <CreateHeaderIcons navigation={navigation} /> ),
    })
  }, [])
  
  const goBackHandler = () => {
    navigation.goBack()
  }

  const saveHandler = () => {
    const recipe = { 
      //id: new Date().toString(),
      title,
      cooking,
      ingredients,
      img: image,
    };
    dispatch(createRecipes(recipe));
    navigation.goBack();
  }

  return (
    <ScrollView>
      <View style={styles.textWrap}>
        <Text style={styles.title}>Название</Text>
        <TextInput 
          style={styles.text}
          onChangeText={text => setTitle(text)} 
          value={title} 
        />
      </View>
      <PhotoPiker img={null} onPick={uri => setImage(uri)}/>
      <View style={styles.textWrap}>
        <Text style={styles.title}>Состав</Text>
        <TextInput 
          style={styles.text}
          multiline={true}
          onChangeText={text => setIngredients(text)} 
          value={ingredients} 
        />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>Рецепт</Text>
        <TextInput 
          style={styles.text}
          multiline={true}
          onChangeText={text => setCooking(text)} 
          value={cooking} 
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
