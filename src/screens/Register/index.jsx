import {
  View,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {Link} from '@react-navigation/native';
import globalStyles from '../../assets/styles';
import {Input, Button} from '../../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {asyncRegister} from '../../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {clearMessage} from '../../redux/reducers/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full Name is Required!')
    .min(3, 'Please insert valid full name'),
  email: Yup.string().required('Email is Required!').email('Email is invalid!'),
  password: Yup.string().required('Password is Required'),
  confirmPassword: Yup.string()
    .required('Confirm password is Required')
    .oneOf([Yup.ref('password'), null], 'Password must match'),
  acceptTerm: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions',
  ),
});

const Register = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const dispatch = useDispatch();
  const successMessage = useSelector(state => state.auth.successMessage);
  const errorMessage = useSelector(state => state.auth.errorMessage);

  const doRegister = values => {
    dispatch(asyncRegister(values));
  };

  if (successMessage) {
    setTimeout(() => {
      dispatch(clearMessage());
      navigation.replace('Login');
    }, 1500);
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
            <Text style={globalStyles.title}>Sign Up</Text>
          </View>
          <View>
            <Text style={globalStyles.subTitle}>
              Already have an account?
              <Link to="/Login" style={globalStyles.link}>
                Login
              </Link>
            </Text>
          </View>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
        </View>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerm: false,
          }}
          validationSchema={validationSchema}
          onSubmit={doRegister}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={globalStyles.formGap}>
              <View style={globalStyles.inputGap}>
                <Input
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  keyboardType="default"
                  placeholder="Full Name"
                />
                {errors.fullName && touched.fullName && (
                  <Text style={styles.errorsText}>{errors.fullName}</Text>
                )}
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
                <Input
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  keyboardType="default"
                  placeholder="Confirm Password"
                  secureTextEntry
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorsText}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
              <View>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    disabled={false}
                    value={(toggleCheckBox, values.acceptTerm)}
                    onValueChange={newValue => {
                      setToggleCheckBox(newValue);
                      setFieldValue('acceptTerm', newValue);
                    }}
                  />
                  <View style={styles.checkboxText}>
                    <Text> Accept terms and conditions</Text>
                  </View>
                </View>
                {errors.acceptTerm && touched.acceptTerm && (
                  <Text style={styles.errorsText}>{errors.acceptTerm}</Text>
                )}
              </View>
              <View>
                <Button onPress={handleSubmit}>Sign Up</Button>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxText: {
    alignSelf: 'center',
  },
  errorsText: {
    color: '#FF9191',
  },
});

export default Register;
