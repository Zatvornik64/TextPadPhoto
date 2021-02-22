import React, { useEffect } from 'react'
import { View,  StyleSheet, FlatList, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { ItemBlock } from '../components/ItemBlock'
import { BookedHeaderIcons } from '../components/BookedHeaderIcons'

export const BookedScreen = ({ navigation }) => {

  const onOpen = item => {
    navigation.navigate('Item', { item } ) 
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => ( <BookedHeaderIcons navigation={navigation} /> ),
    });
  }, [])
  
  const items = useSelector(state => state.textpadphoto.items);
  items.sort((a,b) => b.id - a.id);

  if (!items.filter(item => item.booked).length) {
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
        data={items.filter(item => item.booked)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ItemBlock item={item} onOpen={onOpen} />}
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
