import "../css/App.css";
import "../css/aboutGame.css";
import { Route } from "react-router-dom";
import Homepage from "./../components/Homepage";
import aboutGame from "./../components/aboutGame";
import Lacman from "./../components/ComponentsGame/Game";

const App = () => {
  return (
    <div className="App">
      <Route path="/" exact component={Homepage} />
      <Route path="/aboutgame" exact component={aboutGame} />
      <Route path="/game" exact component={Lacman} />
    </div>
  );
};

export default App;
