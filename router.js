import React from 'react';
import {createStackNavigator} from 'react-navigation';

import Map from './components/Map';
import MilkForm from './components/MilkForm';

export const Router = createStackNavigator({
    Map: {screen: Map},
    MilkForm: {screen: MilkForm},
})

