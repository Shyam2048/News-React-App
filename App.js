import React, {Component} from 'react'
import Services from './core/Api'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    ActivityIndicator,
    FlatList
} from 'react-native'
import {Dropdown} from 'react-native-material-dropdown'

function seperator() {
    return (
        <View
            style={{
                backgroundColor: 'black',
                width: '100%',
                height: 2
            }}
        />
    )
}

const category = [
    {value: 'business'},
    {value: 'entertainment'},
    {value: 'health'},
    {value: 'science'},
    {value: 'sports'},
    {value: 'technology'}
]

const styles = StyleSheet.create({
    main: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center'
    },
    card: {
        flex: 1,
        height: 400,
        backgroundColor: 'white'
    },
    image: {},
    title: {
        marginVertical: 10
    },
    description: {}
})

export default class News extends Component {
    constructor() {
        super()
        this.state = {
            page: 1,
            pageSize: 10,
            newsArray: [],
            isLoading: true,
            total: 0,
            category: 'entertainment'
        }
        this.fetchNews()
    }

    handleChange = text => {
        this.setState(
            {
                page: 0,
                newsArray: [],
                category: text
            },
            this.fetchNews
        )
    }

    fetchNews = () => {
        let {newsArray} = this.state
        const {category, page, pageSize} = this.state
        Services.get(category, page, pageSize)
            .then(async Response => {
                let data = await Response.json()
                console.log(data)
                newsArray.push(...data.articles)
                this.setState({
                    newsArray,
                    total: data.totalResults,
                    isLoading: false
                })
            })
            .catch(error => console.log(error))
    }

    handleMore = () => {
        let {page, total} = this.state
        page += 1
        if (page <= total / 10) {
            console.log(page)
            this.setState({page}, this.fetchNews)
        }
    }

    render() {
        return (
            <View
                className="Main"
                style={[
                    styles.main,
                    Platform.OS === 'ios' ? {paddingTop: 44} : null
                ]}>
                <View style={{flex: 1}}>
                    <View>
                        <Text
                            style={{
                                height: 30,
                                fontSize: 20,
                                textAlign: 'center',
                                color: 'white'
                            }}>
                            Category
                        </Text>
                        <Dropdown
                            onChangeText={this.handleChange}
                            baseColor={'transparent'}
                            textColor={'white'}
                            itemColor={'white'}
                            animationDuration={420}
                            itemTextStyle={{
                                textAlign: 'center'
                            }}
                            selectedItemColor={'blue'}
                            itemCount={category.length}
                            itemPadding={10}
                            dropdownOffset={{top: 1, left: 10}}
                            dropdownMargins={{min: 8, max: 8}}
                            // valueExtractor={value => console.log(value)}
                            containerStyle={{
                                justifyContent: 'center',
                                alignContent: 'center',
                                width: '100%',
                                backgroundColor: 'black'
                            }}
                            pickerStyle={{
                                backgroundColor: 'black',
                                width: '100%'
                            }}
                            dropdownPosition={0}
                            value={this.state.category}
                            data={category}
                        />
                    </View>
                    {this.state.isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <FlatList
                            ItemSeparatorComponent={seperator}
                            data={this.state.newsArray}
                            onEndReached={this.handleMore}
                            onEndReachedThreshold={0.5}
                            renderItem={({item}) => (
                                <View
                                    key={item.description}
                                    style={styles.card}>
                                    <Image
                                        style={{
                                            flex: 1.5,
                                            height: 100,
                                            width: '100%',
                                            resizeMode: 'cover',
                                            borderColor: 'white'
                                        }}
                                        source={{
                                            uri: item.urlToImage
                                                ? item.urlToImage
                                                : ' '
                                        }}
                                    />

                                    <View
                                        style={{
                                            flex: 1,
                                            paddingHorizontal: 10
                                        }}>
                                        <View
                                            className={'Title'}
                                            style={styles.title}>
                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'black',
                                                    fontSize: 15
                                                }}>
                                                {item.title ? item.title : null}
                                            </Text>
                                        </View>
                                        <View
                                            className={'Description'}
                                            style={{}}>
                                            <Text
                                                style={{
                                                    color: 'black',
                                                    paddingBottom: 10
                                                }}>
                                                {item.description
                                                    ? item.description
                                                    : null}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                </View>
            </View>
        )
    }
}
