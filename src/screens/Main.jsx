import React from 'react';
import {
  SplashScreen,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Home,
  Profile,
  DetailEvent,
  Booking,
  Payment,
  ProfileEdit,
  ChangePassword,
  MyBooking,
  MyWishlist,
  ManageEvent,
  DetailTransaction,
  CreateEvent,
} from './index';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
import {useDispatch} from 'react-redux';
import {logout} from '../redux/reducers/auth';
import {StyleSheet, Text, View} from 'react-native';
import http from '../helpers/http';
import {ImageTemplate} from '../components';
import {picDefProfile} from '../assets';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    if (token) {
      const getProfile = async () => {
        const {data} = await http(token).get('/profile');
        setProfile(data.results);
      };
      getProfile();
    }
  }, [token]);

  return (
    <DrawerContentScrollView {...props}>
      <View style={style.containerProfile}>
        <View style={style.foto}>
          <View style={style.fotoIcon}>
            <ImageTemplate
              src={profile?.picture || null}
              defaultImg={picDefProfile}
              style={style.IMGProfiles}
            />
          </View>
        </View>
        <View>
          <Text style={style.textFullname}>
            {profile?.fullName?.length < 25 && profile?.fullName}
            {profile?.fullName?.length >= 25 &&
              profile?.fullName?.slice(0, 20) + ' ...'}
          </Text>
          <Text style={style.textProfession}>
            {profile.profession ? profile.profession : 'profession: -'}
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => dispatch(logout())}
        icon={({focused, color, size}) => (
          <FeatherIcon name="log-out" color={color} size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#eaeaea',
          width: 340,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />
      <Drawer.Screen
        name="Booking"
        component={Booking}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />
      <Drawer.Screen
        name="Payment"
        component={Payment}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />
      <Drawer.Screen
        name="DetailEvent"
        component={DetailEvent}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />
      <Drawer.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />
      <Drawer.Screen
        name="DetailTransaction"
        component={DetailTransaction}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />
      <Drawer.Screen
        name="CreateEvent"
        component={CreateEvent}
        options={({drawerLabel: () => null}, {drawerItemStyle: {height: 0}})}
      />

      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerActiveTintColor: '#fff',
          drawerActiveBackgroundColor: '#F0592C',
          drawerIcon: ({size}) => <FontAwesome5Icon name="home" size={20} />,
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerActiveTintColor: '#fff',
          drawerActiveBackgroundColor: '#F0592C',
          drawerIcon: ({size}) => <FeatherIcon name="user" size={20} />,
          drawerLabel: 'Profile',
        }}
      />
      <Drawer.Screen
        name="ManageEvent"
        component={ManageEvent}
        options={{
          drawerActiveTintColor: '#fff',
          drawerActiveBackgroundColor: '#F0592C',
          drawerIcon: ({size}) => <FeatherIcon name="plus-circle" size={20} />,
          drawerLabel: 'Manage Event',
        }}
      />
      <Drawer.Screen
        name="MyBooking"
        component={MyBooking}
        options={{
          drawerActiveTintColor: '#fff',
          drawerActiveBackgroundColor: '#F0592C',
          drawerIcon: ({size}) => <FeatherIcon name="clipboard" size={20} />,
          drawerLabel: 'My Booking',
        }}
      />
      <Drawer.Screen
        name="MyWishlist"
        component={MyWishlist}
        options={{
          drawerActiveTintColor: '#fff',
          drawerActiveBackgroundColor: '#F0592C',
          drawerIcon: ({size}) => <FeatherIcon name="heart" size={20} />,
          drawerLabel: 'My Wishlist',
        }}
      />
    </Drawer.Navigator>
  );
}

const style = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  containerProfile: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#F0592C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  fotoIcon: {
    width: 55,
    height: 55,
    backgroundColor: 'gray',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  IMGProfiles: {
    objectFit: 'cover',
    width: 60,
    height: 60,
  },
  textFullname: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
    color: 'black',
    width: 240,
  },
  textProfession: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
    color: 'grey',
  },
});

const Main = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      {!token && (
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </AuthStack.Navigator>
      )}
      {token && (
        <>
          <MyDrawer />
        </>
      )}
    </NavigationContainer>
  );
};

export default Main;
