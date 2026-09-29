import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';

export default function App() {
  return (
    <SafeAreaProvider>
      <Home/>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
