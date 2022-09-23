import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Mobiles} from '../Data/Mobile-Data';

export default function Mobile({navigation, route}) {
  const [SelectedCountry1, setSelectedCountry] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [filteredDataSource, setFilteredDataSource] = React.useState([]);
  const [masterDataSource, setMasterDataSource] = React.useState([]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    setFilteredDataSource(Mobiles);
    setMasterDataSource(Mobiles);
  }, []);
  let {SelectedCountry, adsData} = route.params;

  // console.log('user test is mobile data', mobileData);

  React.useEffect(() => {
    setSelectedCountry(SelectedCountry);

    console.log('select country is ', SelectedCountry);
    // let currentCountry = route.params;
    // console.log('hAuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',currentCountry)
    // setSelectedCountry(currentCountry)
  }, []);

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
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const CountryImg = SelectedCountry;

  // React.useEffect(() => {
  //   fetchCurrentCountryData();
  //   setTimeout(() => {
  //     // filterCurrentCategoryData();
  //   }, 2000);
  // }, []);

  // const fetchCurrentCountryData = () => {
  //   fetch('https://www.jeemjam.com/api/get-ads-fetching')
  //     .then(response => response.json())
  //     .then(json => setData(json.getads.filter(u => u.sub_category == 'Honda')))
  //     .catch(error => console.error(error));
  // };

  // console.log('mobile furniture data is===========>', data.length);
  // const filterCurrentCategoryData = () => {
  //   // setCurrSubCategory(data.filter(u => u.sub_category == catnaam?.name));
  //   setLoading(false);
  // };
  // console.log('mobile datais', mobileData);

  // mobileData.filter(u => {
  //   if (u.country == 'UAE' && u.category == 'Mobile') {
  //     console.log('country data is =============>', u.category.length);
  //   }
  // });

  // console.log(
  //   'car data=======================+>',
  //   mobileData.filter(u => u.sub_category == 'Nokia' && u.country == 'UAE')
  //     .length,
  // );

  return (
    <View style={styles.container}>
      <View style={styles.headview}>
        <Text style={styles.heading}>
          <FontAwesome5
            onPress={() => navigation.goBack()}
            name="arrow-left"
            size={18}
            color={'white'}
            style={styles.topicon}
            solid
          />{' '}
          Mobiles
        </Text>
        <View style={styles.miniview}>
          <Ionicons
            name="settings"
            size={25}
            color={'white'}
            style={styles.topicon}
            solid
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
      <ScrollView style={styles.list}>
        <View style={styles.SectionStyle}>
          <Image
            source={require('../../../assets/Images/oop.png')}
            style={styles.ImageStyle}
          />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            placeholder="Search"
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.subview}>
          {filteredDataSource.map((item, index) => {
            // let text = '';
            let obj = {
              name: item.name,
              country: SelectedCountry1,
            };
            // {
            //   mobileData.map((val, index) => {
            //     if (val.name == item.name) {
            //       text = val.name.length;
            //       // setData(val.name.length);
            //       console.log(val.name.length);
            //     }
            //   });
            // }
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('AllAdsScreen', {
                    uData: adsData,
                    name: item.name,
                    selCountry: SelectedCountry1,
                  })
                }>
                <View style={styles.listelem}>
                  <Image style={styles.img} source={item.img} />
                  <Text style={styles.listtxt}>{item.name}</Text>
                </View>
                <View style={styles.icon}>
                  {/* {mobileData.filter((u => u.category == item.name)=>{
  <Text></Text>
                  })}
                 */}
                  {/* {mobileData.filter(u => {
                    u.category == item.name ? (
                      <Text>{u.category.length}</Text>
                    ) : (
                      <Text>0</Text>
                    );
                  })} */}
                  {/* {mobileData.map(val => {
                    return val.sub_category == item.name ? (
                      <Text>{val.sub_category.length}</Text>
                    ) : (
                      <Text>{''}</Text>
                    );

                    // <div className="user">{user}</div>
                  })} */}
                  <Text>
                    {
                      adsData.filter(
                        u =>
                          u.sub_category == item.name &&
                          u.country == SelectedCountry1.name &&
                          u.aproval == 'yes',
                      ).length
                    }
                  </Text>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={25}
                    color={'black'}
                    solid
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Countries')}>
          <View style={[styles.listelem, {marginTop: '10%'}]}>
            <Image style={styles.img} source={CountryImg?.img} />
            <Text style={styles.listtxtx}>{CountryImg?.name}</Text>
          </View>
          <View style={styles.icon}>
            <MaterialIcons
              name="location-pin"
              size={25}
              color={'black'}
              solid
              style={{marginLeft: '5%'}}
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
  },
  ImageStyle: {
    padding: 10,
    margin: 20,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  listelem: {
    backgroundColor: '#F0F0F0',
    width: '100%',
    height: 70,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
  },
  img: {
    height: 40,
    width: 60,
    marginLeft: '2%',
    resizeMode: 'stretch',
    alignItems: 'center',
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
  },
  miniview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    position: 'relative',
    left: 310,
    bottom: '12%',
    flexDirection: 'row',
  },
  topicon: {
    margin: '1%',
  },
  heading: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: '3%',
  },

  subview: {
    marginTop: '10%',
  },
  pay: {
    backgroundColor: '#D4F1F4',
    width: '40%',
    height: 100,
    borderRadius: 20,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
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
});
