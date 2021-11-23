import Aside from "./components/Aside/Aside";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MainRouter from "./router/index";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <MainRouter />
      <Footer />
      <Aside />
    </BrowserRouter>
  );
}

export default App;
