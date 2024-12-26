import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header for all stack screens
      }}
    >
     

      <Stack.Screen 
        name="Home" 
        options={{ title: "Home" }} 
      />
      <Stack.Screen 
        name="Signupps" 
        options={{ title: "Signupps" }} 
      />
      <Stack.Screen 
        name="OrderRide" 
        options={{ title: "OrderRide" }} 
      />
      
    </Stack>
  );
}
