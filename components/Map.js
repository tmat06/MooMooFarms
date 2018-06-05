import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.init('//Input Google API Here');

export default class Map extends React.Component {
    constructor() {
        super()
        this.state = {
            currentRegionName: '',
            region: {
                latitude: 11.568470353160166,
                longitude: 104.95745898407355,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: [{
                title: 'test',
                latlng: {
                    latitude: 11.568470353160166,
                    longitude: 104.95745898407355,
                },
                description: 'hello'
            }]
        }
    }

    debounce(callback, wait, context = this) {
        let timeout = null;
        let callbackArgs = null;

        const later = () => callback.apply(context, callbackArgs);

        return function () {
            callbackArgs = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }


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

    render() {
        console.log('process.env', process.env)
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    onRegionChange={(region) => this.onRegionChange(region)}
                >
                    {this.state.markers.map((marker, i) => (
                        <Marker
                            key={i}
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
                </MapView>
                <Text style={{ backgroundColor: 'pink' }}>
                    {this.state.currentRegionName}
                </Text>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 50,
    },
    currentRegion: {
        position: 'absolute',
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'yellow',
    }
})