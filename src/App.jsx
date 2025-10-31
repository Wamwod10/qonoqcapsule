import Capsules from "./components/capsules/Capsules";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import "./i18n";

function App() {
  return (
    <>
      <div>
        <Nav />
        <Header />
        <Capsules />
      </div>
    </>
  );
}

export default App;
