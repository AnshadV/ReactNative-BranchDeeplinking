/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import branch, { BranchEvent } from 'react-native-branch';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

branch.subscribe(async ({error, params, uri})=>{
  if(error){
    console.error('Error from Branch: '+ error)
    return
  }

  let lastParams = await branch.getLatestReferringParams()
  console.log('First Referring Params: ', JSON.stringify(lastParams))
})







function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function registerView() {
    let params = {
      alias: "my custom alias",
      description: "Product Search",
        searchQuery: "user search query terms for product xyz",
      customData: {
       "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
       "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
      }
    }
    let event = new BranchEvent(BranchEvent.ViewItem,null,params)
    event.logEvent()
  
  
  }


  

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={this.logCommerce}>
               <Text>Validate SDK Integration</Text>
             </TouchableOpacity>
           <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={registerView}>
               <Text>Register View</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={this.logCommerce}>
               <Text>Register Purchase</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={this.logCommerce}>
               <Text>Get First Parameters</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={this.logCommerce}>
               <Text>Get Last Parameters</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={this.logCommerce}>
               <Text>Generate Link</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={this.logCommerce}>
               <Text>Generate QR Code</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={this.logCommerce}>
               <Text>Show Share Sheet</Text>
             </TouchableOpacity>
             <TouchableWithoutFeedback>
              <View style = {styles.button} >
              <Text> Data </Text>
              </View>
             </TouchableWithoutFeedback>
             <View>
              <Text> </Text>
             </View>
             
            
             
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});



export default App;
