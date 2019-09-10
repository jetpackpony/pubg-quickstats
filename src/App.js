import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import User from './components/User';

function App() {
  return (
    <Router>
      <Route path="/users/:username" component={User} />
    </Router>
  );
}

export default App;
