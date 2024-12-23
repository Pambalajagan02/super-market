import React from 'react'
import { useEffect,useState } from 'react' 
import { useParams ,useNavigate} from 'react-router-dom'; 
import Header from '../header/Header';


function Update() {
  const { itemid } = useParams();
  console.log(itemid)

  const [Name,SetName] = useState('');
      const [Category,setCategory] = useState([]);
      const [selectCategory,SetSelectCategory] = useState('')
      const [Price, setPrice] =useState(0);
      const [qunatity,setQunatity] =useState(1);
      const [error,setError] =useState('') 
      const navigate= useNavigate()



    useEffect(()=>{
      const updatinngData= async()=>{
        const responsecat= await fetch("http://localhost:3001/catogories");
        const responseitems= await fetch(`http://localhost:3001/items/${itemid}`)

        if(responsecat.ok && responseitems.ok){
          const categoriesdata= await responsecat.json()
          const itemsdata= await responseitems.json()
          setCategory(categoriesdata)
          SetName(itemsdata.name)
          setPrice(itemsdata.price)
          setQunatity(itemsdata.quantity)
          categoriesdata.forEach(element => {
            if(element.category_id===itemsdata.category_id){
              console.log(element.category_name)
              SetSelectCategory(element.category_id)
            }
            
          });
          
        }
        else{
          setError("all fileds are required");
        }
      }
      updatinngData()
    },[itemid])


    const onSubmitUpdateItem= async(event)=>{ 
      event.preventDefault()
      const marketItems={Name,selectCategory,Price,qunatity}

      try{
          const addurl=`http://localhost:3001/update/${itemid}`;
          const options={ 
            method:"PUT",
            headers:{
               'Content-Type': 'application/json',
            },
            body:JSON.stringify(marketItems)
          }
          const addresponse= await fetch(addurl,options)
          if(addresponse.ok){
           const updateStatus=  await addresponse.json()
           console.log(updateStatus)
           alert(updateStatus.message)
            navigate('/')
      
          }
        }catch(errors){ 
          console.log(errors)
        }
      }

  return (
    <>
    <Header/>
    <div className='p-5'>
    <div className="container-fluid form-main-container p-5">
              <h2>update your Item</h2> 
              <form className='form-container' onSubmit={onSubmitUpdateItem}>
    
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label" >Item Name</label>
                  <input type="text" className="form-control" id="Title" placeholder='Enter book title.' value={Name} onChange={(e)=>SetName(e.target.value)} required/>
                </div>

    
                <div className="mb-3">
                  <label htmlFor="price" className="form-label" >price</label>
                  <input type="number" className="form-control" id="price" placeholder='Enter price.' value={Price} onChange={(e)=>setPrice(e.target.value)} required/>
                </div>

                <div className="mb-3">
              <label htmlFor="categories" className="form-label">Categories</label>
              <select  className="form-control" id="categories" value={selectCategory} onChange={(e)=>SetSelectCategory(e.target.value)}>
                {Category.map((each)=><option key={each.category_id} value={each.category_id}>{each.category_name}</option>)}
              </select>
            </div> 


                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label" >quantity</label>
                  <input type="number" className="form-control" id="quantity" placeholder='Enter the quantity' value={qunatity} onChange={(e)=>setQunatity(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-primary">update</button> 
                {error &&<p style={{color:"red"}}>{error}</p>}
               
              </form>
              
            </div>
    </div>
     
    </>
   
      )

    

    
  
}

export default Update