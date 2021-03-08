import React, { useEffect }  from 'react'
import { View,  StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ItemBlock } from '../components/ItemBlock'
import { MainHeaderIcons } from '../components/MainHeaderIcons'
import { loadItems } from '../redux/actions/itemsActions'
import { THEME } from '../theme'



export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const onOpen = item => {
    navigation.navigate('Item', { item } ) 
  }

  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => ( <MainHeaderIcons navigation={navigation} /> ),
    });
    dispatch(loadItems())
  }, [dispatch])
  
  const items = useSelector(state => state.textpadphoto.items);
  //console.log("items: ", items)
  
  if (items) {
    items.forEach(item => {
     if (typeof item.img === "string") item.img = JSON.parse(item.img)
    });
  }
  items.sort((a,b) => b.id - a.id);
  const loading = useSelector(state => state.textpadphoto.loading);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={THEME.MAIN_COLOR}/>
      </View>
    )
  }

  if (!items.length) {
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
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ItemBlock item={item} onOpen={onOpen} />}
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
