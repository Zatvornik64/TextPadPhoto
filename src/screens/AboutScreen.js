import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Это приложение для записей с фото.</Text>
      <Text style={styles.text}>Звездочка на главном экране в шапке переключает показ всех или только избранных записей.</Text>
      <Text style={styles.text}>Звездочка в редакторе переключает его статус на "избранный" или "не избранный".</Text>
      <Text style={styles.text}>Плюсик в шапке приложения переключает на страницу добавления новой записи.</Text>
      <Text style={styles.text}>Шестеренка в шапке ведет на этот экран.</Text>
      <Text style={styles.text}>Это приложение делалось для себя.</Text>
      <Text style={styles.text}>Автор: Михаил Пошивалов.</Text>
      <Text style={styles.text}>Если у вас есть пожелания по дальнейшей доработке этого приложения - позвоните автору и скажите об этом!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center'
  }
})
