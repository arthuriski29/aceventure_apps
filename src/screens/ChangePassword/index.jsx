import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import {Alert, Button, Input} from '../../components';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .required('Old Password is Required')
    .min(8, ({min}) => `Password must be at least ${min} characters`),
  newPassword: Yup.string()
    .required('New Password is Required')
    .min(8, ({min}) => `Password must be at least ${min} characters`),
  confirmPassword: Yup.string()
    .required('Confirm Password is Required')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .oneOf([Yup.ref('newPassword'), null], 'Password must match'),
});

const ChangePassword = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const doChangePass = async values => {
    try {
      const {oldPassword, newPassword, confirmPassword} = values;
      const form = new URLSearchParams({
        oldPassword,
        newPassword,
        confirmPassword,
      });
      const {data} = await http(token).patch(
        '/changePassword',
        form.toString(),
      );
      console.log(data);
      if (data?.message) {
        setSuccessMessage(data?.message);
        setTimeout(() => navigation.navigate('Profile'), 2000);
      }
      // console.log(form.toString());
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
    setTimeout(() => setErrorMessage(''), 2500);
  }

  const handlePressEvent = () => {
    navigation.navigate('Profile');
  };
  return (
    <View style={style.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={style.sectionHeader}>
        <View style={style.contentHeader}>
          <TouchableOpacity onPress={handlePressEvent}>
            <FeatherIcon name="arrow-left" size={35} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={style.textHeader}>Change Password</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <View style={style.containerForm}>
        <View style={style.formWrapper}>
          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doChangePass}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={style.formInput}>
                {successMessage && (
                  <Alert variant="success">{successMessage}</Alert>
                )}
                {errorMessage && <Alert variant="error">{errorMessage}</Alert>}

                <View style={style.itemFormInput}>
                  <Text style={style.titleInput}>Old Password</Text>
                  <View>
                    <Input
                      onChangeText={handleChange('oldPassword')}
                      onBlur={handleBlur('oldPassword')}
                      value={values.oldPassword}
                      placeholder="Enter your old password"
                      password
                      secureTextEntry
                    />
                    {errors.oldPassword && touched.oldPassword && (
                      <Text style={style.errorsText}>{errors.oldPassword}</Text>
                    )}
                  </View>
                </View>

                <View style={style.itemFormInput}>
                  <Text style={style.titleInput}>New Password</Text>
                  <View>
                    <Input
                      onChangeText={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      value={values.newPassword}
                      placeholder="Enter your new password"
                      password
                      secureTextEntry
                    />
                    {errors.newPassword && touched.newPassword && (
                      <Text style={style.errorsText}>{errors.newPassword}</Text>
                    )}
                  </View>
                </View>

                <View style={style.itemFormInput}>
                  <Text style={style.titleInput}>Confirm Password</Text>
                  <View>
                    <Input
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      placeholder="Re-Enter your New password"
                      password
                      secureTextEntry
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <Text style={style.errorsText}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>
                </View>

                <Button onPress={handleSubmit} btnTitle="Reset">
                  Reset Password
                </Button>
              </View>
            )}
          </Formik>
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
  containerForm: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    gap: 35,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  formWrapper: {
    marginTop: 20,
    gap: 30,
    marginBottom: 120,
  },
  photosContent: {
    width: 137,
    height: 137,
    borderWidth: 5,
    borderColor: '#F0592C',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  photoIcons: {
    width: 115,
    height: 115,
    backgroundColor: 'gray',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  IMGProfiles: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  formInput: {
    width: '100%',
    gap: 25,
  },
  itemFormInput: {
    width: '100%',
    gap: 5,
  },
  btnContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 30,
    width: '100%',
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
  errorsText: {
    color: '#FF9191',
  },
  titleInput: {
    fontFamily: 'Poppins-Bold',
  },
});
export default ChangePassword;
