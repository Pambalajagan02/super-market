import React from 'react';
import { useState ,useEffect} from 'react'; 
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

function AddItem() {
    const [Name,SetName] = useState('');
    const [Category,setCategory] = useState([]);
    const [selectCategory,SetSelectCategory] = useState('')
    const [Price, setPrice] =useState(0);
    const [qunatity,setQunatity] =useState(1);
    const [error,setError] =useState('')  
    const navigate= useNavigate()

    useEffect(()=>{
        const fetchingCategories= async ()=>{
            const response= await fetch('http://localhost:3001/catogories');
            if(response.ok){
                const data=  await response.json();
                setCategory(data);
            }
            else{
                console.log("error occured");
            }
        }
        fetchingCategories()
    },[])

    const validateAddForm=()=>{
      if(Name==="" || selectCategory==="" || Price ==="" || qunatity<1){
        setError('please fill all the details correctly')
        return false
      }
      if( qunatity >=100){
        setError("quantity not go 100")
        return false
      }
      setError('')
      return true

    }




    const onSubmitAddItem= async(event)=>{ 
        event.preventDefault()
         const validStatus=validateAddForm()
         if(!validStatus){
          return
         }

        const marketItems={Name,selectCategory,Price,qunatity}

        try{
            const addurl='http://localhost:3001/additems' 
            const options={ 
              method:"POST",
              headers:{
                 'Content-Type': 'application/json',
              },
              body:JSON.stringify(marketItems)
            }
            const addresponse= await fetch(addurl,options)
            if(addresponse.ok){
              console.log(addresponse.status)  
              navigate('/')
        
            }
          }catch(errors){ 
            setError("all fileds are required")
          }
        }
    return (
      <>
       <Header/>
       <div className='p-5'>
       <div className="container-fluid form-main-container p-5">
          <h2>Add your Item</h2> 
          <form className='form-container' onSubmit={onSubmitAddItem}>

            <div className="mb-3">
              <label htmlFor="Title" className="form-label" >Item Name</label>
              <input type="text" className="form-control" id="Title" placeholder='Enter Your Item.' value={Name} onChange={(e)=>SetName(e.target.value)} required/>
            </div>


            <div className="mb-3">
              <label htmlFor="price" className="form-label" >price</label>
              <input type="number" className="form-control" id="price" placeholder='Enter price.' value={Price} onChange={(e)=>setPrice(e.target.value)} required/>
            </div>

            <div className="mb-3">
          <label htmlFor="categories" className="form-label">Categories</label>
          <select  className="form-control" id="categories" value={selectCategory} onChange={(e)=>SetSelectCategory(e.target.value)}>
            <option value="">Select an option</option>
            {Category.map((each)=><option key={each.category_id} value={each.category_id}>{each.category_name}</option>)}
          </select>
        </div> 


            <div className="mb-3">
              <label htmlFor="quantity" className="form-label" >quantity</label>
              <input type="number" className="form-control" id="quantity" placeholder='Enter the quantity' value={qunatity} onChange={(e)=>setQunatity(e.target.value)} required/>
            </div>
            <button type="submit" className="btn btn-primary">Add</button> 
            {error &&<p style={{color:"red"}}>{error}</p>}
           
          </form>
          
        </div>

       </div>
    
      </>
     
      )
}

export default AddItem