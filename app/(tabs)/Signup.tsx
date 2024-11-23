
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';



const Signup = () => {
  const [selectedValue, setSelectedValue] = useState('Male');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [Mark, setMark] = useState('');
  const [Serie, setSerie] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState(''); // State to store the image name
  const navigation = useNavigation();

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access the media library is required!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImageUri(result.assets[0].uri); // Set the selected image URI
      setImageName(result.assets[0].fileName); // Set the image file name
    }
  };

  

  //finction d'ajout
  const handleSignup = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('lastName', lastName);
    formData.append('country', country);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('gender', selectedValue);
    formData.append('Mark', Mark);
    formData.append('Serie', Serie);
  
    // Append the image file
    if (imageUri) {
      formData.append('imageUri', {
        uri: imageUri, // Image URI from image picker
        type: 'image/jpeg', // MIME type
        name: imageName,
      });
    }
  
    try {
       // Debugging: Log the FormData contents
    console.log('FormData contents:');
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
      const response = await axios.post(
        'https://your-api-endpoint.com/signup', // Replace with your API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Account Created Successfully');
      console.log(response.data); // Log the response for debugging
    } catch (error) {
     // console.log(formData.values);
      console.error('Error:', error);
      alert('Error creating account: ' + error.message);
    }
  };
  
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.im}>
        <Image source={require('../../assets/images/sign2.png')} style={styles.img1} />
      </View>
      <View style={styles.signform}>
        <TextInput style={styles.inputsp} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.inputsp} placeholder="LastName"  value={lastName} onChangeText={setLastName}/>
        <TextInput style={styles.inputsp} placeholder="Country"  value={country} onChangeText={setCountry}/>
        <TextInput style={styles.inputsp} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.inputsp} placeholder="Password"  value={password} onChangeText={setPassword} />

        <View style={styles.numtlf}>
          <TextInput style={styles.input216} placeholder="Enter your text" defaultValue='+216' />
          <TextInput style={styles.inputnum} placeholder="Phone number" value={phone} onChangeText={setPhone} />
        </View>

        <View style={styles.radioGroup}>
          <View style={styles.radioButton}>
            <RadioButton.Android
              value="Male"
              status={selectedValue === 'Male' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('Male')}
              color="#007BFF"
            />
            <Text style={styles.radioLabel}>Male</Text>
          </View>

          <View style={styles.radioButton}>
            <RadioButton.Android
              value="Female"
              status={selectedValue === 'Female' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedValue('Female')}
              color="#007BFF"
            />
            <Text style={styles.radioLabel}>Female</Text>
          </View>

          
        </View>
        
        <View style={styles.numtlf}>
          <TextInput style={styles.input216} placeholder="Mark" value={Mark} onChangeText={setMark}/>
          <TextInput style={styles.inputnum} placeholder="Serie" value={Serie} onChangeText={setSerie} />
        </View>
        <View style={styles.numtlf}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
          <Text style={styles.uploadText}>Upload Image</Text>
         

        </TouchableOpacity>
        {imageName && <Text style={styles.fileNameText}>{imageName}</Text>}
        {/* {imageUri && (<Image source={{ uri: imageUri }} style={styles.previewImage} />)} */}
        
        </View>
        

        {/* Replace the HTML <button> with a TouchableOpacity */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity  onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.title1}>I have an account</Text>
        </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>LET'S GO © 2024 All Right Reserved</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#CACACA',
    height: 835,
    width:410,
  },
  im: {
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
   
   
  },
  img1: {
    width: 410,
    height: 180,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 2,
    borderRadius: 50,
    padding: 2,
    borderWidth: 2,
    borderColor: '#2F2BAA',
    marginBottom:10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  signform: {
    marginLeft:30,
    backgroundColor:'#B7B7B7', 
    height :560,
    width : 350,
    padding:20,
    borderRadius:50,
   
  },
  inputsp: {
    
    borderWidth: 2,
    borderColor: '#2F2BAA',
    borderRadius: 70,
    width: '100%',
    paddingLeft: 20,
    height: 40,
    marginBottom: 10,
    
  },
  numtlf: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input216: {
    borderWidth: 2,
    borderColor: '#2F2BAA',
    borderRadius: 70,
    width: '25%',
    paddingLeft: 10,
    height: 40,
    marginBottom: 10,
  },
  inputnum: {
    borderWidth: 2,
    marginBottom: 10,
    borderColor: '#2F2BAA',
    borderRadius: 70,
    width: '70%',
    paddingLeft: 10,
    height: 40,
  },
  button: {
    backgroundColor: '#2F2BAA',
    borderRadius: 30,
    paddingVertical: 10,
    marginLeft:80,
    alignItems: 'center',
    marginTop: 20,
    width:150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googlegithub:{
    marginLeft:80,
    backgroundColor:'#B7B7B7', 
    height :120,
    width : 250,
    padding:20,
    borderRadius:50,
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  imgg:{
width:70,
height:70,


  },
  title1:{
    fontSize:20,
    fontWeight:'bold',
    color:'#2F2BAA',
    marginTop:7,
   
    marginLeft:120,
    
  },
  title:{
    fontSize:15,
    fontWeight:'bold',
    color:'#2F2BAA',
    marginTop:10,
    marginLeft:130,
    
  },
  footer: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: '#000',
  },
  uploadButton: {
    backgroundColor: '#2F2BAA',
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '40%',
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 60,
    height: 30,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  fileNameText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});
export default Signup;