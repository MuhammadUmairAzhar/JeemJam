import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Touchable,
  TouchableOpacity,
  Pressable,
  Linking,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import PopUpModal from './PopUpModel';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
  const [personname, setpersonname] = useState('');
  const [personshow, setpersonshow] = useState('');

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('PERSON', personname);
      console.log('Data saved properly');
    } catch (e) {
      console.log(e.message);
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('PERSON');
      if (value !== null) {
        setpersonshow(value);
        console.log(value);
        setpersonname('');
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const nameSetted = () => {
    storeData();
    getData();
  };

  const [userData, setuserData] = useState({});
  console.log(userData);

  React.useEffect(() => {
    fetch('https://jeemjam.com/api/register')
      .then(response => response.json())
      .then(json => setuserData(json))
      .catch(error => console.error(error));
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const changeModelVisibility = bool => {
    setModalVisible(bool);
  };

  const [profileimage, setprofileimage] = React.useState(
    'https://icon-library.com/images/user-image-icon/user-image-icon-18.jpg',
  );
  const [newImage, setnewImage] = useState(null);
  const selectProfileImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setprofileimage(image.path);
      setnewImage(image.path);
    });
  };

  const ShareApp = () => {
    const ShareOptions = {
      message:
        ' Visit JeemJam & download JEEMJAM APP from Playstore or Appstore ',
      url: 'https://jeemjam.com/',
    };
    Share.open(ShareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  const emailId = 'Support@jeemjam.com';

  const onPressEmailClick = email => {
    Linking.openURL('mailto:' + email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headview}>
        <FontAwesome5
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={18}
          color={'white'}
          style={{marginLeft: 10}}
          solid
        />
        <Text style={styles.heading}>Profile</Text>
      </View>
      <ScrollView>
        <TouchableOpacity onPress={selectProfileImage}>
          {newImage ? (
            <Image source={{uri: newImage}} style={styles.img} />
          ) : (
            <Image source={{uri: profileimage}} style={styles.img} />
          )}
          <View
            style={{
              position: 'absolute',
              top: 155,
              left: 185,
            }}>
            <FontAwesome5
              onPress={selectProfileImage}
              name="camera-retro"
              size={22}
              color={'black'}
              style={{
                backgroundColor: 'white',
                padding: 8,
                borderRadius: 100,
              }}
              solid
            />
          </View>
        </TouchableOpacity>

        <View style={styles.view1}>
          <Text style={styles.name}>{personshow}</Text>
          <View style={styles.flx}>
            <TextInput
              style={{
                fontSize: 18,
                backgroundColor: '#F1F1F1',
                padding: 15,
                borderRadius: 20,
                margin: '2%',
              }}
              onChangeText={text => setpersonname(text)}
              value={personname}
              placeholder="Type your name here"
              placeholderTextColor={'black'}
              underlineColorAndroid="transparent"
            />
            <Pressable>
              <AntDesign
                onPress={nameSetted}
                name="checkcircle"
                size={30}
                color={'blue'}
                style={styles.topicon}
                solid
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.subview}>
          <Text style={styles.subheading}>
            <MaterialIcons
              name="account-circle"
              size={20}
              color={'blue'}
              style={styles.topicon}
              solid
            />{' '}
            My Account
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.txt}>Connect with JeemJam </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subview}>
          <Text style={styles.subheading}>
            <Entypo
              name="colours"
              size={20}
              color={'blue'}
              style={styles.topicon}
              solid
            />{' '}
            General
          </Text>
          <Text style={styles.txt}>Notifications</Text>
        </View>
        <View style={styles.subview}>
          <Text style={styles.subheading}>
            <MaterialIcons
              name="app-settings-alt"
              size={20}
              color={'blue'}
              style={styles.topicon}
              solid
            />{' '}
            JeemJam App
          </Text>
          <Text style={styles.txt} onPress={ShareApp}>
            Share with friends
          </Text>
          <Text style={styles.txt} onPress={() => onPressEmailClick(emailId)}>
            Contact Us
          </Text>
          <Text
            style={styles.txt}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            Privacy Policy
          </Text>
          <Text style={styles.txt}>Version 1.0.0</Text>
          <Text
            style={[styles.txt, {marginBottom: 10}]}
            onPress={() => {
              navigation.navigate('Signin'),
                Alert.alert('Note', 'Logout Successfully');
            }}>
            Logout
          </Text>
        </View>

        <Modal
          transparent={true}
          animationType={'fade'}
          isVisible={modalVisible}
          nRequestClose={() => changeModelVisibility(false)}>
          <PopUpModal changeModelVisibility={changeModelVisibility} />
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF9F6',
    flex: 1,
  },
  view1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  subheading: {
    color: 'blue',
    fontSize: 18,
    marginTop: 10,
  },
  txt: {
    fontSize: 18,
    color: 'black',
    margin: 10,
    paddingHorizontal: 15,
  },
  img: {
    height: 158,
    width: '40%',
    marginHorizontal: '30%',
    marginVertical: '5%',
    borderRadius: 90,
  },
  headview: {
    backgroundColor: '#0000a5',
    height: '8%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '5%',
  },
  subview: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  flx: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
