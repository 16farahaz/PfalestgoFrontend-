import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header for all stack screens
      }}
    >
     

      <Stack.Screen 
        name="HomePage" 
        options={{ title: "HomePage" }} 
      />
      
      
    </Stack>
  );
}
