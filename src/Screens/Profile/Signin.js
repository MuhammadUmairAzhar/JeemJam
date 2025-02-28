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
  Button,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {loginuser} from '../../Apis/Api';
import {Loading} from '../Components/Loader';
// import {
//   LoginButton,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk';
import {
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin({navigation}) {
  const [phoneno, setphoneno] = React.useState();
  const [password, setpassword] = React.useState();
  const [loading, setloading] = React.useState(false);
  const [msg, setmsg] = React.useState('');

  const [User, setUser] = React.useState(null);

  const Login = async () => {
    if (!phoneno) {
      alert('Enter your phoneno');
    } else if (!password) {
      alert('Enter your password');
    } else {
      setloading(true);
      setmsg('');
      let data = {};

      data['username'] = phoneno;
      data['password'] = password;
      try {
        const res = await loginuser(data);
        console.log(res);
        if (res.data.status == true) {
          navigation.navigate('PostAd');
          setloading(false);
        } else {
          setmsg(res.data.message);
          setloading(false);
        }
      } catch (error) {
        setloading(false);
      }
    }
  };

  //   getInfoFromToken = token => {
  //     alert('test');
  //     const PROFILE_REQUEST_PARAMS = {
  //       fields: {
  //         string: 'id, name,  first_name, last_name',
  //       },
  //     };
  //     const profileRequest = new GraphRequest(
  //       '/me',
  //       {token, parameters: PROFILE_REQUEST_PARAMS},
  //       (error, result) => {
  //         if (error) {
  //           console.log('login info has error: ' + error);
  //         } else {
  //           this.setState({userInfo: result});
  //           console.log('result:', result);
  //         }
  //       },
  //     );
  //     new GraphRequestManager().addRequest(profileRequest).start();
  //   };
  const handleLoginFacebook = async () => {
    LoginManager.setLoginBehavior('web_only');
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          Profile.getCurrentProfile().then(currentProfile => {
            // alert('test');

            if (currentProfile) {
              storeData(currentProfile.name);
              setUser(currentProfile);

              navigation.navigate('PostAd');
            }
            // console.log(currentProfile);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
    // // alert('test');
    // LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    //   result => {
    //     if (result.isCancelled) {
    //     } else {
    //       Profile.getCurrentProfile().then(currentProfile => {
    //         alert('test');
    //         if (currentProfile) console.log(currentProfile);
    //       });
    //       AccessToken.getCurrentAccessToken().then(data => {
    //         console.log(data.accessToken.toString());
    //       });
    //     }
    //   },
    // );
  };

  console.log('user data of fblogin', User);
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@auth', value);
    } catch (e) {}
  };
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
          Sign In
        </Text>
      </View>
      <View style={styles.View1}>
        <TextInput
          style={styles.input}
          onChangeText={setphoneno}
          value={phoneno}
          keyboardType="numeric"
          placeholder="ENTER YOUR PHONE NUMBER."
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input}
          onChangeText={setpassword}
          value={password}
          placeholder="ENTER PASSWORD"
          placeholderTextColor={'black'}
        />
        <Text style={{marginLeft: 20, color: 'red'}}>{msg}</Text>

        <TouchableOpacity style={styles.login} onPress={Login}>
          <Text style={styles.logintxt}>Login</Text>
        </TouchableOpacity>
      </View>
      <Loading visible={loading} />
      <View style={styles.View2}>
        <Text
          style={styles.signup}
          onPress={() => navigation.navigate('Signup')}>
          Dont have an account ?{' '}
          <Text style={{color: 'red', fontWeight: 'bold'}}>Signup here</Text>
        </Text>
        <Text style={styles.or}>O R</Text>

        {/* <------------------------------------- LOGIN WITH GOOGLE -------------------------------------------------------------------> */}

        {/* <TouchableOpacity style={styles.google} >
                    <Text style={styles.btntxt}>continue with</Text>
                    <Image source={require('../../../assets/Images/google.png')} style={styles.img} />
                </TouchableOpacity> */}

        {/* <Button
          title={'continue with google'}
          onPress={() => {
            GoogleSignin.configure({
              androidClientId:
                '239254217574-0r0uak478g98jk0lm5d1rdkmcv839pj8.apps.googleusercontent.com',
              iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
            });
            GoogleSignin.hasPlayServices()
              .then(hasPlayService => {
                if (hasPlayService) {
                  GoogleSignin.signIn()
                    .then(userInfo => {
                      let Customer = JSON.stringify(userInfo.user);
                      var data = JSON.parse(Customer);
                      let {idToken} = Customer;
                      console.log('customer data is======');
                      setUser(Customer);
                      storeData(data.name);
                      navigation.navigate('PostAd');
                    })
                    .catch(e => {
                      console.log('ERROR IS: ' + JSON.stringify(e));
                      alert('ERROR IS: ' + JSON.stringify(e));
                    });
                }
              })
              .catch(e => {
                console.log('ERROR IS: ' + JSON.stringify(e));
                alert('something went wrong', e.message);
              });
          }}
        /> */}

        <View
          style={{
            margin: '2%',
            width: '45%',
            backgroundColor: '#0892d0',
            height: '12%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            elevation: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              GoogleSignin.configure({
                androidClientId:
                  '239254217574-0r0uak478g98jk0lm5d1rdkmcv839pj8.apps.googleusercontent.com',
                iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
              });
              GoogleSignin.hasPlayServices()
                .then(hasPlayService => {
                  if (hasPlayService) {
                    GoogleSignin.signIn()
                      .then(userInfo => {
                        let Customer = JSON.stringify(userInfo.user);
                        var data = JSON.parse(Customer);
                        let {idToken} = Customer;
                        console.log('customer data is======');
                        setUser(Customer);
                        storeData(data.name);
                        navigation.navigate('PostAd');
                      })
                      .catch(e => {
                        console.log('ERROR IS: ' + JSON.stringify(e));
                      });
                  }
                })
                .catch(e => {
                  console.log('ERROR IS: ' + JSON.stringify(e));
                });
            }}>
            <Text style={{color: 'white'}}>CONTINUE WITH GOOGLE</Text>
          </TouchableOpacity>
        </View>

        {/* <------------------------------------- LOGIN WITH FACEBOOK -------------------------------------------------------------------> */}
        <View
          style={{
            margin: '2%',
            width: '45%',
            backgroundColor: '#4267B2',
            height: '12%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            elevation: 1,
          }}>
          <TouchableOpacity onPress={() => handleLoginFacebook()}>
            <Text style={{color: 'white'}}>LOGIN WITH FACEBOOK</Text>
          </TouchableOpacity>
          {/* <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  console.log(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          /> */}
          <View>
            {/* <LoginButton
              onLoginFinished={(error, result) => {
                alert('test');
                console.log(result);
                console.log(result);
                if (error) {
                  alert('login has error: ' + result);
                } else if (result.isCancelled) {
                  alert('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    let accessToken = data.accessToken;
                    alert(accessToken.toString());

                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        console.log(error);
                        alert('Error fetching data: ' + error.toString());
                      } else {
                        console.log(result);
                        alert('Success fetching data: ' + result.toString());
                      }
                    };

                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        accessToken: accessToken,
                        parameters: {
                          fields: {
                            string:
                              'email,name,first_name,middle_name,last_name',
                          },
                        },
                      },
                      responseInfoCallback,
                    );

                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start();
                  });
                }
              }}
              onLogoutFinished={() => alert('logout.')}
            /> */}

            {/* <Text style={styles.btntxt}>continue with</Text>
            <Image
              source={require('../../../assets/Images/fb.png')}
              style={styles.img}
            /> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF9F6',
    flex: 1,
  },
  View1: {
    padding: 20,
    marginTop: '15%',
    marginBottom: '10%',
  },
  input: {
    width: '90%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: '5%',
    color: '#000',
  },
  login: {
    backgroundColor: 'blue',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '50%',
    marginTop: '8%',
    borderRadius: 10,
  },
  logintxt: {
    padding: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signup: {
    fontSize: 15,
    color: 'black',
  },
  btntxt: {
    color: 'black',
    fontSize: 17,
  },
  or: {
    fontSize: 18,
    color: 'black',
    margin: '2%',
  },
  View2: {
    alignItems: 'center',
  },
  google: {
    backgroundColor: '#eee',
    width: '70%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2%',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
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
    height: 39,
    width: 40,
    marginLeft: '5%',
    borderRadius: 70,
  },
  topimg: {
    height: 30,
    width: 50,
    marginLeft: '5%',
  },
  listtxt: {
    fontSize: 18,
    marginLeft: '5%',
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
    left: '87%',
    bottom: '50%',
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
