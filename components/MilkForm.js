import React, { Component } from 'react';
import { View, StyleSheet, Text, Button, Picker } from 'react-native';

export default class MilkForm extends Component {
    constructor(props) {
        super(props)
        this.state ={
            quantity: 1
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Location of Delivery is:
                </Text>
                <Text>
                    {this.props.navigation.getParam('location')}
                </Text>
                <Picker
                    selectedValue={this.state.quantity}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(val, i) => this.setState({ quantity: val })}>
                    <Picker.Item label="1 Gallon" value={1} />
                    <Picker.Item label="1/2 Gallon" value={.5} />
                </Picker>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        backgroundColor: 'pink'
    }
})