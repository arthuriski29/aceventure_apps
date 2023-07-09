import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {picDefProfile} from '../../assets';
import {useSelector} from 'react-redux';
import http from '../../helpers/http';
import {ImageTemplate, Input} from '../../components';
import Dropdown from 'react-native-input-select';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {Formik} from 'formik';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCamera,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import {TextInput} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {RadioButton} from 'react-native-paper';

const ProfileEdit = ({navigation}) => {
  const token = useSelector(state => state.auth.token);
  const [editName, setEditName] = React.useState(false);
  const [editUserName, setEditUsername] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
  const [editGender, setEditGender] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [profile, setProfile] = React.useState({});
  const [nation, setNation] = React.useState('');
  const [fileResponse, setFileResponse] = React.useState([]);
  const [prof, setProf] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    };
    getProfile();
  }, [token]);

  const editProfile = async values => {
    setModalVisible(true);
    const form = new FormData();

    Object.keys(values).forEach(key => {
      if (values[key]) {
        form.append(key, values[key]);
      }
    });
    const fileImage = {
      uri: fileResponse,
      type: 'image/jpeg',
      name: 'image' + '-' + Date.now() + '.jpg',
    };

    if (fileResponse.length > 1) {
      form.append('picture', fileImage);
    }

    if (prof) {
      form.append('profession', prof);
    }
    if (nation) {
      form.append('nationality', nation);
    }
    if (date) {
      form.append('birthDate', moment(date).format('YYYY-MM-DD'));
    }

    if (checked1 === true) {
      form.append('gender', true);
    }

    if (checked2 === true) {
      form.append('gender', false);
    }

    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    };

    try {
      const {data} = await http(token).patch('/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(data.results);
    } catch (err) {
      console.warn(err);
    }

    setEditEmail(false);
    setEditPhoneNumber(false);
    setEditUsername(false);
    setEditName(false);
    setEditGender(false);
    getProfile();
    setFileResponse([]);
    setModalVisible(false);
  };

  const profession = [
    'Entrepreneur',
    'Artist',
    'Business Analyst',
    'Construction Worker',
    'Designer',
    'Freelancer',
    'Social Worker',
    'Elite Wrestler',
    'Football Player',
  ];
  const nationality = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua',
    'Argentina',
    'Armenian',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahama',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Barbuda',
    'Belarusia',
    'Belgia',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burma',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Central African',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Ecuador',
    'Egypt',
    'Salvador',
    'Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea-Bissau',
    'Guinea',
    'Guyana',
    'Haiti',
    'Herzegovina',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Ivory Coast',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kuwait',
    'Kyrgyztan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Nigeria',
    'North Korea',
    'Northern Ireland',
    'Norwegia',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Phillipines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Scotland',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Island',
    'Somalia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Swiss',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor Leste',
    'Togo',
    'Tonga',
    'Tobago',
    'Tunisia',
    'Turkey',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'Uni Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Wales',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  const handleDocumentSelection = React.useCallback(async () => {
    try {
      const response = await launchImageLibrary({
        presentationStyle: 'fullScreen',
      });

      setFileResponse(response.assets[0].uri);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleCameraSelection = React.useCallback(async () => {
    try {
      const response = await launchCamera({
        presentationStyle: 'fullScreen',
      });

      setFileResponse(response.assets[0].uri);
    } catch (err) {
      console.warn(err);
    }
  }, []);

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
          <Text style={style.textHeader}>Edit Profile</Text>
        </View>
        <View style={style.contentHeader} />
      </View>
      <Formik
        initialValues={{
          fullName: profile?.fullName,
          email: profile?.email,
          phoneNumber: profile?.phoneNumber,
          profession: profile?.profession,
          nationality: profile?.nationality,
          birthDate: profile?.birthDate,
        }}
        onSubmit={editProfile}>
        {({values, handleBlur, handleChange, handleSubmit}) => {
          return (
            <>
              <View style={style.containerProfile}>
                <View style={style.profileWrapper}>
                  <View style={style.photosContent}>
                    <View style={style.photoIcons}>
                      <ImageTemplate
                        src={profile?.picture || null}
                        defaultImg={picDefProfile}
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
                      onPress={handleDocumentSelection}>
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
                      onPress={handleCameraSelection}>
                      <FontAwesomeIcon icon={faCamera} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                <ScrollView>
                  <View style={style.dataProfileWrapper}>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Name</Text>
                      <View style={style.ProfileValueWrapper}>
                        {!editName && (
                          <Text style={style.valueInput}>
                            {profile?.fullName}
                          </Text>
                        )}
                        {!editName && (
                          <Text
                            onPress={() => setEditName(true)}
                            style={style.EditBtnStyle}>
                            Edit
                          </Text>
                        )}
                        {editName && (
                          <TextInput
                            style={style.ProfileNameInput}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
                          />
                        )}
                      </View>
                    </View>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Username</Text>
                      <View style={style.ProfileValueWrapper}>
                        {!editUserName && (
                          <Text style={style.valueInput}>
                            {profile?.username}
                          </Text>
                        )}
                        {!editUserName && (
                          <Text
                            onPress={() => setEditUsername(true)}
                            style={style.EditBtnStyle}>
                            Edit
                          </Text>
                        )}
                        {editUserName && (
                          <TextInput
                            style={style.ProfileNameInput}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                          />
                        )}
                      </View>
                    </View>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Email</Text>
                      <View style={style.ProfileValueWrapper}>
                        {!editEmail && (
                          <Text style={style.valueInput}>{profile?.email}</Text>
                        )}
                        {!editEmail && (
                          <Text
                            onPress={() => setEditEmail(true)}
                            style={style.EditBtnStyle}>
                            Edit
                          </Text>
                        )}
                        {editEmail && (
                          <TextInput
                            style={style.ProfileNameInput}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                          />
                        )}
                      </View>
                    </View>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Phone</Text>
                      <View style={style.ProfileValueWrapper}>
                        {!editPhoneNumber && (
                          <Text style={style.valueInput}>
                            {profile?.phoneNumber}
                          </Text>
                        )}
                        {!editPhoneNumber && (
                          <Text
                            onPress={() => setEditPhoneNumber(true)}
                            style={style.EditBtnStyle}>
                            Edit
                          </Text>
                        )}
                        {editPhoneNumber && (
                          <TextInput
                            style={style.ProfileNameInput}
                            onChangeText={handleChange('phoneNumber')}
                            onBlur={handleBlur('phoneNumber')}
                            value={values.phoneNumber}
                          />
                        )}
                      </View>
                    </View>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Profession</Text>
                      <View>
                        <SelectDropdown
                          data={profession}
                          defaultButtonText={profile?.profession}
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
                          renderDropdownIcon={isOpened => {
                            return (
                              <FontAwesomeIcon
                                icon={isOpened ? faChevronUp : faChevronDown}
                                color={'#7B7B7B'}
                                size={18}
                              />
                            );
                          }}
                          onSelect={selectedItem => {
                            setProf(selectedItem);
                          }}
                          buttonTextAfterSelection={selectedItem => {
                            return selectedItem;
                          }}
                          rowTextForSelection={item => {
                            return item;
                          }}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={style.titleInput}>Select Nationality</Text>
                      <SelectDropdown
                        data={nationality}
                        defaultButtonText={profile?.nationality}
                        dropdownStyle={{
                          backgroundColor: '#EFEFEF',
                          borderWidth: 0,
                          borderRadius: 10,
                        }}
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
                        renderDropdownIcon={isOpened => {
                          return (
                            <FontAwesomeIcon
                              icon={isOpened ? faChevronUp : faChevronDown}
                              color={'#7B7B7B'}
                              size={18}
                            />
                          );
                        }}
                        buttonStyle={style.SelectDropdownStyle}
                        onSelect={selectedItem => {
                          setNation(selectedItem);
                        }}
                        buttonTextAfterSelection={selectedItem => {
                          return selectedItem;
                        }}
                        rowTextForSelection={item => {
                          return item;
                        }}
                      />
                    </View>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Gender</Text>
                      <View style={style.ProfileValueWrapper}>
                        {editGender && (
                          <>
                            <View style={style.RadioWrapperStyle}>
                              <RadioButton
                                value="1"
                                status={checked1 ? 'checked' : 'unchecked'}
                                uncheckedColor="#7B7B7B"
                                color="#F0592C"
                                onPress={function () {
                                  setChecked1(!checked1);
                                  setChecked2(false);
                                }}
                              />
                              <Text
                                onPress={function () {
                                  setChecked1(!checked1);
                                  setChecked2(false);
                                }}
                                style={style.valueInput}>
                                Male
                              </Text>
                            </View>
                            <View style={style.RadioWrapperStyle}>
                              <RadioButton
                                value="0"
                                status={checked2 ? 'checked' : 'unchecked'}
                                uncheckedColor="#7B7B7B"
                                color="#F0592C"
                                onPress={function () {
                                  setChecked2(!checked2);
                                  setChecked1(false);
                                }}
                              />
                              <Text
                                onPress={function () {
                                  setChecked2(!checked2);
                                  setChecked1(false);
                                }}
                                style={style.FontStyle}>
                                Female
                              </Text>
                            </View>
                          </>
                        )}
                        {!editGender && (
                          <>
                            <View style={style.RadioWrapperStyle}>
                              <Text style={style.FontStyle}>
                                {profile?.gender === true ? 'Male' : 'Female'}
                              </Text>
                            </View>
                          </>
                        )}
                        <Text
                          onPress={() => setEditGender(true)}
                          style={style.EditBtnStyle}>
                          Edit
                        </Text>
                      </View>
                    </View>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Date</Text>
                      <View>
                        <View style={style.ProfileValueWrapper}>
                          <View style={style.DateWrapper}>
                            <Text style={style.valueInput}>
                              {moment(profile?.birthDate).format('DD/MM/YYYY')}
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
                        />
                      </View>
                    </View>
                  </View>
                </ScrollView>
                <View style={style.btnContainer}>
                  <TouchableOpacity style={style.touchButton}>
                    <Text onPress={handleSubmit} style={style.textTouch}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
      <Modal
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
          {/* <SimpleLottie /> */}
        </View>
      </Modal>
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
    borderColor: '#444',
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
export default ProfileEdit;
