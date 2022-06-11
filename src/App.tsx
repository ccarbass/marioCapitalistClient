import React, { Fragment,useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { World } from './world';
import { WorldContext } from './context/WorldContext';

//import page
import { Components } from './page/index';

function App() {
  const worldContext = React.useContext(WorldContext);
  const [username, setUsername] = useState<String>('');
  const [world, setWorld] = useState<World | null>(null);

  useEffect(() => {
    setUsername(worldContext.username);
    setWorld(worldContext.world);
  }, [worldContext]);

  console.log(world)

  return (
    <><div className='App'>
      <input
        type='text'
        value={username.toString()}
        onChange={(e) => {
          setUsername(e.target.value);
        } }
        onKeyDown={(e) => {
          if (e.key === 'Enter')
            worldContext.onChangeUser(username);
        } }
        onBlur={() => worldContext.onChangeUser(username)} />

    </div>
    
    <Router>
        <Fragment>

          <Routes>
            <Route path='/' element={<Components/>} />

          </Routes>
        </Fragment>
      </Router></>
  );
}

export default App;
