
import {Routes , Route} from "react-router"
import Connexion from "./pages/auth/login";
import Register from "./pages/auth/register";
import UserRoute from "./privateRoute/userRoute";
import UserDash from "./pages/user/userHome";
import AdminDash from './pages/admin/adminHome'
import AdminRoute from "./privateRoute/adminRoute"
import Home from "./pages/user/Home";

import NavBar from './component/navBar'
function App() {
  
  return (
    <div >
    <NavBar/>
      <Routes>
        <Route path="/login" element={<Connexion/>}/>
        <Route path="/register" element={<Register/>}/>
      <Route  path="/" element={<Home/>}/>
     
     
     
      {/* route for the simple user */}
      
      
      
      <Route element={<UserRoute/>}>
        <Route path="/useDash" element={<UserDash/>}/>
      </Route>
      {/* // route for connected admin */}
  <Route element={<AdminRoute/>}>
    <Route path="/adminDash" element={<AdminDash/>}/>

  </Route>
      </Routes>
       

     
      
    </div>
  );
}

export default App;
