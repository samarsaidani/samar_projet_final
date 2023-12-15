import { Button, Container , Nav,NavLink,Navbar as NavbarBs } from "react-bootstrap"
import { FiShoppingCart } from "react-icons/fi";
import { IoMdContact } from "react-icons/io";
import { isAuthenticated } from "../helpers/auth";
import {deleteLocalStorage} from "../helpers/localStorage"
import {useNavigate} from "react-router-dom";
import { deleteCookie,getCookie } from "../helpers/cookies";
const Navbar=()=>{
    const token = getCookie("token")
   
  const navigate = useNavigate()
  const handelLogout = ()=>{
    deleteCookie("token")
    deleteLocalStorage("user")
    navigate("/login")

  }
    return(
        <div>
            {isAuthenticated() && isAuthenticated().role === "user" && (
            <NavbarBs className="bg-white shadow-sm nb-4">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link to="/" as={NavLink}>accueil </Nav.Link>
                        <Nav.Link to="/BookList" as={NavLink}>Livre </Nav.Link>
                        <Nav.Link to="/Search" as={NavLink}>Recherche </Nav.Link>
                    </Nav> 
                    <Button  
                    className="rounded-circle"
                     variant="white" 
                     style={{ width:"3rem" , height:"3rem" , position:"relative"}}>
                       <IoMdContact />
                        
                        </Button>
                        <Button onClick={()=>handelLogout()}>{token ? "logout" : "login"}</Button>
                    <Button  
                    className="rounded-circle"
                     variant="white" 
                     style={{ width:"3rem" , height:"3rem" , position:"relative",}}>
                        <FiShoppingCart />
                        <div className="rounded-circle bg-danger d-flex justify-content-center align-item-center" 
                        >
                            0
                        </div>
                        
                        </Button>
                </Container>
            </NavbarBs>
             )}
              {isAuthenticated() && isAuthenticated().role === "admin" && (
            <NavbarBs className="bg-white shadow-sm nb-4">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link to="/" as={NavLink}>Accueil</Nav.Link>
                        <Nav.Link to="/Order" as={NavLink}>Order </Nav.Link>
                        <Nav.Link to="/Stock" as={NavLink}>Stock</Nav.Link>
                    </Nav> 
                    <Button  
                    className="rounded-circle"
                     variant="white" 
                     style={{ width:"3rem" , height:"3rem" , position:"relative"}}>
                       <IoMdContact />
                        
                        </Button>
                        <Button onClick={()=>handelLogout()}>{token ? "logout" : "login"}</Button>
                    {/* <Button  
                    className="rounded-circle"
                     variant="white" 
                     style={{ width:"3rem" , height:"3rem" , position:"relative",}}>
                        <FiShoppingCart />
                        <div className="rounded-circle bg-danger d-flex justify-content-center align-item-center" 
                        >
                            0
                        </div>
                        
                        </Button> */}
                </Container>
            </NavbarBs>
             )}
        </div>
    )
}

export default Navbar