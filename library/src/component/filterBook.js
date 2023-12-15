import { useState , useEffect} from "react";
import Form from 'react-bootstrap/Form';
import { useDispatch } from "react-redux";
import {searchBooks} from "../store/book"
import "../style/stype.css"



const Search =()=>{
    const [input,setInput] = useState(null);
    
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(searchBooks(Number(input)))
    },[input])

    // search by totalRating 
    // search by price 

  

     
    return(
        <div className="search">
        <Form.Label>Price</Form.Label>
        <Form.Range  defaultValue={0} onChange={(event)=>setInput(event.target.value)}/>
        </div>
    )
}
export default Search;