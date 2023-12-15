
import axios from 'axios';

export const signUp=async(values)=>{

    const {data} = await axios.post("http://localhost:5000/api/register",values)
    return data 
} 
export const signIn=async(values)=>{
    
    const {data} = await axios.post("http://localhost:5000/api/login",values)
    return data 
    
} 