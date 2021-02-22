import React, { useEffect }  from 'react'
import { View,  StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Recipe } from '../components/Recipe'
import { MainHeaderIcons } from '../components/MainHeaderIcons'
import { loadRecipes } from '../redux/actions/recipeActions'
import { THEME } from '../theme'



export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const onOpen = recipe => {
    navigation.navigate('Recipe', { recipe } ) 
  }

  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => ( <MainHeaderIcons navigation={navigation} /> ),
    });
    dispatch(loadRecipes())
  }, [dispatch])
  
  const recipes = useSelector(state => state.cooking.recipes);
  recipes.sort((a,b) => b.id - a.id);
  const loading = useSelector(state => state.cooking.loading);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={THEME.MAIN_COLOR}/>
      </View>
    )
  }

  if (!recipes.length) {
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
        data={recipes}
        keyExtractor={recipe => recipe.id.toString()}
        renderItem={({ item }) => <Recipe recipe={item} onOpen={onOpen} />}
      /> 
    </View>
  )
  }

const styles = StyleSheet.create({
  wrapper: {
    //padding: 10,
    marginBottom: 10
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})
