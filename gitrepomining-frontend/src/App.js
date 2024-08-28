import React from 'react'
import { RepoDisplay } from './components/repodisplay/RepoDisplay'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Dashboard } from './components/dashboard/Dashboard';

function App() {

  return (
    <div className="App">
        <Router>
          {/* <Link to="/" className={classes.link}>
        
          </Link> */}
          <Switch>


              <Route path="/:id">
                <Dashboard />
              </Route>

              <Route path="/">
                <RepoDisplay />

              </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
