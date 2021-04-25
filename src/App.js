import GameSearch from "./Mainpage";
import Faq from "./Faq";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={GameSearch} />
        <Route path="/faq" exact component={Faq} />
      </Switch>
    </Router>
  );
}

export default App;
