/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import { Alert, Linking } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Clipboard from '@react-native-clipboard/clipboard';
//  import { createStackNavigator } from '@ /stack';
import LinkView from './src/components/LinkView';


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


// listener
branch.subscribe({
  onOpenStart: ({
      uri,
      cachedInitialEvent
  }) => {
      console.log(
          'subscribe onOpenStart, will open ' +
          uri +
          ' cachedInitialEvent is ' +
          cachedInitialEvent,
      );
  },
  onOpenComplete: async ({
      error,
      params,
      uri
  }) => {
      if (error) {
          console.error(
              'subscribe onOpenComplete, Error from opening uri: ' +
              uri +
              ' error: ' +
              error,
          );
          return;
      }

      if (params) {
        if (params['+clicked_branch_link']) {
          // User clicked a Branch link, so redirect them to a special landing page
          Alert.alert('User clicked a Branch link', 'Here is the data from the link: ' + JSON.stringify(params, null, 2));
          let deepLinkPath = params.$deeplink_path as string; 
          let canonicalUrl = params.$canonical_url as string;

          Alert.alert('canonical URL', 'Here is the data from the link: ' + JSON.stringify(canonicalUrl, null, 2));


          return;
        }
        
        if (params['+non_branch_link']) {
          console.log('non_branch_link: ' + uri);
          Alert.alert('non_branch_link', 'Here is the data from the link: ' + JSON.stringify("Non branch link", null, 2));
          // Route based on non-Branch links
          return;
        }
        
      }

      
  },
});








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

const buo = branch.createBranchUniversalObject(
  'item/12345',
  {
    canonicalUrl: 'https://branch.io/item/12345',
    title: 'My Item Title',
    contentMetadata: {
      quantity: 1,
      price: 23.2,
      sku: '1994320302',
      productName: 'my_product_name1',
      productBrand: 'my_prod_Brand1',
      customMetadata: {
        custom_key1: 'custom_value1',
        custom_key2: 'custom_value2',
      },
    },
  }
);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [data, setData] = useState<string>('');
  

  async function registerView() {
    const buoInstance = await buo
    let params = {
      alias: "my custom alias",
      description: "Product Search",
        searchQuery: "user search query terms for product xyz",
      customData: {
       "Custom_Event_Property_Key1": "Custom_Event_Property_val1",
       "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
      }
    }
    let event = new BranchEvent(BranchEvent.ViewItem,buoInstance,params)
    event.logEvent()
    setData(JSON.stringify(event,null,2))

    Snackbar.show({
      text: 'View Item event successfully fired',
      duration: Snackbar.LENGTH_SHORT,
    });
  
  
  }


  


  async function getFirstParams() {
    let firstParams = await branch.getFirstReferringParams();

    setData(JSON.stringify(firstParams, null, 2))
    console.log("firstParams", JSON.stringify(firstParams, null, 2))
  }

  async function getLastParams() {
    let lastParams = await branch.getLatestReferringParams();
    setData(JSON.stringify(lastParams, null, 2))
    console.log("Last Params", JSON.stringify(lastParams, null, 2))
  }

  async function getAttributedParams() {
    let attributedParams = await branch.lastAttributedTouchData();
    setData(JSON.stringify(attributedParams, null, 2))
    console.log("Last Attributed Touch Data", JSON.stringify(attributedParams, null, 2))
  }

  

 

  async function registerPurchase() {
    const comBuo = await buo;
    let params = {
      transaction_id: "tras_Id_1232343434",
      currency: "USD",
      revenue: 180.2,
      shipping: 10.5,
      tax: 13.5,
      coupon: "promo-1234",
      affiliation: "high_fi",
      description: "Preferred purchase",
      purchase_loc: "Palo Alto",
      store_pickup: "unavailable",
      customData: {
       "Custom_Event_Property_Key2": "Custom_Event_Property_val2"
      }
    }
      let event = new BranchEvent(BranchEvent.Purchase,comBuo,params)
      event.logEvent()
      setData(JSON.stringify(event,null,2))

      Snackbar.show({
        text: 'Purchase event successfully fired!',
        duration: Snackbar.LENGTH_SHORT,
      });
  
  }

  
  
  async function generateLink(): Promise<string> {
    const linkProperties = {
      feature: 'sharing',
      channel: 'facebook',
      campaign: 'content 123 launch',
    };
  
    const controlParams = {
      $desktop_url: 'https://example.com/home',
      custom: 'data',
    };
  
    const buoInstance = await buo;
    const { url } = await buoInstance.generateShortUrl(linkProperties, controlParams);
    
    setData(url)

    Clipboard.setString(url)
    Snackbar.show({
      text: 'Generated link copied to clipboard!',
      duration: Snackbar.LENGTH_SHORT,
    });
    return url; 
    

  }

  async function generateQR() {
    var qrCodeSettings = {
      width: 500,
      codeColor: "#3b2016",
      backgroundColor: "#a8e689",
      centerLogo: "https://cdn.branch.io/branch-assets/159857dsads5682753-og_image.png",
      margin: 1,
      imageFormat: "PNG"
  };
  
  var buoOptions = {
      title: "A Test Title",
      contentDescription: "A test content desc",
      contentMetadata: {
          price: "200",
          productName: "QR Code Scanner",
          customMetadata: { "someKey": "someValue", "anotherKey": "anotherValue" }
      }
  };
  
  var lp = {
      feature: "qrCode",
      tags: ["test", "working"],
      channel: "faceboqqok",
      campaign: "posters"
  };
  
  var controlParams = {
      $desktop_url: "https://www.desktop.com",
      $fallback_url: "https://www.fallback.com"
  };
  
  try {
      var result = await branch.getBranchQRCode(qrCodeSettings, buoOptions, lp, controlParams);
  }
  catch (err) {
      console.log('QR Code Err: ', err);
  }
  }


  async function showShareSheet() {

    let shareOptions = { 
      messageHeader: 'Check this out', 
      messageBody: 'No really, check this out!' 
    }
    
    let linkProperties = {
      feature: 'sharing', 
      channel: 'facebook' 
    }
    
    let controlParams = { 
      $desktop_url: 'http://example.com/home', 
      $ios_url: 'http://example.com/ios' 
    }

    const ssbuoInstance = await buo;
    
    let {channel, completed, error} = await ssbuoInstance.showShareSheet(shareOptions, linkProperties, controlParams)
  }
  
  function setIdentity() {
    const randomId = Math.random().toString(36).substring(2, 15);
    branch.setIdentity(randomId);
    console.log("User Identity: ", randomId)
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
            <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={setIdentity}>
               <Text>Set Identity</Text>
             </TouchableOpacity>
           <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={registerView}>
               <Text>Register View</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={registerPurchase}>
               <Text>Register Purchase</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={getFirstParams}>
               <Text>Get First Parameters</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={getAttributedParams}>
               <Text>Get Last Touch Data</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={getLastParams}>
               <Text>Get Last Parameters</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={generateLink}>
               <Text>Generate Link</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={generateQR}>
               <Text>Generate QR Code</Text>
             </TouchableOpacity>
             <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, padding: 10, margin: 10}} onPress={showShareSheet}>
               <Text>Show Share Sheet</Text>
             </TouchableOpacity>
             <TouchableWithoutFeedback>
              <View style = {styles.button} >
              <Text> Data </Text>
              </View>
             </TouchableWithoutFeedback>
             <View>
               <Text selectable={true} style={{marginTop: 20, padding: 10}}>{data}</Text>
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
