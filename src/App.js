import GameSearch from "./Mainpage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={GameSearch} />
      </Switch>
    </Router>
  );
}

export default App;
