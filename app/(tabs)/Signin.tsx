import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Signin = () => {
  const [selectedValue, setSelectedValue] = useState('Male');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Trigger form validation when any input field changes
    validateForm();
  }, [name, lastName, country, email, password, phone]);

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!name) {
      errors.name = 'Name is required.';
    }

    // Validate lastName field
    if (!lastName) {
      errors.lastName = 'Last Name is required.';
    }

    // Validate country field
    if (!country) {
      errors.country = 'Country is required.';
    }

    // Validate email field
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    // Validate password field
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    // Validate phone field
    if (!phone) {
      errors.phone = 'Phone number is required.';
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  // Handle form submission
  const handleSignup = async () => {
    const userData = {
      name,
      lastName,
      country,
      email,
      password,
      phone,
      gender: selectedValue === 'Male' ? 'Male' : 'Female',
    };

    try {
      const response = await axios.post('https://your-api-endpoint.com/signup', userData);
      alert('Account Created Successfully');
    } catch (error) {
      alert('Error creating account: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.im}>
        <Image source={require('../../assets/images/sign2.png')} style={styles.img1} />
      </View>
      <View style={styles.signform}>
        <TextInput
          style={styles.inputsp}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          style={styles.inputsp}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

        <TextInput
          style={styles.inputsp}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
        {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}

        <TextInput
          style={styles.inputsp}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={styles.inputsp}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TextInput
          style={styles.inputsp}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <TouchableOpacity
          style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
          onPress={handleSignup}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>You can sign in with</Text>
      <View style={styles.googlegithub}>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Image source={require('../../assets/images/gmail2.png')} style={styles.imgg} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('#')}>
          <Image source={require('../../assets/images/facebook.png')} style={styles.imgg} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.title1}>I don't have an account</Text>
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
    height: 830,
    width: 410,
  },
  im: {
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
  },
  img1: {
    width: 410,
    height: 210,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  signform: {
    marginLeft: 30,
    backgroundColor: '#B7B7B7',
    height: 350,
    width: 350,
    padding: 20,
    borderRadius: 50,
  },
  inputsp: {
    borderWidth: 2,
    borderColor: '#2F2BAA',
    borderRadius: 70,
    width: '100%',
    paddingLeft: 20,
    height: 40,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2F2BAA',
    borderRadius: 30,
    paddingVertical: 10,
    marginLeft: 80,
    alignItems: 'center',
    marginTop: 20,
    width: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googlegithub: {
    marginLeft: 55,
    backgroundColor: '#B7B7B7',
    height: 150,
    width: 300,
    padding: 50,
    borderRadius: 50,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgg: {
    width: 70,
    height: 70,
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F2BAA',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 100,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2F2BAA',
    marginTop: 10,
    marginLeft: 130,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Signin;
