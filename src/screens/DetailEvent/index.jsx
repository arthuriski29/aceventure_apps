import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import http from '../../helpers/http';
import {picEvent, picMap} from '../../assets';
import {ImageTemplate} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const DetailEvent = ({route, navigation}) => {
  const {id} = route.params;
  const token = useSelector(state => state.auth.token);
  const [eventDetail, setEventDetail] = React.useState({});
  const [wishlistButton, setWishlistButton] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const getEventData = async () => {
        const {data} = await http().get(`/events/${id}`);
        setEventDetail(data.results);
      };
      if (id) {
        getEventData(id);
      }
    }, [id]),
  );

  React.useEffect(() => {
    const eventId = {eventId: id};
    const qString = new URLSearchParams(eventId).toString();
    const fetchData = async () => {
      const {data} = await http(token).get(`/wishlist/check?${qString}`);
      const btnStatus = data.results;
      if (btnStatus === true) {
        setWishlistButton(true);
      } else {
        setWishlistButton(false);
      }
    };
    fetchData();
  }, [token, id]);

  const addRemoveWishlist = async () => {
    try {
      const eventId = {eventId: id};
      const qString = new URLSearchParams(eventId).toString();
      const {data} = await http(token).post('/wishlist', qString);
      console.log(data);
      if (wishlistButton) {
        setWishlistButton(false);
      } else {
        setWishlistButton(true);
      }
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        console.log(message);
      }
    }
  };
  const handlePressEvent = eventId => {
    navigation.navigate('Booking', {id: eventId});
  };

  return (
    <View style={style.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={style.containerImg}>
        <ImageTemplate
          src={eventDetail?.picture || null}
          defaultImg={picEvent}
        />
        <View style={style.drawerContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <FeatherIcon name="arrow-left" size={35} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={addRemoveWishlist}>
              {wishlistButton === true ? (
                <FAwesome name="heart" size={30} color="red" />
              ) : (
                <FAwesome name="heart-o" size={30} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient
          colors={['#000000', 'rgba(0, 0, 0, 0)']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={style.dissolveContainer}>
          <View style={style.containerContent}>
            <Text style={style.titleText}>{eventDetail?.title}</Text>
            <View>
              <View />
              <Text style={style.textContLoc}>
                <FeatherIcon name="map-pin" size={25} color="red" />{' '}
                {eventDetail?.location}, Indonesia
              </Text>
            </View>
            <View>
              <View />
              <Text style={style.textContLoc}>
                <FeatherIcon name="clock" size={25} color="red" />{' '}
                {moment(eventDetail?.date).format('ddd, D MMM, h:mm A')}
              </Text>
            </View>
            <View>
              <Text style={style.textContLoc}>Attendees</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      <ScrollView style={style.containerDetail}>
        <View style={style.containerTextDetail}>
          <Text style={style.textEvents}>Event Detail</Text>
          <Text style={style.textDetailEvents}>
            {eventDetail?.descriptions}
          </Text>
        </View>
        <View style={style.containerTextDetail}>
          <Text style={style.textEvents}>Location</Text>
          <Image source={picMap} style={style.IMGMaps} />
        </View>
        <View style={style.containerButton} />
      </ScrollView>
      <View style={style.btnContainer}>
        <TouchableOpacity
          style={style.touchButton}
          onPress={() => handlePressEvent(eventDetail?.eventId)}>
          <Text style={style.textTouch}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
  },
  drawerContainer: {
    width: '100%',
    paddingTop: 60,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 0,
    position: 'absolute',
    zIndex: 10,
  },
  containerImg: {
    justifyContent: 'center',
    width: '100%',
    height: 500,
    position: 'relative',
  },
  dissolveContainer: {height: '100%', width: '100%', position: 'absolute'},
  containerContent: {
    paddingHorizontal: 30,
    gap: 15,
    position: 'absolute',
    bottom: 20,
  },
  titleText: {
    fontSize: 26,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 2,
    color: 'white',
    textTransform: 'capitalize',
    width: 300,
  },
  textContLoc: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 1,
    textTransform: 'capitalize',
  },
  containerDetail: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 200,
  },
  containerTextDetail: {
    padding: 25,
    gap: 15,
  },
  textEvents: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  textDetailEvents: {
    fontSize: 16,
    color: 'black',
    opacity: 0.8,
  },
  boxOut: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  boxTic: {
    backgroundColor: '#884DFF',
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxQty: {
    backgroundColor: '#FF3D71',
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxPrc: {
    backgroundColor: '#FF8900',
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchButton: {
    backgroundColor: '#F0592C',
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  textTouch: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  btnContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  textOut: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  textItem: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
  IMGMaps: {
    width: '100%',
    borderRadius: 20,
    marginBottom: 100,
  },
});

export default DetailEvent;
