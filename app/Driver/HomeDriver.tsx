import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useState, useEffect } from 'react';
import React from 'react';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DropdownOption {
  value: string;
  label: string;
  image: any; // For images, use 'require' or imported files.
}

const HomeDriver = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const router = useRouter();
  const [rides, setRides] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRides, setFilteredRides] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const userid = AsyncStorage.getItem('userId');  // Await to get rideId

  const options :DropdownOption[] = [
    { value: 'HomeDriver', label: 'Home', image: require('../../assets/images/home.png') },
   /*  { value: 'Profile', label: 'Profile', image: require('../../assets/images/user.png') }, */
    { value: 'AddRide', label: 'Add new Ride', image: require('../../assets/images/addride.png') },
    { value: 'AllRide', label: 'Find a ride', image: require('../../assets/images/searchride.png') },
    { value: 'Actualities', label: 'About us', image: require('../../assets/images/about.png') },
  ];

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);  // Toggle the dropdown visibility
  };

  const handleDropdownChange = (item: DropdownOption) => {
    setSelectedValue(item.value);
    setIsDropdownOpen(false);  // Close the dropdown after selection
  
    // Define valid paths
    const validPaths = ['/Driver/HomeDriver', '/Driver/AddRide','/Driver/AllRide', '/Driver/Actualities'];
  
    // Dynamically create the path
    const selectedPath = `/Driver/${item.value}`;
  
    // Check if the path is valid before navigating
    if (validPaths.includes(selectedPath)) {
      router.push(selectedPath);
    } else {
      console.error('Invalid path', selectedPath);
    }
  };


  useEffect(() => {
    
    axios.get('http://192.168.1.7:5000/ride/rides')
      .then((response) => {
        console.log(userid);
        const formattedData = response.data.map(ride => {
          const date = new Date(ride.timeDate);
          const formattedDate = date.toISOString().slice(0, 16).replace('T', ' '); // 'YYYY-MM-DD HH:MM'
          
          return {
            ...ride,
            timeDate: formattedDate
          };
        });
  
        console.log(formattedData);  // Log to check the transformed data
        setRides(formattedData);
        setFilteredRides(formattedData);
      })
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    if (searchQuery) {
      setFilteredRides(
        rides.filter((ride) =>
          ride.destination.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredRides(rides);
    }
    setCurrentPage(1);
  }, [searchQuery, rides]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRides.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <SafeAreaView>
      <View style={styles.navbarhome}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

        <TouchableOpacity onPress={handleDropdownToggle} style={styles.dropdownButton}>
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </TouchableOpacity>

        {isDropdownOpen && (
          <View style={styles.dropdownList}>
            {options.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => handleDropdownChange(item)}
                style={styles.dropdownItem}
              >
                <Image source={item.image} style={styles.dropdownImage} />
                <Text style={styles.dropdownLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.mapview}>
        <Image source={require('../../assets/images/map.png')} style={styles.map} />
      </View>

      <View style={styles.tabride}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for ride"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>Rides</DataTable.Title>
            <DataTable.Title>Time</DataTable.Title>
            <DataTable.Title>Price</DataTable.Title>
        {/*     <DataTable.Title>Available</DataTable.Title> */}
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>
          {currentItems.map((ride, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                {ride.currentLocation} - {ride.destination}
              </DataTable.Cell>
              <DataTable.Cell>{ride.timaDate}</DataTable.Cell>
              <DataTable.Cell>{ride.price}</DataTable.Cell>
            {/*   <DataTable.Cell>{ride.available}</DataTable.Cell> */}
              <DataTable.Cell>
                <TouchableOpacity onPress={() => router.push(`/PassengerOrderride/${ride._id}`)}>
                  <Image source={require('../../assets/images/order.png')} style={styles.imgg} />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>

        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={styles.pageButton}
          >
            <Text style={styles.pageText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageText}>
            Page {currentPage} of {Math.ceil(filteredRides.length / itemsPerPage)}
          </Text>
          <TouchableOpacity
            onPress={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredRides.length}
            style={styles.pageButton}
          >
            <Text style={styles.pageText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeDriver;

const styles = StyleSheet.create({
  // Your styles remain unchanged


  body:{
    marginTop: 0,
      flex: 1,
      backgroundColor: '#6270BA',
      zIndex: 10,
  },
  navbarhome:{
    backgroundColor: 'white',
      padding: 5,
      flexDirection: 'row',
      alignItems: 'center'
  },
  search:{
    width:100,
    marginTop:15,
    marginLeft:200,
  },
  tabride:{},
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  mapview:{
    marginTop:5,
    
  },
  map:{
    height:200,
    width:410,
  },
  pub:{},
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
  },
  dropdownButton: {
  marginLeft:270,
  },
  dropdownList: {
    position: 'absolute', // Absolute positioning
    top: 50, // Adjust the position to appear higher on screen
    left: 200,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
   
    width:200,
    zIndex: 10000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  dropdownImage: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  dropdownLabel: {
    fontSize: 16,
  },
  image:{},
  
  
  logo:{
    marginLeft: 10,
      height: 50,
      width: 80,
  
  },
  imgg:{
    width:20,
    height:20,
  
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#6270BA',
    borderRadius: 8,
  },
  pageText: {
    color: 'white',
    fontSize: 16,
  },
  
});
