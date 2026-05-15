import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import { useFonts } from "expo-font";
import Onboarding1 from "./src/screens/Onboarding1";
import Onboarding2 from "./src/screens/Onboarding2";
import Onboarding3 from "./src/screens/Onboarding3";
import SplashScreen from "./src/screens/SplashScreen";
import LoginSignUp from "./src/screens/LogInSignUp";
import Login from "./src/screens/LogIn";
import SignUp from "./src/screens/SignUp";
import ResetPassword from "./src/screens/ResetPassword";
import Verification from "./src/screens/Verification";
import CreateNewPassword from "./src/screens/CreateNewPassword";
import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import Download from "./src/screens/Download";
import WishList from "./src/screens/WishList";
import MovieDetail from "./src/screens/MovieDetail";
import UpcomingMovie from "./src/screens/UpcomingMovie";
import Genre from "./src/screens/Genre";
import Profile from "./src/screens/Profile";
import MostPopularMovie from "./src/screens/MostPopularMovie";
import Trailer from "./src/screens/Trailer";
import SerialDetail from "./src/screens/SerialDetail";
import EditProfile from "./src/screens/EditProfile";
import PremiumAccount from "./src/screens/PremiumAccount";
import PaymentMethod from "./src/screens/PaymentMethod";
import PrivacyPolicy from "./src/screens/PrivacyPolicy";
import Notification from "./src/screens/Notification";
import Language from "./src/screens/Language";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DownloadProvider } from "./src/context/DownloadContext";
import { AuthProvider } from "./src/context/AuthContext";
import { WishlistProvider } from "./src/context/WishlistContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    MontserratBlack: require("./assets/fonts/Montserrat-Black.ttf"),
    MontserratBlackItalic: require("./assets/fonts/Montserrat-BlackItalic.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    MontserratBoldItalic: require("./assets/fonts/Montserrat-BoldItalic.ttf"),
    MontserratExtraBold: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    MontserratExtraBoldItalic: require("./assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    MontserratExtraLight: require("./assets/fonts/Montserrat-ExtraLight.ttf"),
    MontserratExtraLightItalic: require("./assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    MontserratItalic: require("./assets/fonts/Montserrat-Italic.ttf"),
    MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MontserratLightItalic: require("./assets/fonts/Montserrat-LightItalic.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratMediumItalic: require("./assets/fonts/Montserrat-MediumItalic.ttf"),
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratSemiBoldItalic: require("./assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    MontserratThin: require("./assets/fonts/Montserrat-Thin.ttf"),
    MontserratThinItalic: require("./assets/fonts/Montserrat-ThinItalic.ttf"),
    PoppinsSemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require("./assets/img/logo.png")}
          style={styles.loadingLogo}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <DownloadProvider>
      <WishlistProvider>
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Onboarding1" component={Onboarding1} />
              <Stack.Screen name="Onboarding2" component={Onboarding2} />
              <Stack.Screen name="Onboarding3" component={Onboarding3} />
              <Stack.Screen name="LoginSignUp" component={LoginSignUp} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Verification" component={Verification} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen
                name="CreateNewPassword"
                component={CreateNewPassword}
              />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="Download" component={Download} />
              <Stack.Screen name="Wishlist" component={WishList} />
              <Stack.Screen name="MovieDetail" component={MovieDetail} />
              <Stack.Screen name="UpcomingMovies" component={UpcomingMovie} />
              <Stack.Screen name="Genre" component={Genre} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen
                name="MostPopularMovie"
                component={MostPopularMovie}
              />
              <Stack.Screen name="Trailer" component={Trailer} />
              <Stack.Screen name="SerialDetail" component={SerialDetail} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="PremiumAccount" component={PremiumAccount} />
              <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
              <Stack.Screen name="Language" component={Language} />
              <Stack.Screen name="Notification" component={Notification} />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </AuthProvider>
      </WishlistProvider>
    </DownloadProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1F1D2B",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingLogo: {
    width: 150,
    height: 150,
  },
});
