import Form from 'react-bootstrap/Form';
import "../../style/stype.css"
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { signUp } from '../../api/authApi';
import { Link } from 'react-router-dom';






function Register() {
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const handelSubmit=async()=>{
   await signUp({email:email,password:password})
  .then((responce)=>{
    console.log(responce)
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
    alignItems:"center", boxShadow: "rgba(0, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius:"10%",padding:"80px"}}>
             <div>
              <h1>Enter Email :</h1>
               <input  type="email"placeholder=" Adresse E-mail"  onChange={(event)=>setEmail(event.target.value)} />
                  <h1>Password :</h1>
	                <input type="password"  placeholder="Mot de passe" onChange={(event)=>setPassword(event.target.value)}/>
                  </div>
                    <div className='btn'>
                    <Button  onClick={()=>handelSubmit()}>Créer nouveau compte</Button><br></br>
                    <Link to="/login" >se connecter ?</Link>
                    </div>
                    </div>
	                
                    </Form>
	         
            
     
    </div>
 
    </div>
 </div>
   
  )
}

export default Register;