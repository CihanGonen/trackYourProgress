import "./App.css";
import Input from "./components/Input";
import CardsArea from "./components/CardsArea";
import ExercisePage from "./components/ExercisePage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App h-full">
        <div className="p-5">
          <Switch>
            <Route exact path="/">
              <div className="md:grid md:grid-cols-6 md:gap-10">
                <Input />
                <CardsArea />
              </div>
            </Route>
            <Route path="/exercises/:id">
              <ExercisePage></ExercisePage>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
