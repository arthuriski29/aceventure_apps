import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Button,
  Platform,
  Image,
} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import globalStyles from '../../assets/styles';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {Formik} from 'formik';
import http from '../../helpers/http';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const CreateEvent = ({navigation}) => {
  const token = useSelector(state => state.auth.token);

  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [location, setLocation] = React.useState([]);
  const [openLocation, setOpenLocation] = React.useState(false);
  const [locationValue, setLocationValue] = React.useState(null);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [categoryValue, setCategoryValue] = React.useState(null);
  const [selectedPicture, setSelectedPicture] = React.useState('');
  const [fileResponse, setFileResponse] = React.useState([]);

  const onDateChange = setDate;

  const getImage = async source => {
    let results;
    if (!source) {
      results = await launchImageLibrary();
    } else {
      results = await launchCamera({
        quality: 0.5,
      });
    }
    const data = results.assets[0];
    console.log(data);
    if (data.uri) {
      setSelectedPicture({
        name: data.fileName,
        type: data.type,
        uri:
          Platform.OS === 'android'
            ? data.uri
            : data.uri.replace('file://', ''),
      });
      setFileResponse(data.uri);
    }
  };

  React.useEffect(() => {
    const getCategory = async () => {
      const {data} = await http().get('/categories');
      const arrCategory = data?.results.map(item => ({
        label: item?.name,
        value: item?.id,
      }));
      setCategory(arrCategory);
    };
    getCategory();
  }, []);

  React.useEffect(() => {
    const getLocation = async () => {
      const {data} = await http().get('/cities');
      const arrCity = data?.results.map(item => ({
        label: item?.name,
        value: item?.id,
      }));
      setLocation(arrCity);
    };
    getLocation();
  }, []);

  const doCreate = async (values, {resetForm}) => {
    const form = new FormData();
    console.log(values);
    console.log(form);
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

    if (category) {
      form.append('category', categoryValue);
    }
    if (location) {
      form.append('cityId', locationValue);
    }
    if (date) {
      form.append('date', moment(date).format('YYYY-MM-DD'));
    }

    try {
      const {data} = await http(token).post('/events/manage', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigation.navigate('ManageEvent');
      setSelectedPicture('');
    } catch (error) {
      console.log(error.message);
    }
  };

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
                <ScrollView>
                  <View style={style.profileWrapper}>
                    {!selectedPicture && (
                      <View>
                        <FeatherIcon name="camera" size={25} color="grey" />
                      </View>
                    )}
                    {selectedPicture && (
                      <View style={style.photosContent}>
                        <View style={style.photoIcons}>
                          <Image
                            style={style.fotoProfile}
                            src={selectedPicture.uri}
                            width={90}
                            height={90}
                          />
                        </View>
                      </View>
                    )}
                    <View style={style.textGap20}>
                      <TouchableOpacity onPress={() => getImage()}>
                        <Text>Choose Picture</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
                      <Text>Category</Text>
                      <View>
                        <DropDownPicker
                          placeholder="Select Category"
                          dropDownContainerStyle={style.dropPicker}
                          textStyle={style.textPicker}
                          open={openCategory}
                          value={categoryValue}
                          items={category}
                          setOpen={setOpenCategory}
                          setValue={setCategoryValue}
                          setItems={setCategory}
                          zIndex={1000}
                          listMode="SCROLLVIEW"
                        />
                      </View>
                    </View>
                    <View style={style.formInput}>
                      <Text style={style.titleInput}>Location</Text>
                      <View>
                        <DropDownPicker
                          placeholder="Select Location"
                          dropDownContainerStyle={style.dropPicker}
                          textStyle={style.textPicker}
                          open={openLocation}
                          value={locationValue}
                          items={location}
                          setOpen={setOpenLocation}
                          setValue={setLocationValue}
                          setItems={setLocation}
                          zIndex={10}
                          listMode="SCROLLVIEW"
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
  fotoProfile: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  dropPicker: {
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 10,
  },

  textPicker: {
    color: '#003d3b',
  },
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
    gap: 45,
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
    gap: 10,
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
    width: 200,
    height: 280,
    borderWidth: 5,
    borderColor: '#4c3f91',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 30,
  },
  photoIcons: {
    width: 200,
    height: 280,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
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
