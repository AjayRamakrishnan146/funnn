import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ViewForm from './components/ViewForm';
import UserForm from './components/UserForm';
import Main from './components/Main';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<Login/>}/>
      <Route path='/viewform' exact element={<Main  child={<ViewForm method="post" 
                              data={{name:"",position:"",role:"",salary:"",location:"",username:"",password:""}}/>}/>}/>
      <Route path='/userform' exact element={<Main child={<UserForm/>}/>}/>
    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
