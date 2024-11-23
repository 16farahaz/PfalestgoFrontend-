import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header for all stack screens
      }}
    >
      <Stack.Screen 
        name="Signin" 
        options={{ title: "Sign In" }} 
      />
      <Stack.Screen 
        name="Signup" 
        options={{ title: "Sign Up" }} 
      />
      <Stack.Screen 
        name="Home" 
        options={{ title: "Home" }} 
      />
    </Stack>
  );
}
