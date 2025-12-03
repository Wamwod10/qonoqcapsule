import { Routes, Route } from "react-router-dom";

import Capsules from "./components/capsules/Capsules";
import Footer from "./components/footer/Footer";
import Gallery from "./components/gallery/Gallery";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Qonoq from "./components/qonoq/Qonoq";
import "./i18n";
import Capsule from "./pages/capsule/Capsule";
import Rules from "./pages/rules/Rules";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Qonoq />
              <Capsules />
              <Gallery />
            </>
          }
        />
        <Route path="/capsule" element={<Capsule />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
