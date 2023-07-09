import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const EventBox = ({date, event, eventImage, eventId, ...rest}) => {
  const navigation = useNavigation();
  const handlePressEvent = id => {
    navigation.navigate('DetailEvent', {id});
  };
  return (
    <View style={style.containerTextNew}>
      <Image style={style.eventImages} source={{uri: eventImage}} />

      <View style={style.wrapAllContent}>
        <LinearGradient
          colors={['#000000', 'rgba(0, 0, 0, 0)']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={style.dissolveContainer}>
          <View style={style.warapperTextCont}>
            <Text style={style.textNew}>
              {moment(date).format('ddd, D MMM, h:mm A')}
            </Text>
            <Text style={style.textContaninerNew}>{event}</Text>
            <TouchableOpacity
              style={style.button1}
              onPress={() => handlePressEvent(eventId)}>
              <Icon name="arrow-right" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerTextNew: {
    width: 260,
    height: 376,
    borderRadius: 40,
    marginLeft: 20,
    marginRight: 20,
    gap: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  wrapAllContent: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  dissolveContainer: {flex: 1},
  eventImages: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textContaninerNew: {
    color: 'white',
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  textNew: {
    fontSize: 16,
    fontWeight: 'semibold',
    letterSpacing: 1,
    color: 'white',
    width: 200,
  },

  warapperTextCont: {
    position: 'absolute',
    bottom: 50,
    left: 20,
  },

  button1: {
    backgroundColor: '#F0592C',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default EventBox;
