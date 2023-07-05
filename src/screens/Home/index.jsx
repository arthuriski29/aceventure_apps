import 'react-native-gesture-handler';
// import globalStyles from '../assets/styles';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  StatusBar,
  BackHandler,
} from 'react-native';
import React from 'react';
// import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import http from '../../helpers/http';
import {useNavigation} from '@react-navigation/native';
import FAwesome from 'react-native-vector-icons/FontAwesome';
import {EventBox, DateBox, CategoryBox} from '../../components';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';

// const Drawer = createDrawerNavigator();

const Home = () => {
  const navigation = useNavigation();
  const [events, setEvent] = React.useState([]);
  React.useEffect(() => {
    async function getEvent() {
      const {data} = await http().get('/event?sort=date&sortBy=asc');
      setEvent(data.results);
    }
    getEvent();
  }, []);
  const uniqueDates = [...new Set(events.map(item => item?.date))];
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => {
      BackHandler.addEventListener('hardwareBackPress', () => true);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.navbar}>
          <View style={styles.wrapper}>
            <View>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={30} />
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}> */}
            {/* <Text style={styles.textColor}>Home Fajar Fathur</Text> */}
            {/* </TouchableOpacity> */}
            <View>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="message-square" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.searchInput}>
          <TextInput placeholder="Search Event" style={styles.inputText} />
        </View>
      </View>
      <ScrollView style={styles.container} horizontal={false}>
        <View style={StyleSheet.wrapTitle}>
          <View>
            <Text style={styles.containerText}>Events For You</Text>
          </View>
          <View>
            <FAwesome name="sliders" size={35} color="#4c3f91" />
          </View>
        </View>
        <ScrollView horizontal={true} style={styles.wrapperBox}>
          {events.map(item => {
            return (
              <EventBox
                key={`event-${item?.id}`}
                dates={item?.date}
                title={item?.title}
                eventImage={item?.picture}
                eventId={item?.id}
              />
            );
          })}
        </ScrollView>
        <View>
          <Text style={styles.containerText}>Discover</Text>
        </View>
        <CategoryBox />
        <View style={styles.containerUpcoming}>
          <Text style={styles.containerTextUpcoming}>Upcoming</Text>
          <Text>See all</Text>
        </View>
        <View style={styles.monthTextCont}>
          <Text style={styles.monthText}>OCT</Text>
        </View>
        <View>
          {uniqueDates.map(date => {
            const itemsByDate = events.filter(item => item?.date === date);
            const item = itemsByDate[0];
            return (
              <View
                key={`event-by-date-${item?.id}`}
                style={styles.upcomingBox}>
                <DateBox dates={item?.date} days={item?.date} />
                <View style={styles.contentUpcoming}>
                  <EventBox
                    key={`event-${item?.id}`}
                    dates={item?.date}
                    title={item?.title}
                    eventImage={item?.picture}
                    eventId={item?.id}
                  />
                  <TouchableOpacity style={styles.buttonUpcoming}>
                    <Text style={styles.textButton}>
                      Show All {itemsByDate.length} Events
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F0592C',
//   },
//   navbar: {
//     height: 70,
//   },
//   wrapper: {
//     display: 'flex',
//     flexDirection: 'row',
//     flex: 1,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#F0592C',
//     marginHorizontal: 20,
//   },
//   textColor: {
//     color: 'black',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   searchInput: {
//     borderRadius: 10,
//     height: 35,
//     borderWidth: 1,
//     borderColor: 'white',
//     boxShadow: 10,
//     marginHorizontal: 20,
//     backgroundColor: '#F0592C',
//   },
//   inputText: {
//     color: 'black',
//     paddingHorizontal: 20,
//   },
// });

const styles = StyleSheet.create({
  drawerContainer: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    backgroundColor: '#4c3f91',
    gap: 30,
    paddingTop: 30,
  },
  container: {
    backgroundColor: 'white',
    border: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    gap: 10,
    marginBottom: 200,
  },
  textColor: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    opacity: 0.8,
    color: 'white',
    borderColor: 'white',
    fontSize: 17,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    margin: 20,
  },
  containerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    padding: 30,
  },
  textContainer: {
    width: 260,
    height: 376,
    backgroundColor: 'black',
    borderRadius: 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    gap: 10,
  },
  textContaninerNew: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  wrapTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 25,
  },
  textNew: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
  },
  warapperDate: {
    backgroundColor: 'black',
    marginTop: 200,
  },
  wrapperBox: {
    flexDirection: 'row',
    gap: 10,
  },
  wrapperBoxNew: {
    margin: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginLeft: 30,
    width: 165,
    height: 66,
    borderRadius: 30,
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  button1: {
    backgroundColor: 'red',
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  textDiscover: {
    fontSize: 16,
    color: '#884DFF',
  },
  iconDiscover: {
    width: 45,
    height: 45,
    backgroundColor: '#D0B8FF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperBoxDiscover: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTextUpcoming: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  containerUpcoming: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upcomingBox: {
    flexDirection: 'row',
    paddingHorizontal: 30,
  },

  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3D72',
  },
  monthTextCont: {
    paddingHorizontal: 40,
  },
  buttonUpcoming: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 50,
    width: '80%',
    height: 50,
    borderTopColor: '#FF8900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
  contentUpcoming: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;
