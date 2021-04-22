import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Welcome from './components/Welcome/Welcome';
import Questions from './components/Questions/Questions';

function App() {
  return (
    <Router>
      <div className=" has-background-white-bis">
        <div className="container box is-max-desktop main-app">
          <Route
            path="/"
            exact
            render={() => (
              <>
                <Login />
              </>
            )}
          />
          <Route path="/welcome" component={Welcome} />
          <Route path="/play" component={Questions} />
        </div>
      </div>
    </Router>
  );
}

export default App;
