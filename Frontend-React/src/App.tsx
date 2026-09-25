import {BrowserRouter,Routes,Route,Outlet} from 'react-router'
import Home from './components/home';
import Navbar from './Navbar';
import About from './components/about';
import Contact from './components/contact';
import Services from './components/services';
import Register from './components/Registration';
import Login from './components/login';

export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route path='about' element={<About/>} />
      <Route path='contact' element={<Contact/>} />
      <Route path='services' element={<Services/>} />
      {/* <Route path='register' element={<Register/>} /> */}
      <Route path='login' element={<Login/>} />
      <Route path='registration' element={<Register/>}/>
    </Routes>
    <Outlet/>
    
    </BrowserRouter>
  )
}




