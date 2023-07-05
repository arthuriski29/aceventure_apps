import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 45,
    backgroundColor: '#F0592C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#373A42',
  },
  subTitle: {
    fontSize: 15,
    color: '#373A42',
  },
  input: {
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 20,
    borderColor: '#F0592C',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputComponent: {
    flex: 1,
  },
  link: {
    color: '#F0592C',
  },
});

export default styles;
