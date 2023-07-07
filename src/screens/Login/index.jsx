import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Link} from '@react-navigation/native';
import globalStyles from '../../assets/styles';
import {Input, Button} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {asyncLogin} from '../../redux/actions/auth';
import {clearMessage} from '../../redux/reducers/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome5';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter the valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const doLogin = values => {
    dispatch(asyncLogin(values));
  };
  if (errorMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  }
  return (
    <ScrollView style={globalStyles.wrapper}>
      <StatusBar
        barStyle="default"
        translucent={true}
        backgroundColor="#F0592C"
      />
      <TouchableOpacity>
        <Icon name="arrow-left" size={25} color="transparent" />
      </TouchableOpacity>
      <View style={globalStyles.componentWrap}>
        <View style={globalStyles.heading}>
          <View>
            <Text style={globalStyles.title}>Login</Text>
          </View>
          <View>
            <Text style={globalStyles.subTitle}>
              Hi, Welcome back to Urticket!
              <Link to="/Register" style={globalStyles.link}>
                Register
              </Link>
            </Text>
            {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
          </View>
        </View>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={doLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={globalStyles.formGap}>
              <View style={globalStyles.inputGap}>
                <Input
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  placeholder="Email"
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorsText}>{errors.email}</Text>
                )}
                <Input
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  keyboardType="default"
                  placeholder="Password"
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorsText}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.alignRight}>
                <Link to="/ForgotPassword" style={globalStyles.link}>
                  Forgot Password ?
                </Link>
              </View>

              <View>
                <Button
                  disabled={!touched.email && !touched.password}
                  onPress={handleSubmit}
                  btnTitle="Login">
                  Log In
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  alignRight: {
    alignSelf: 'flex-end',
  },
  errorsText: {
    color: '#FF9191',
  },
});

export default Login;
