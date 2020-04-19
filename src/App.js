import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainLineChart from './components/MainLineChart';
import BreakdownDonoughtChart from './components/BreakdownDonoughtChart';

function App() {
  return (
    <div className="App">
      <MainLineChart/>
      <BreakdownDonoughtChart/>

    </div>
  );
}

export default App;
