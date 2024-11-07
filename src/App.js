import './App.css';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'; 
import NoteState from './context/notes/NoteState';
import AlertProvider from './context/alerts/AlertContext';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <>
    <AlertProvider>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert />
    <div className="container">
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </AlertProvider>
    </>
  );
}

export default App;
