import { createSlice } from "@reduxjs/toolkit";
const initialState=[{
        
    titre:"Hitler",
    authors:"lan kershaw",
    description:"******",
    image:"https://cdn1.booknode.com/book_cover/46/hitler-45795-264-432.jpg",
    date:"01/01/2001",
    rate:"5",
    price : 15


}]
    


const bookSlise = createSlice({
    name:"Book",
    initialState,
    reducers:{
        setBook:(state,action)=>{
            return action.payload
        },
        searchBooks :(state,action)=>{
           state= state.filter((item)=> item.price > action.payload)
           return state
        }
    }

})
export const {setBook,searchBooks}=bookSlise.actions
export default bookSlise.reducer