import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button, TextInput, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { THEME } from '../theme'
import { RecipeHeaderIcons } from '../components/RecipeHeaderIcons'
import { removeRecipes, updateRecipes } from '../redux/actions/recipeActions'
import { PhotoPiker } from '../components/PhotoPiker'

export const RecipeScreen = ({ navigation, route }) => {
  const recipe = route.params.recipe; 
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [cooking, setCooking] = useState(recipe.cooking);
  const [booked, setBooked] = useState(recipe.booked);
  const [image, setImage] = useState(recipe.img);
  const id = recipe.id;

  const dispatch = useDispatch();

  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => ( <RecipeHeaderIcons navigation={navigation} booked={booked} setBookedHandler={setBookedHandler} /> ),
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
      "Точно удалить рецепт?",
      [
        {
          text: "Отменить",
          style: "cancel"
        },
        { text: "Удалить", 
          style: "destructive",
          onPress: () => {
            dispatch(removeRecipes(id));
            navigation.goBack();
          }
        }
      ],
      { cancelable: false }
    );
  }

  const saveHandler = () => {
    const recipe = { 
      id,
      title,
      cooking,
      booked,
      ingredients,
      img: image,
    };
    dispatch(updateRecipes(recipe));
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
      {/*<Image source={{ uri: image }} style={styles.image} />*/}
      <PhotoPiker img={image} onPick={uri => setImage(uri)}/>
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
      <View style={styles.buttonsWrapper}>
        <View style={styles.button}> 
          <Button
            title='Удалить'
            color={THEME.DANGER_COLOR}
            onPress={removeHandler}
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
