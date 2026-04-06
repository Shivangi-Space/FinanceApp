import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import TabNavigator from "./src/navigation/TabNavigator";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
