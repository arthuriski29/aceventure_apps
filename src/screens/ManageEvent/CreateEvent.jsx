import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  // SafeAreaView,
  // KeyboardAvoidingView,
  TouchableOpacity,
  // Platform,
  StatusBar,
  TextInput,
  Button,
  // Modal,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {picSplash} from '../../assets';
// import {useSelector} from 'react-redux';
// import http from '../../helpers/http';
import {ImageTemplate} from '../../components';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
// import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCamera,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import globalStyles from '../../assets/styles';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Formik} from 'formik';
// import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

// import {TextInput} from 'react-native';
// import moment from 'moment';
// import DatePicker from 'react-native-date-picker';
// import {RadioButton} from 'react-native-paper';

const CreateEvent = ({navigation}) => {
  // const token = useSelector(state => state.auth.token);
  // const [editName, setEditName] = React.useState(false);
  // const [editUserName, setEditUsername] = React.useState(false);
  // const [editEmail, setEditEmail] = React.useState(false);
  // const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
  // const [editGender, setEditGender] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [evtitle, setEvtitle] = React.useState('');
  const [profession, setProfession] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  // const [checked1, setChecked1] = React.useState(false);
  // const [checked2, setChecked2] = React.useState(false);
  // const [profile, setProfile] = React.useState({});
  // const [nation, setNation] = React.useState('');
  // const [fileResponse, setFileResponse] = React.useState([]);
  // const [prof, setProf] = React.useState('');
  // const [modalVisible, setModalVisible] = React.useState(false);
  // const handleHead = ({tintColor}) => (
  //   <Text style={{color: tintColor}}>H1</Text>
  // );
  // const richText = React.useRef();
  const dataCategory = ['Arts', 'Music', 'Sport'];
  const dataLoc = ['Padang', 'Aceh', 'Zimbabwe'];
  // console.log(text);
  const onChaTitle = (selectedItem, index) => {
    const select = index + 1;
    console.log(selectedItem, select);
    setEvtitle(select);
  };
  const onSelCategory = (selectedItem, index) => {
    const select = index + 1;
    console.log(selectedItem, select);
    setCategory(select);
  };
  const onSelLocation = (selectedItem, index) => {
    const select = index + 1;
    console.log(selectedItem, select);
    setProfession(select);
  };
  const onDateChange = setDate;

  const doCreate = values => {
    const form = new FormData();
    console.log(values);
    console.log(form);
    Object.keys(values).forEach(key => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });

    if (category) {
      form.append('category', category);
    }
    if (profession) {
      form.append('profession', profession);
    }
    if (date) {
      form.append('date', moment(date).format('YYYY-MM-DD'));
    }
    console.log(category, profession, date);
  };
  // React.useEffect(() => {
  //   const getProfile = async () => {
  //     const {data} = await http(token).get('/profile');
  //     setProfile(data.results);
  //   };
  //   getProfile();
  // }, [token]);

  // const editProfile = async values => {
  //   setModalVisible(true);
  //   const form = new FormData();

  //   Object.keys(values).forEach(key => {
  //     if (values[key]) {
  //       form.append(key, values[key]);
  //     }
  //   });
  //   const fileImage = {
  //     uri: fileResponse,
  //     type: 'image/jpeg',
  //     name: 'image' + '-' + Date.now() + '.jpg',
  //   };

  //   if (fileResponse.length > 1) {
  //     form.append('picture', fileImage);
  //   }

  //   if (prof) {
  //     form.append('profession', prof);
  //   }
  //   if (nation) {
  //     form.append('nationality', nation);
  //   }
  //   if (date) {
  //     form.append('birthDate', moment(date).format('YYYY-MM-DD'));
  //   }

  //   if (checked1 === true) {
  //     form.append('gender', true);
  //   }

  //   if (checked2 === true) {
  //     form.append('gender', false);
  //   }

  //   const getProfile = async () => {
  //     const {data} = await http(token).get('/profile');
  //     setProfile(data.results);
  //   };

  //   try {
  //     const {data} = await http(token).patch('/profile', form, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     setProfile(data.results);
  //   } catch (err) {
  //     console.warn(err);
  //   }

  //   setEditEmail(false);
  //   setEditPhoneNumber(false);
  //   setEditUsername(false);
  //   setEditName(false);
  //   setEditGender(false);
  //   getProfile();
  //   setFileResponse([]);
  //   setModalVisible(false);
  // };

  // const profession = [
  //   'Entrepreneur',
  //   'Artist',
  //   'Business Analyst',
  //   'Construction Worker',
  //   'Designer',
  //   'Freelancer',
  //   'Social Worker',
  //   'Elite Wrestler',
  //   'Football Player',
  // ];
  // const nationality = [
  //   'Afghanistan',
  //   'Albania',
  //   'Algeria',
  //   'Andorra',
  //   'Angola',
  //   'Antigua',
  //   'Argentina',
  //   'Armenian',
  //   'Australia',
  //   'Austria',
  //   'Azerbaijan',
  //   'Bahama',
  //   'Bahrain',
  //   'Bangladesh',
  //   'Barbados',
  //   'Barbuda',
  //   'Belarusia',
  //   'Belgia',
  //   'Belize',
  //   'Benin',
  //   'Bhutan',
  //   'Bolivia',
  //   'Bosnia',
  //   'Botswana',
  //   'Brazil',
  //   'Brunei',
  //   'Bulgaria',
  //   'Burkina Faso',
  //   'Burma',
  //   'Burundi',
  //   'Cambodia',
  //   'Cameroon',
  //   'Canada',
  //   'Cape Verde',
  //   'Central African',
  //   'Chad',
  //   'Chile',
  //   'China',
  //   'Colombia',
  //   'Comoros',
  //   'Congo',
  //   'Costa Rica',
  //   'Croatia',
  //   'Cuba',
  //   'Cyprus',
  //   'Czech',
  //   'Denmark',
  //   'Djibouti',
  //   'Dominica',
  //   'Ecuador',
  //   'Egypt',
  //   'Salvador',
  //   'Guinea',
  //   'Eritrea',
  //   'Estonia',
  //   'Eswatini',
  //   'Ethiopia',
  //   'Fiji',
  //   'Finland',
  //   'France',
  //   'Gabon',
  //   'Gambia',
  //   'Georgia',
  //   'Germany',
  //   'Ghana',
  //   'Greece',
  //   'Grenada',
  //   'Guatemala',
  //   'Guinea-Bissau',
  //   'Guinea',
  //   'Guyana',
  //   'Haiti',
  //   'Herzegovina',
  //   'Honduras',
  //   'Hungary',
  //   'Iceland',
  //   'India',
  //   'Indonesia',
  //   'Iran',
  //   'Iraq',
  //   'Ireland',
  //   'Israel',
  //   'Italy',
  //   'Ivory Coast',
  //   'Jamaica',
  //   'Japan',
  //   'Jordan',
  //   'Kazakhstan',
  //   'Kenya',
  //   'Kuwait',
  //   'Kyrgyztan',
  //   'Laos',
  //   'Latvia',
  //   'Lebanon',
  //   'Lesotho',
  //   'Liberia',
  //   'Libya',
  //   'Liechtenstein',
  //   'Lithuania',
  //   'Luxembourg',
  //   'Macedonia',
  //   'Madagascar',
  //   'Malawi',
  //   'Malaysia',
  //   'Maldives',
  //   'Mali',
  //   'Malta',
  //   'Marshall Islands',
  //   'Mauritania',
  //   'Mauritius',
  //   'Mexico',
  //   'Micronesia',
  //   'Moldova',
  //   'Monaco',
  //   'Mongolia',
  //   'Morocco',
  //   'Mozambique',
  //   'Namibia',
  //   'Nauru',
  //   'Nepal',
  //   'Netherlands',
  //   'New Zealand',
  //   'Nicaragua',
  //   'Nigeria',
  //   'North Korea',
  //   'Northern Ireland',
  //   'Norwegia',
  //   'Oman',
  //   'Pakistan',
  //   'Palau',
  //   'Panama',
  //   'Papua New Guinea',
  //   'Paraguay',
  //   'Peru',
  //   'Phillipines',
  //   'Poland',
  //   'Portugal',
  //   'Qatar',
  //   'Romania',
  //   'Russia',
  //   'Rwanda',
  //   'Saint Kitts and Nevis',
  //   'Saint Lucia',
  //   'Samoa',
  //   'San Marino',
  //   'Sao Tome and Principe',
  //   'Saudi Arabia',
  //   'Scotland',
  //   'Senegal',
  //   'Serbia',
  //   'Seychelles',
  //   'Sierra Leone',
  //   'Singapore',
  //   'Slovakia',
  //   'Slovenia',
  //   'Solomon Island',
  //   'Somalia',
  //   'South Africa',
  //   'South Korea',
  //   'Spain',
  //   'Sri Lanka',
  //   'Sudan',
  //   'Suriname',
  //   'Sweden',
  //   'Swiss',
  //   'Syria',
  //   'Taiwan',
  //   'Tajikistan',
  //   'Tanzania',
  //   'Thailand',
  //   'Timor Leste',
  //   'Togo',
  //   'Tonga',
  //   'Tobago',
  //   'Tunisia',
  //   'Turkey',
  //   'Tuvalu',
  //   'Uganda',
  //   'Ukraine',
  //   'Uni Emirates',
  //   'United Kingdom',
  //   'United States',
  //   'Uruguay',
  //   'Uzbekistan',
  //   'Vanuatu',
  //   'Venezuela',
  //   'Vietnam',
  //   'Wales',
  //   'Yemen',
  //   'Zambia',
  //   'Zimbabwe',
  // ];

  // const handleDocumentSelection = React.useCallback(async () => {
  //   try {
  //     const response = await launchImageLibrary({
  //       presentationStyle: 'fullScreen',
  //     });

  //     setFileResponse(response.assets[0].uri);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }, []);

  // const handleCameraSelection = React.useCallback(async () => {
  //   try {
  //     const response = await launchCamera({
  //       presentationStyle: 'fullScreen',
  //     });

  //     setFileResponse(response.assets[0].uri);
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }, []);

  const handlePressEvent = () => {
    navigation.navigate('Profile');
  };
  return (
    <View style={style.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={style.sectionHeader}>
        <View style={style.contentHeader}>
          <TouchableOpacity>
            <FeatherIcon
              name="arrow-left"
              onPress={handlePressEvent}
              size={35}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={style.textHeader}>Create Event</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <Formik
        initialValues={{
          title: '',
          description: '',
        }}
        onSubmit={doCreate}>
        {({values, handleBlur, handleChange, handleSubmit}) => {
          return (
            <>
              <View style={style.containerProfile}>
                <View style={style.profileWrapper}>
                  <View style={style.photosContent}>
                    <View style={style.photoIcons}>
                      <ImageTemplate
                        src={null}
                        defaultImg={picSplash}
                        style={style.IMGProfiles}
                      />
                    </View>
                  </View>
                  <View style={style.photoOptions}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#F0592C',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        marginTop: 10,
                        marginBottom: 20,
                        height: 40,
                      }}
                      // onPress={handleDocumentSelection}
                    >
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: 'white',
                          paddingTop: 5,
                          paddingHorizontal: 8,
                        }}>
                        Select Picture
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#F0592C',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 8,
                        marginTop: 10,
                        marginBottom: 20,
                        paddingHorizontal: 20,
                        height: 40,
                      }}
                      // onPress={handleCameraSelection}
                    >
                      <FontAwesomeIcon icon={faCamera} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                <ScrollView>
                  <View style={style.dataProfileWrapper}>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Title</Text>
                      <View style={globalStyles.input}>
                        <TextInput
                          style={globalStyles.inputComponent}
                          name="title"
                          placeholder="Input Title..."
                          onChangeText={handleChange('title')}
                          onBlur={handleBlur('title')}
                        />
                      </View>
                    </View>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Category</Text>
                      <View>
                        <SelectDropdown
                          name="categoryId"
                          data={dataCategory}
                          onSelect={onSelCategory}
                          defaultButtonText="Select Category ..."
                          dropdownStyle={{
                            backgroundColor: '#EFEFEF',
                            borderWidth: 0,
                            borderRadius: 10,
                          }}
                          buttonStyle={style.SelectDropdownStyle}
                          buttonTextStyle={{
                            color: '#7B7B7B',
                            textAlign: 'left',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 13,
                          }}
                          buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                          }}
                          rowTextForSelection={item => {
                            return item;
                          }}
                          rowStyle={{
                            backgroundColor: '#EFEFEF',
                          }}
                          rowTextStyle={{
                            color: '#7B7B7B',
                            textAlign: 'left',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 13,
                          }}
                          renderDropdownIcon={isOpened => {
                            return (
                              <FontAwesomeIcon
                                icon={isOpened ? faChevronUp : faChevronDown}
                                color={'#7B7B7B'}
                                size={18}
                              />
                            );
                          }}
                          // onSelect={selectedItem => {
                          //   setProf(selectedItem);
                          // }}
                          // buttonTextAfterSelection={selectedItem => {
                          //   return selectedItem;
                          // }}
                          // rowTextForSelection={item => {
                          //   return item;
                          // }}
                        />
                      </View>
                    </View>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Location</Text>
                      <View>
                        <SelectDropdown
                          data={dataLoc}
                          defaultButtonText="Select Location..."
                          onSelect={onSelLocation}
                          dropdownStyle={{
                            backgroundColor: '#EFEFEF',
                            borderWidth: 0,
                            borderRadius: 10,
                          }}
                          buttonStyle={style.SelectDropdownStyle}
                          buttonTextStyle={{
                            color: '#7B7B7B',
                            textAlign: 'left',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 13,
                          }}
                          rowStyle={{
                            backgroundColor: '#EFEFEF',
                          }}
                          rowTextStyle={{
                            color: '#7B7B7B',
                            textAlign: 'left',
                            fontFamily: 'Poppins-Regular',
                            fontSize: 13,
                          }}
                          afterSelected={(selectedItem, index) => {
                            return selectedItem;
                          }}
                          rowSelected={item => {
                            return item;
                          }}
                          renderDropdownIcon={isOpened => {
                            return (
                              <FontAwesomeIcon
                                icon={isOpened ? faChevronUp : faChevronDown}
                                color={'#7B7B7B'}
                                size={18}
                              />
                            );
                          }}
                          // onSelect={selectedItem => {
                          //   setProf(selectedItem);
                          // }}
                          // buttonTextAfterSelection={selectedItem => {
                          //   return selectedItem;
                          // }}
                          // rowTextForSelection={item => {
                          //   return item;
                          // }}
                        />
                      </View>
                    </View>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Date of Event</Text>
                      <View>
                        <View style={style.ProfileValueWrapper}>
                          <View style={style.DateWrapper}>
                            <Text style={style.valueInput}>
                              {moment('2023-11-17T00:00:00.000Z').format(
                                'DD/MM/YYYY',
                              )}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={style.EditBtnStyle}
                              onPress={() => setOpen(true)}>
                              Edit
                            </Text>
                          </View>
                        </View>
                        <DatePicker
                          modal
                          open={open}
                          mode="date"
                          date={date}
                          onConfirm={date => {
                            setOpen(false);
                            setDate(date);
                          }}
                          onCancel={() => {
                            setOpen(false);
                          }}
                          onDateChange={onDateChange}
                        />
                      </View>
                    </View>
                    <View style={style.formInput}>
                      <View style={globalStyles.descInput}>
                        <TextInput
                          multiline
                          style={style.titleInput}
                          name="description"
                          // onChangeText={text => onChangeText(text)}
                          onChangeText={handleChange('description')}
                          onBlur={handleBlur('description')}
                          placeholder="Write Description..."
                          keyboardType="default"
                        />
                        {/* <TextInput
                  style={globalStyles.inputComponent}
                  placeholder="Write Description..."
                /> */}
                      </View>
                    </View>
                  </View>
                </ScrollView>
                <View style={style.btnContainer}>
                  <Button onPress={handleSubmit} btnTitle="Save" title="Save" />
                </View>
              </View>
            </>
          );
        }}
      </Formik>
      {/* <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 25,
            backgroundColor: 'white',
          }}>
          <SimpleLottie />
        </View>
      </Modal> */}
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
  containerProfile: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    gap: 35,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  EditBtnStyle: {
    fontFamily: 'Poppins-Medium',
    color: '#F0592C',
  },
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 5,
  },
  ProfileValueWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  dataProfileWrapper: {
    marginTop: 20,
    gap: 20,
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
  photoOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  ProfileNameInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    width: '100%',
    fontFamily: 'Poppins-Medium',
    paddingVertical: 13,
  },
  IMGProfiles: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  formInput: {
    width: '100%',
    gap: 15,
  },
  btnContainer: {
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
  SelectDropdownStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F0592C',
    fontFamily: 'Poppins-Medium',
  },
  titleInput: {
    fontFamily: 'Poppins-Bold',
  },
  valueInput: {
    fontFamily: 'Poppins-Regular',
  },
  BirthDateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  DateWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
  },
  GenderWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  RadioWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default CreateEvent;
