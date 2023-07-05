import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyles from '../../assets/styles';
// import { TouchableOpacity } from 'react-native-gesture-handler'

const Button = ({children, ...rest}) => {
  return (
    <TouchableOpacity {...rest} style={globalStyles.btn}>
      <Text style={globalStyles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
