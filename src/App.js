import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';

function App() {
  const [showData, setShowData] = useState(false);

  return (
    <div>
      <Search />
    </div>
  )
}

export default App;
