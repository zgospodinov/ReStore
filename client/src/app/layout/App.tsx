import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../feature/about/AboutPage";
import Catalog from "../../feature/catalog/Catalog";
import ProductDetails from "../../feature/catalog/ProductDetails";
import ContactPage from "../../feature/contact/ContactPage";
import HomePage from "../../feature/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import { Route, Switch } from "react-router-dom";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = "ReStore"
  },[])
  
  const palleteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: !darkMode ? "#eaeaea" : "#121212"
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />

      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={Catalog} />
          <Route path="/catalog/:id" component={ProductDetails} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/server-error" component={ServerError} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
