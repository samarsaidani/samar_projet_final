import BasicExample from "./bookCard";






const BookList =({Book})=>{
    
    
    return(
        <div  className="model" >

{Book.map((el,index)=>{
    return(
    <div><BasicExample  book={el} key={index}/></div>)
})
}


        </div>
    )
}
export default BookList ;