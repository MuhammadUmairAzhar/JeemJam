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
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AllAdsScreen({navigation, route}) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [CurrSubCategory, setCurrSubCategory] = React.useState([]);
  const {uData, name, selCountry} = route.params;

  console.log('test data is', name);

  React.useEffect(() => {
    filterCurrentCategoryData();
    // fetchCurrentCountryData();
    // setTimeout(() => {
    //   filterCurrentCategoryData();
    // }, 2000);
  }, []);

  const fetchCurrentCountryData = () => {
    fetch('https://www.jeemjam.com/api/get-ads-fetching')
      .then(response => response.json())
      .then(json =>
        setData(json.getads.filter(u => u.country == catnaam?.country?.name)),
      )
      .catch(error => console.error(error));
  };

  const filterCurrentCategoryData = () => {
    setCurrSubCategory(
      uData.filter(
        u =>
          u.sub_category == name &&
          u.country == selCountry.name &&
          u.aproval == 'yes',
      ),
    );
    setLoading(false);
  };
  // alert(CurrSubCategory);
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
          Available Ads
        </Text>
        <View style={styles.miniview}>
          <FontAwesome
            name="user-circle-o"
            size={25}
            color={'white'}
            style={styles.topicon}
            solid
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
      <View style={styles.list}>
        {isLoading ? (
          <View
            style={{
              marginHorizontal: '40%',
              marginVertical: '50%',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={35} color="blue" />
            <Text style={styles.middletxt}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={CurrSubCategory}
            keyExtractor={({id}, index) => id}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={fetchCurrentCountryData}
              />
            }
            renderItem={({item, index}) => (
              <View key={index} style={styles.subview}>
                <View style={{padding: 15}}>
                  <View style={styles.listelem}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ShowingInages', {
                          selectedImage: item,
                        })
                      }>
                      <Image style={styles.img} source={{uri: item.img}} />
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.headingtxt}>{item.title}</Text>
                      <Text style={styles.destxt}>{item.country}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DetailsScreen', {
                            selectedItem: item,
                          })
                        }>
                        <Text
                          style={{
                            color: 'blue',
                            fontWeight: '600',
                            fontSize: 16,
                            marginLeft: '1%',
                          }}>
                          More Show{' '}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
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
    backgroundColor: 'white',
    width: '100%',
    height: '30%',
    borderRadius: 8,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
    padding: 10,
    elevation: 5,
    flex: 1,
    flexDirection: 'row',
  },
  img: {
    height: 100,
    width: 100,
    marginLeft: '5%',
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  imgx: {
    height: '80%',
    width: 70,
    marginLeft: '2%',
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  picview: {
    flexDirection: 'row',
    padding: 10,
  },
  topimg: {
    height: 30,
    width: 50,
    marginLeft: '5%',
  },
  headingtxt: {
    fontSize: 18,
    margin: '1%',
    color: 'black',
    fontWeight: '800',
    width: 200,
  },
  destxt: {
    fontSize: 10,
    marginLeft: '1%',
    color: 'black',
    width: 200,
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
    marginTop: '5%',
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
  list: {
    marginBottom: '20%',
  },
});
