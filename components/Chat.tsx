import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Chat = ({name, verified, lastMessage}: {name: string, verified: boolean, lastMessage: {text: string, hour: string}}) => {
  return (
    <View>
      <Text>Chat</Text>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})