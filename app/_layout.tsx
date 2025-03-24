import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { TransactionProvider } from "../context/TransactionContext";
import { UserProvider } from "@/context/UserContext";
import { BudgetProvider } from "@/context/BudgetContext";
import { PortalHost } from "@rn-primitives/portal";
import "../global.css";
import { NAV_THEME } from "@/lib/constants";
import { Platform } from "react-native";
import { useColorScheme } from "@/lib/useColorScheme";
import { ToastProvider } from "react-native-toast-notifications";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const hasMounted = React.useRef(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!loaded) return null;

  if (!isColorSchemeLoaded) return null;

  return (
    <>
      <ToastProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DARK_THEME : LIGHT_THEME}
        >
          <StatusBar style={colorScheme} />
          <UserProvider>
            <BudgetProvider>
              <TransactionProvider>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
              </TransactionProvider>
            </BudgetProvider>
          </UserProvider>
        </ThemeProvider>
      </ToastProvider>
      <PortalHost />
    </>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
