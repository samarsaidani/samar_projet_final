import Form from 'react-bootstrap/Form';
import "../../style/stype.css"
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { signIn } from '../../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import {  isAuthenticated, setAuthentification } from '../../helpers/auth';






function Connexion() {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const navigate = useNavigate()
const handelSubmit= async()=>{
  await signIn({email:email,password:password})
  .then((responce)=>{
    setAuthentification(responce.found,responce.token)
    console.log(responce)
    if(isAuthenticated() && isAuthenticated().role ==="user"){
      navigate('/userDash')
    }else if(isAuthenticated() && isAuthenticated().role ==="admin") {
     navigate('/adminDash')
    }
   
  })
  .catch((err)=>{
    console.log(err)})

}

  return (

    <div className='bg'>
    <div  className='cadre' >

          
       <div  style={{display:"flex", justifyContent:"space-around", height:"600px",alignItems:"center"}} >
        
                <Form >
                  <div  style={{ display:"flex",flexDirection:"column",height:"450px",
    alignItems:"center",padding:"90px"}}>
             <div>
                <h1>Email:</h1>
               <input  type="email"placeholder="Adresse E-mail"  onChange={(event)=>setEmail(event.target.value)} />
                <h1>password:</h1>
	                <input type="password"  placeholder="Mot de passe" onChange={(event)=>setPassword(event.target.value)}/>
                  </div>
                    <div className='btn'>
                   
                    <Button vonClick={()=>handelSubmit()}>Connexion</Button> <br></br>
                   
                    <Link to="/register">créer Nouveau compte </Link>
                   
                    </div>
                    </div>
	                
	         
            </Form>
     
    </div>
 
    </div>
 
    </div>
  )
}

export default Connexion;