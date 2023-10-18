import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Loading() {
  const [greeting, setGreeting] = useState('안녕하세요')
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0)

  const languages = ['안녕하세요', 'Hello', '你好', 'こんにちは']

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLanguageIndex((currentLanguageIndex + 1) % languages.length)
      setGreeting(languages[currentLanguageIndex])
    }, 350)

    return () => clearInterval(intervalId)
  }, [currentLanguageIndex])

  return (
    <View style={styles.loadingContainer}>
      <Text>{greeting}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
