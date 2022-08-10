import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'



export default function MyAds({ navigation }) {

    //We have to bring logged-in user name here to fetch his ads from databse directory

    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    console.log('AHAAAAAAAAAAAAAAAAllll ADSs Dataaa ================>>>>>>', data)
    React.useEffect(() => {
        fetch(`https://www.jeemjam.com/api/show-ads/user/${author}`)
            .then((response) => response.json())
            .then((json) => setData(json.showAds))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);


    const delPost =(id)=>{

        fetch(`https://www.jeemjam.com/api/deletePost/${id}`,
         { method: 'DELETE' })
        .then((res) => {
        console.log(JSON.stringify(res))
        alert('Post Deleted succesfully')})
        .catch(error => {
            setErrorMessage(error);
            console.error('There was an error!', error);
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.headview}>
                <Text style={styles.heading}><FontAwesome5 onPress={() => navigation.goBack()} name='arrow-left' size={18} color={'white'} style={styles.topicon} solid />  My Ads</Text>
                <View style={styles.miniview}>
                    <FontAwesome name='user-circle-o' size={25} color={'white'} style={styles.topicon} solid onPress={() => navigation.navigate('Profile')} />
                </View>
            </View>

            <View style={styles.list}>
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item, index }) => (
                        <View key={index} style={styles.listelem}>
                            <ScrollView>
                                <View style={{ flexDirection: 'row', marginHorizontal: '12%' }}>
                                    <Image source={{ uri: item.img }} style={styles.img} />
                                    <Image source={{ uri: item.img2 }} style={styles.img} />
                                </View>
                                <View style={{ flexDirection: 'row', marginHorizontal: '12%' }}>
                                    <Image source={{ uri: item.img3 }} style={styles.img} />
                                    <Image source={{ uri: item.img4 }} style={styles.img} />
                                </View>
                                <View style={{ flexDirection: 'row', marginHorizontal: '30%' }}>
                                    <Image source={{ uri: item.img5 }} style={styles.img} />
                                </View>



                                <Text style={styles.listtxt}>Title  :  {item.title} </Text>
                                <Text style={styles.listtxt}>Author    :  {item.author}</Text>
                                <Text style={styles.listtxt}>Country  :  {item.country} </Text>
                                <Text style={styles.listtxt}>Category  :  {item.category} </Text>
                                <Text style={styles.listtxt}>Sub-category  :  {item.sub_category} </Text>
                                <Text style={styles.listtxt}>Phone#  :  {item.phone}</Text>
                                <Text style={styles.listtxt}>Whatsapp  :  {item.whatsapp}</Text>
                                <Text style={styles.listtxt}>Content :  {item.content} </Text>

                            </ScrollView>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginLeft: '10%' }}>
                                {item.aproval == 'yes' ?
                                    <Text style={{ marginRight: '10%', fontSize: 15, fontWeight: 'bold', marginVertical: '2%', color: 'green' }}>Approved</Text>
                                    :
                                    <Text style={{ marginRight: '10%', fontSize: 15, fontWeight: 'bold', marginVertical: '2%', color: 'red' }}>Not Approved</Text>
                                }

                                <FontAwesome name='edit' size={30} color={'#0000a5'} onPress={() => navigation.navigate('EditAd', item)} solid />
                                <FontAwesome name='trash' size={30} color={'#0000a5'} solid onPress={delPost} />
                            </View>
                        </View>
                    )}

                />



            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAF9F6',
        flex: 1,

    },
    listelem: {
        backgroundColor: '#F0F0F0',
        width: '80%',
        height: 690,
        borderRadius: 8,
        justifyContent: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginVertical: '20%',
        marginHorizontal: '10%',
        elevation: 15,
        padding: 20
    },
    amount: {
        fontSize: 18,
        marginLeft: '4%',
        color: 'green'
    },
    img: {
        width: 90,
        height: 90,
        marginHorizontal: '3%',
        marginBottom: '5%'
    },
    empty: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: '40%',
        color: 'black',

    },
    listtxt: {
        fontSize: 15,
        marginLeft: '4%',
        marginTop: '3%',
        color: 'black'
    },
    headview: {
        backgroundColor: '#0000a5',
        height: '8%',
        padding: 10,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    miniview: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    icon: {
        position: 'relative',
        left: '85%',
        bottom: '50%'
    },
    topicon: {
        margin: '1%'
    },
    heading: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: '5%'
    },
});