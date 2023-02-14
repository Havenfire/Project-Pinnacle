import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

//web: 268143036566-tlvqs00cmhj991u6ih4rimec8qcspus8.apps.googleusercontent.com
//ios: 268143036566-ds66ps82mm60r001s4s7mfcin4vtbj6g.apps.googleusercontent.com
//android: 268143036566-t085g15qe1qbm35fo6m3ct2j9iggjd07.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "268143036566-tlvqs00cmhj991u6ih4rimec8qcspus8.apps.googleusercontent.com",
    iosClientId: "268143036566-ds66ps82mm60r001s4s7mfcin4vtbj6g.apps.googleusercontent.com",
    androidClientId: "268143036566-t085g15qe1qbm35fo6m3ct2j9iggjd07.apps.googleusercontent.com",
    scopes: ['profile', 'email'],    
  });

  React.useEffect(() => {
    if(response?.type === "success"){

      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken])

  async function fetchUserInfo(){
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const useInfo = await response.json();
    setUser(useInfo);
  }



  const ShowUserInfo = () => {
    console.log(user)
    if(user) {
      return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 35, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text>
          <Image source={{uri: user.picture}} style={{width: 100, height: 100, borderRadius: 50}} />
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.email}</Text>

        </View>
      )
    }
  }  

  return (
    <View style={styles.container}>
      {user && <ShowUserInfo />}
      {user === null &&
          <>
          <Text style={{fontSize: 35, fontWeight: 'bold'}}>Project Pinnacle</Text>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'gray'}}>Please login</Text>
        <TouchableOpacity
          disabled={!request}
          onPress={() => {
            promptAsync();
            }} 
        >
          <Image source={require("./btn.png")} style={{width: 300, height: 40}} />
        </TouchableOpacity>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});