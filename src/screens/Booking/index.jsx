import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {picTicket} from '../../assets';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import {useFocusEffect} from '@react-navigation/native';

const Booking = ({route, navigation}) => {
  const {id: eventId} = route.params;
  // console.log(eventId);
  const token = useSelector(state => state.auth.token);
  const [sections, setSections] = React.useState([]);
  const [filledSection, setFilledSection] = React.useState({
    id: 0,
    quantity: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      const getSections = async () => {
        const {data} = await http(token).get('/section');
        setSections(data.results);
      };
      getSections();
    }, [token]),
  );

  const increment = id => {
    if (filledSection.quantity >= 4) {
      setFilledSection({id, quantity: 4});
    } else {
      setFilledSection({id, quantity: filledSection.quantity + 1});
    }
  };
  const decrement = id => {
    if (filledSection.quantity <= 0) {
      setFilledSection({id, quantity: 0});
    } else {
      setFilledSection({id, quantity: filledSection.quantity - 1});
    }
  };
  const selectedSection =
    filledSection && sections.filter(item => item.id === filledSection.id)[0];

  const doReservation = async () => {
    try {
      const sectionId = selectedSection?.id;
      const quantity = filledSection.quantity;
      const form = new URLSearchParams({
        eventId,
        sectionId,
        quantity,
      }).toString();
      console.log([sectionId, quantity, form]);
      const {data} = await http(token).post('/reservations', form);
      const dataRes = data.results;
      console.log(dataRes);
      if (data.success === true) {
        navigation.navigate('Payment', {
          state: {
            eventId,
            eventName: dataRes.events.title,
            reservationId: dataRes.id,
            sectionName: dataRes.sectionName,
            quantity: dataRes.quantity,
            totalPayment: dataRes.totalPrice,
          },
        });
      }
    } catch (error) {
      console.log(error);
      throw Error('ReservationButton_have_trouble');
    }
  };

  const handlePressEvent = id => {
    navigation.navigate('DetailEvent', {id: id});
  };

  return (
    <View style={style.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={style.sectionHeader}>
        <View style={style.contentHeader}>
          <TouchableOpacity onPress={() => handlePressEvent(eventId)}>
            <FeatherIcon name="arrow-left" size={35} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={style.textHeader}>Checkout</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.wrapper}>
        <View style={style.secTickContainer}>
          <Image
            source={picTicket}
            height={50}
            width={50}
            style={style.imageSection}
          />
        </View>
        <View style={style.containerCheckout}>
          <View style={style.ticketHeader}>
            <View>
              <Text style={style.textTic}>Tickets</Text>
            </View>
            <View style={style.sortSectionTicket}>
              <View>
                <Text style={style.textTic2}>BY PRICE</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <FeatherIcon name="filter" size={35} color="#F0592C" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView style={style.ticketVariant}>
            {sections.map(item => (
              <View key={`section-select-${item.id}`} style={style.contItem}>
                <View style={style.contIcon}>
                  <FAwesome name="ticket" size={25} color="#F0592C" />
                </View>
                <View style={style.contSect}>
                  <View>
                    <Text style={style.sectionText}>
                      SECTION {item.name}, ROW 1
                    </Text>
                    <Text style={style.contSeat}>12 Seats available</Text>
                  </View>
                  <Text style={style.contQuty}>Quantity</Text>
                </View>
                <View style={style.contPriceOut}>
                  <View style={style.priceOut}>
                    <Text style={style.sectionText}>IDR {item.price}</Text>
                    <Text>per person</Text>
                  </View>
                  <View style={style.count}>
                    <TouchableOpacity
                      style={style.addOrRemoveQty}
                      onPress={() => decrement(item.id)}>
                      <Text style={style.iconInQty}>-</Text>
                    </TouchableOpacity>
                    <Text style={style.textCount}>
                      {item.id === filledSection.id
                        ? filledSection.quantity
                        : 0}
                    </Text>
                    <TouchableOpacity
                      style={style.addOrRemoveQty}
                      onPress={() => increment(item.id)}>
                      <Text style={style.iconInQty}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={style.sectionPayment}>
            <View>
              <View style={style.results}>
                <Text style={style.reslutsText}>
                  {selectedSection?.name || '-'}
                </Text>
                <Text>-</Text>
                <Text style={style.reslutsText}>{filledSection?.quantity}</Text>
                <Text>-</Text>
                <Text style={style.reslutsText}>
                  IDR {selectedSection?.price * filledSection?.quantity || '0'}
                </Text>
              </View>
              <View style={style.getOwnCont}>
                <Text style={style.getOwn}>Get now on Urticket</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={doReservation}
              style={style.touchCheckOut}>
              <Text style={style.textCheckout}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#F0592C',
    flex: 1,
  },
  wrapper: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    paddingHorizontal: 30,
    flex: 1,
    position: 'relative',
  },
  textHeader: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1,
    color: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 50,
  },
  contentHeader: {
    flex: 1,
  },
  secTickContainer: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  imageSection: {
    width: '80%',
    height: '80%',
  },
  ticketVariant: {
    height: 250,
  },
  sectionPayment: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    bottom: 0,
  },
  containerCheckout: {
    paddingVertical: 10,
    gap: 10,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  sortSectionTicket: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  iconInQty: {
    fontFamily: 'Poppins-Bold',
  },
  textTic: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  textTic2: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
  },
  contItem: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  contIcon: {
    width: 45,
    height: 45,
    backgroundColor: '#F1EAFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
  contSect: {
    gap: 10,
  },
  contSeat: {
    opacity: 0.7,
  },
  contQuty: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  contPriceOut: {
    // justifyContent: 'center',
    // alignItems: 'center',
    gap: 10,
  },
  priceOut: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  count: {
    flexDirection: 'row',
    gap: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addOrRemoveQty: {
    width: 33,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  checkOut: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    gap: 25,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 7,
    marginBottom: 50,
  },
  results: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reslutsText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  touchCheckOut: {
    backgroundColor: '#F0592C',
    width: 100,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCheckout: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  getOwn: {
    fontSize: 12,
  },
  getOwnCont: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default Booking;
