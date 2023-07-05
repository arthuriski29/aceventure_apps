import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import {Link} from '@react-navigation/native';
import globalStyles from '../../assets/styles';
import {Input, Button} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {asyncLogin} from '../../redux/actions/auth';
import {clearMessage} from '../../redux/reducers/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter the valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = ({navigation}) => {
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
    <View style={styles.wrapper}>
      <View style={styles.heading}>
        <View>
          <Text style={globalStyles.title}>Login</Text>
        </View>
        <View>
          <Text style={globalStyles.subTitle}>
            Hi, Welcome back to Urticket!
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
          <View>
            <View style={styles.formGap}>
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
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    gap: 15,
  },
  heading: {
    gap: 10,
  },
  formGap: {
    gap: 5,
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  errorsText: {
    color: '#FF9191',
  },
});

export default Login;
