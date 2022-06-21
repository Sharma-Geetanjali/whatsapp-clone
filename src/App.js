import React, { useEffect } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import{
  BrowserRouter as Router,
  Switch, 
  Route
} from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function App() {

  const[{user}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(user=>{  dispatch({
        type:"SET_USER",
        user:user
      })
    })
},[])

  return (
     <div className="App">
        { !user ? (<Login/>):
        
        (
        <div className='app_body'>
         <Router>
          
         <Sidebar/> 
         
          <Switch>
                          
          

          <Route exact path="/room/:roomId">
            <Chat/>
            </Route>

            <Route exact path="/">
            <Chat/>
            </Route>

            

          </Switch>

          </Router>

          </div>
       

        )}
         </div>
         
        
            
   
  );
}

export default App;
