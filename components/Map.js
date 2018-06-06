import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API} from 'react-native-dotenv'

Geocoder.init(GOOGLE_API);

export default class Map extends React.Component {
    constructor() {
        super()
        this.state = {
            currentRegionName: '',
            initialRegion: {
                latitude: 11.5683972886659,
                latitudeDelta: 0.0922000271263812,
                longitude: 104.92227526802127,
                longitudeDelta: 0.06826292796301914,
            },
            region: {
                latitude: 11.5683972886659,
                longitude: 104.92227526802127,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: [{
                title: 'MooMoo Farms Address',
                latlng: {
                    latitude: 11.568470353160166,
                    longitude: 104.95745898407355,
                },
                description: 'Moo'
            }]
        }
    }

    //attempt at debouncing the scroll change
    // debounce(callback, wait, context = this) {
    //     let timeout = null;
    //     let callbackArgs = null;

    //     const later = () => callback.apply(context, callbackArgs);

    //     return function () {
    //         callbackArgs = arguments;
    //         clearTimeout(timeout);
    //         timeout = setTimeout(later, wait);
    //     };
    // }

    onRegionChange(region) {

        this.setState({ region }, () => {
            Geocoder.from(region.latitude, region.longitude)
                .then(json => {
                    var addressComponent = json.results[0].address_components[0];
                    this.setState({ currentRegionName: addressComponent.long_name });
                })
                .catch(error => console.warn(error));
        })
    }

    resetRegion() {
        this.setState({
            region: this.state.initialRegion
        }, () => {
            Geocoder.from(this.state.initialRegion.latitude, this.state.initialRegion.longitude)
                .then(json => {
                    var addressComponent = json.results[0].address_components[0];
                    this.setState({ currentRegionName: addressComponent.long_name });
                })
                .catch(error => console.warn(error));
        })
    }

    confirmCoordinates() {
        var { navigate } = this.props.navigation;
        navigate('MilkForm', { location: this.state.currentRegionName })
    }

    render() {
        return (

            <View style={styles.container}>

                <MapView
                    style={styles.map}
                    region={this.state.region}
                    onRegionChange={(region) => this.onRegionChange(region)}
                >
                    <MapView.Marker
                        coordinate={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }}
                    />
                    {this.state.markers.map((marker, i) => (
                        <Marker
                            key={i}
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
                </MapView>
                <View style={styles.upperOptions}>

                    <Text>
                        {this.state.currentRegionName}
                    </Text>
                    <Button
                        title="Reset Location"
                        onPress={() => this.resetRegion()}
                        style={styles.button}
                    />
                </View>
                <Button
                    title="Confirm"
                    onPress={() => this.confirmCoordinates()}
                />
            </View>

        );
    }

}
const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    upperOptions: {
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    map: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    currentRegion: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'blue',
        color: 'white',
        zIndex: 2
    },
    button: {
        flex: 1,
        backgroundColor: 'blue',
        color: 'white',
        zIndex: 2
    },
    regionText: {
        flex: 1,
        backgroundColor: 'blue',
        zIndex: 2,
    }
})