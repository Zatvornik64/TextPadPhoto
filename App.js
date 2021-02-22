import React, { useState, useEffect } from 'react'
import { AppLoading } from 'expo'
import { Provider } from 'react-redux'
import { AppNavigation } from './src/navigation/AppNavigation'
import { initLoading } from './src/initLoading'
import { store } from './src/redux/store'

export default function App() {
  //const [isReady, setIsReady] = useState(false)

  // в SDK 39 Apploading вызывает ошибку "No native splash screen registered for provided activity"
  // и пока будет работать напрямую 
  /*if (!isReady) {
    return (
      <AppLoading
        startAsync={initLoading}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    )
  }*/

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  )
}
