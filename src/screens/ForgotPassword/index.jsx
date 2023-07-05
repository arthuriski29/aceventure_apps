import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
// import {Link} from '@react-navigation/native';
import globalStyles from '../../assets/styles';
import {Input, Button} from '../../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import http from '../../helpers/http';

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
    <View style={styles.wrapper}>
      <View style={styles.heading}>
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
          <View>
            <View>
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
              <Button onPress={handleSubmit} btnTitle="Send" />
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
  errorsText: {
    color: '#FF9191',
  },
});

export default ForgotPassword;
