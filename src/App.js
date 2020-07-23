import React, { useEffect } from "react";
import Routes from "./routes";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/globalTheme";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import returnStoreAndPersistor from "./redux/index";
import { BrowserRouter } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";
import { useTranslation } from "react-i18next";

const { store } = returnStoreAndPersistor();

function App() {

  return (
    <HttpsRedirect>
      <BrowserRouter>
        <Provider store={store}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
          >
            <MuiThemeProvider theme={theme}>
              <Routes />
            </MuiThemeProvider>
          </SnackbarProvider>
        </Provider>
      </BrowserRouter>
    </HttpsRedirect>
  );
}

export default App;
