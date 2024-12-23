import React from 'react'
import { useEffect ,useState} from 'react'  
import { useParams ,useNavigate} from 'react-router-dom';  
import './viewdetails.css'

function ViewDetails() {
    const [ loader,setLoader]=useState(true) 
    const {itemid} = useParams();
    const Navigate= useNavigate()
    
    const [itemdetails,setitemDetails]=useState({})
    useEffect(()=>{
      const viewDetailsFetching= async ()=>{
        
          try {
            const response = await fetch(`http://localhost:3001/view/${itemid}`);
            if (response.ok) {
              const data= await response.json() 
             setitemDetails(data)
             setLoader(false)
            } else {
              console.error('Failed to fetch book');
            }
          } catch (error) {
            console.error('Error fetching  book:', error);
          }
        };
      viewDetailsFetching()

  },[itemid]);

  return (
    loader? <p>loading...</p>:<div className="book-details-container">
    <button className="back-button" onClick={() => Navigate('/')}>
    Back
    </button>
    <div className="card">
      <p><strong>Name:</strong>{itemdetails.name}</p>
      <p><strong>Price:</strong> {itemdetails.price}</p>
      <p><strong>Category:</strong>{itemdetails.category_name}</p>
      <p><strong>Quantity:</strong>{itemdetails.quantity}</p>
    </div>
  </div>
  )
}

export default ViewDetails