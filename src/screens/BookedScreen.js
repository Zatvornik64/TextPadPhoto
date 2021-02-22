import React, { useEffect } from 'react'
import { View,  StyleSheet, FlatList, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Recipe } from '../components/Recipe'
import { BookedHeaderIcons } from '../components/BookedHeaderIcons'

export const BookedScreen = ({ navigation }) => {

  const onOpen = recipe => {
    navigation.navigate('Recipe', { recipe } ) 
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => ( <BookedHeaderIcons navigation={navigation} /> ),
    });
  }, [])
  
  const recipes = useSelector(state => state.cooking.recipes);
  recipes.sort((a,b) => b.id - a.id);

  if (!recipes.filter(item => item.booked).length) {
    return (
      <View style={styles.loader}>
        <Image 
          resizeMode='center'
          source={require('../../assets/emptylist.jpg')}
        />
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={recipes.filter(item => item.booked)}
        keyExtractor={recipe => recipe.id.toString()}
        renderItem={({ item }) => <Recipe recipe={item} onOpen={onOpen} />}
      /> 
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    //padding: 40,
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})
