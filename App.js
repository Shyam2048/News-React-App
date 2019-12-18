import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    ActivityIndicator,
    TouchableHighlight,
    FlatList
} from 'react-native'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Feed from './screens/Feed'
import Detail from './screens/Detail'

const SwitchNavigator = createStackNavigator(
    {
        Feed: {screen: Feed, navigationOptions: {header: null}},
        Detail: Detail
    },
    {
        initialRouteName: 'Feed'
    }
)

const App = createAppContainer(SwitchNavigator)

export default App
