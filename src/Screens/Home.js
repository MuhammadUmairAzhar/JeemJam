import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {ServicesData} from './Data/Services-Data';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home({navigation, route}) {
  const [isLoading, setLoading] = React.useState(true);
  const [SelectedCountry, setSelectedCountry] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState([]);
  console.log('Umair data', filteredDataSource);
  const [masterDataSource, setMasterDataSource] = React.useState([]);
  const [currentCountry, setcurrentCountry] = React.useState([]);
  const [authName, setAuthName] = React.useState();
  // const [mobileData, setMobileData] = React.useState([]);
  // const [carData, setCarData] = React.useState([]);
  const [jobsData, setJobsData] = React.useState([]);
  // const [serviceData, setServiceData] = React.useState([]);
  const [data, setData] = React.useState([]);
  console.log('Uamir Umair', data.length);

  React.useEffect(() => {
    let {SelectedCountry} = route.params;
    console.log('For the Image', SelectedCountry);
    setSelectedCountry(SelectedCountry);
    storeData(SelectedCountry?.name);
    console.log('selected country', SelectedCountry?.name);
  }, []);
  React.useEffect(() => {
    setFilteredDataSource(options);
    setMasterDataSource(options);
    // saveData();
  }, []);

  React.useEffect(() => {
    fetch('https://www.jeemjam.com/api/get-ads-fetching')
      .then(response => response.json())
      .then(
        json =>
          setcurrentCountry(
            json?.getads.filter(u => u.country == SelectedCountry?.name),
          ),
        // console.log('test===================/=======>>>>', json.getads)
      )
      .catch(error => console.error(error));
    setLoading(false);
  }, []);

  //Function for search bar filtering categories
  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const CountryImg = SelectedCountry;

  const options = [
    {
      id: 1,
      name: 'mobile',
      img: require('../../assets/Images/mob.png'),
      nextlocation: 'Mobile',
    },
    {
      id: 2,
      name: 'cars',
      img: require('../../assets/Images/tyty.png'),
      nextlocation: 'Cars',
    },
    {
      id: 3,
      name: 'jobs',
      img: require('../../assets/Images/job.png'),
      nextlocation: 'Jobs',
    },
    {
      id: 4,
      name: 'service',
      img: require('../../assets/Images/servicess.png'),
      nextlocation: 'Services',
    },
    {
      id: 5,
      name: 'miscallenious',
      img: require('../../assets/Images/misc.jpg'),
      nextlocation: 'Miscellaneous',
    },
  ];

  React.useEffect(() => {
    getData();
    fetchCurrentCountryData();
  }, []);

  const fetchCurrentCountryData = async () => {
    // fetch('https://www.jeemjam.com/api/get-ads-fetching')
    //   .then(response => response.json())
    //   .then(json => )
    //   .catch(error => console.error(error));

    try {
      const response = await fetch(
        `https://www.jeemjam.com/api/get-ads-fetching`,
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const json = await response.json();
      setData(json.getads);
      // setMobileData(
      //   json.getads.filter(u => u.category == 'mobile' && u.country == 'UAE')
      //     .length,
      // );
      // setCarData(
      //   json.getads.filter(u => u.category == 'cars' && u.country == 'UAE'),
      // );
      setJobsData(
        json.getads.filter(
          u => u.category == 'jobs' && u.country == 'UAE' && u.aproval == 'yes',
        ).length,
      );
      // setServiceData(
      //   json.getads.filter(u => u.category == 'service' && u.country == 'UAE')
      //     .length,
      // );
      // setMobileData(json.getads.filter(u => u.sub_category == 'bmw'));
      // setData(json);
    } catch (err) {
      console.log('error', err);
    }
  };
  // console.log('mobile category data is=========================>>>', jobsData);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@auth');
      setAuthName(value);
      // alert(value);
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async value => {
    // alert(value);
    try {
      await AsyncStorage.setItem('@country', value);
    } catch (e) {
      // saving error
    }
  };
  React.useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headview}>
        <FontAwesome5
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={18}
          color={'white'}
          style={styles.topicon}
          solid
        />
        <Text style={styles.heading}>Jeem Jam</Text>
        <View style={styles.miniview}>
          <Ionicons
            name="settings"
            size={25}
            color={'white'}
            style={styles.topicon}
            solid
            onPress={() => navigation.navigate('Profile')}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Countries')}>
            {CountryImg?.img ? (
              <Image source={CountryImg?.img} style={styles.topimg} />
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.list}>
        <View style={styles.SectionStyle}>
          <Image
            source={require('../../assets/Images/oop.png')}
            style={styles.ImageStyle}
          />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            placeholder="Search"
            placeholderTextColor="black"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.middleheader}>
          <View style={styles.pay}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(authName ? 'PostAd' : 'Signin');
              }}>
              <Image
                source={require('../../assets/Images/ad.png')}
                style={styles.img}
              />
            </TouchableOpacity>
            <Text style={styles.middletxt}>Place your ad for free</Text>
          </View>
          <View style={styles.pay}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AccountBalance')}>
              <Image
                source={require('../../assets/Images/wwqs.png')}
                style={styles.img}
              />
            </TouchableOpacity>
            <Text style={styles.middletxt}>Account balance</Text>
          </View>
        </View>
        {isLoading ? (
          <View style={{marginHorizontal: '40%', marginVertical: '20%'}}>
            <ActivityIndicator size={30} color={'blue'} />
            <Text style={{fontSize: 18}}> Loading...</Text>
          </View>
        ) : (
          <View style={styles.subview}>
            {filteredDataSource.map((item, index) => {
              let text = '';
              if (item.name == 'Mobiles') {
                text = mobileData.length;
              }
              console.log();

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate(item.nextlocation, {
                      SelectedCountry: SelectedCountry,
                      adsData: data,
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      alignSelf: 'center',
                      marginTop: 5,
                    }}>
                    <View style={styles.listelem}>
                      <Image style={styles.img} source={item.img} />
                      <Text style={styles.listtxt}>{item.name}</Text>
                    </View>
                    <View style={styles.icon}>
                      <Text
                        style={{
                          color: 'grey',
                        }}>
                        {data == '' ? (
                          <ActivityIndicator size={'small'} />
                        ) : (
                          data.filter(
                            u =>
                              u.category == item.name &&
                              u.country == SelectedCountry?.name &&
                              u.aproval == 'yes',
                          ).length
                        )}
                      </Text>
                      <MaterialIcons
                        name="arrow-forward-ios"
                        size={25}
                        color={'black'}
                        solid
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Countries')}>
          <View style={[styles.listelem, {marginTop: '8%'}]}>
            {CountryImg?.img ? (
              <Image style={styles.img} source={CountryImg?.img} />
            ) : null}

            <Text style={styles.listtxtx}>{CountryImg?.name}</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 35,
            }}>
            <MaterialIcons
              name="location-pin"
              size={40}
              color={'black'}
              solid
              style={{marginRight: 4}}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF9F6',
    flex: 1,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    height: 60,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 3,
  },
  ImageStyle: {
    padding: 10,
    margin: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  listelem: {
    backgroundColor: '#F0F0F0',
    width: '100%',
    alignSelf: 'center',
    height: 70,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  img: {
    height: 55,
    width: 58,
    marginLeft: '2%',
    borderRadius: 70,
    resizeMode: 'stretch',
  },
  topimg: {
    height: 30,
    width: 50,
    marginLeft: '5%',
  },
  listtxt: {
    fontSize: 18,
    marginLeft: '1%',
    color: 'black',
  },
  listtxtx: {
    fontSize: 18,
    marginLeft: '4%',
    color: 'black',
  },
  headview: {
    backgroundColor: '#0000a5',
    height: '8%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miniview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  },
  topicon: {
    margin: '1%',
  },
  heading: {
    fontSize: 20,
    color: 'white',
    marginLeft: '5%',
  },

  subview: {
    marginTop: '5%',
  },
  pay: {
    backgroundColor: '#D4F1F4',
    width: '40%',
    height: 110,
    borderRadius: 20,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    padding: 20,
  },
  middleheader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  middletxt: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  pop: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: '13%',
  },
  logo: {
    width: 130,
    height: 30,
    padding: 5,
  },
  logoview: {
    backgroundColor: 'white',
    height: 40,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
