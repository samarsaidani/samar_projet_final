
import Card from 'react-bootstrap/Card';
import ReactStars from "react-stars";
import Button from 'react-bootstrap/Button';
import { SlBasket } from "react-icons/sl";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import "../style/stype.css"

function BasicExample({book}) {
  return (
    <Card style={{ width: '15rem' , height:'24rem' ,borderRadius:"20px" }}>
        <div className='cadre'>
        <Card.Img    style={{ width: '190px' , height:'190px' , borderRadius:'30px'  }}src={`http://localhost:5000/public/image/${book.image}`} />
        </div>
     
        <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>livre de :{book.authors}</Card.Text>
                <Card.Text>date de sortie : {book.date} </Card.Text>
        <div className='save'>
       
            {/* 3malet houni les stars */}
            {<ReactStars
                        
                        count={6}
                        value={book.totalRating}
                        size={24}
                        color={"#ffd700"}
                        edit={false}
                        
                        
                        />
                    }
         <Button variant="white" ><SlBasket /></Button>
         <Button variant="white" ><MdOutlineBookmarkAdded /></Button>
         <p>{book.price}</p><p>DT</p>
        </div>
        
      </Card.Body>
    </Card>
  );
}

export default BasicExample;