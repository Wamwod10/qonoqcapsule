import Capsules from "./components/capsules/Capsules";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Qonoq from "./components/qonoq/Qonoq";
import "./i18n";

function App() {
  return (
    <>
      <div>
        <Nav />
        <Header />
        <Qonoq />
        <Capsules />
      </div>
    </>
  );
}

export default App;
