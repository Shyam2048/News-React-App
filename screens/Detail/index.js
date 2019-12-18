import React, {Component} from 'react'
import WebView from 'react-native-webview'
import {Header} from 'react-navigation-stack'

import {View, ActivityIndicator, Dimensions} from 'react-native'

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    render() {
        let url = this.props.navigation.state.params.url
        return (
            <View style={{flex: 1}}>
                {this.state.loading && [
                    <ActivityIndicator
                        style={{
                            position: 'absolute',
                            top:
                                Dimensions.get('window').height / 2 -
                                Header.HEIGHT,
                            left: Dimensions.get('window').width / 2 - 20,
                            zIndex: 999
                        }}
                        animating={this.state.loading}
                        size="large"
                        width={20}
                        color="#0000ff"
                    />
                ]}

                <WebView
                    onLoadStart={() => this.setState({loading: true})}
                    onLoadEnd={() => this.setState({loading: false})}
                    source={{uri: url}}
                />
            </View>
        )
    }
}
