import React, { useEffect } from 'react'
import { Button, Container , Nav,NavLink,Navbar as NavbarBs } from "react-bootstrap"
import {useSelector,useDispatch} from "react-redux"
import { setBook } from '../../store/book';
import { getbook } from '../../api/users';
import { IoMdContact } from "react-icons/io";
import BookList from '../../component/bookList';
import Search from '../../component/filterBook';

function Home() {
    const list = useSelector((state)=>state.Book)
  console.log(' list :',list);

  const dispatch = useDispatch()
  
  useEffect (()=>{
    getbook()
    .then((res)=>{
      dispatch( setBook(res.rslt))
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div>
            <NavbarBs className="bg-white shadow-sm nb-4">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link to="/" as={NavLink}>accueil </Nav.Link>
                        
                       
                        
                    </Nav> 
                    <Button  
                    className="rounded-circle"
                     variant="white" 
                     style={{ width:"3rem" , height:"3rem" , position:"relative"}}>
                       <IoMdContact />
                        
                        </Button>
                        
                    
                </Container>

            </NavbarBs>
            <Search/>
             <BookList Book={list}/>
             
          
      
    </div>
  )
}

export default Home
