import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
// import {Link} from '@react-navigation/native';
import globalStyles from '../../assets/styles';
import {Input, Button} from '../../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import http from '../../helpers/http';
import Icon from 'react-native-vector-icons/FontAwesome5';

const validationSchema = Yup.object({
  email: Yup.string().required('Email is Required!').email('Email is invalid!'),
});

const ForgotPassword = ({navigation}) => {
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const doForgot = async values => {
    try {
      const form = new URLSearchParams();
      form.append('email', values.email);
      const {data} = await http().post('/auth/forgotPassword', form.toString());
      if (data?.message) {
        setSuccessMessage(data?.message);
        setTimeout(() => navigation.replace('ResetPassword'), 2000);
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      if (errorMsg) {
        setErrorMessage(errorMsg);
      }
    }
  };
  if (successMessage) {
    setTimeout(() => setSuccessMessage(''), 1500);
  }
  if (errorMessage) {
    setTimeout(() => setErrorMessage(''), 1500);
  }
  return (
    <ScrollView style={globalStyles.wrapper}>
      <StatusBar
        barStyle="default"
        translucent={true}
        backgroundColor="#F0592C"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Icon name="arrow-left" size={25} color="#373A42" />
      </TouchableOpacity>
      <View style={globalStyles.componentWrap}>
        <View style={globalStyles.heading}>
          <View>
            <Text style={globalStyles.title}>Forgot Password</Text>
          </View>
          <View>
            <Text style={globalStyles.subTitle}>
              You&rsquo;ll get mail soon on your email
            </Text>
          </View>
        </View>
        <Formik
          initialValues={{email: ''}}
          validationSchema={validationSchema}
          onSubmit={doForgot}>
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
              </View>
              {errors.email && touched.email && (
                <Text style={styles.errorsText}>{errors.email}</Text>
              )}
              <View>
                <Button onPress={handleSubmit} btnTitle="Send">
                  Send
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
  wrapper: {
    paddingHorizontal: 10,
    gap: 15,
  },
  heading: {
    gap: 10,
  },
  errorsText: {
    color: '#FF9191',
  },
});

export default ForgotPassword;
