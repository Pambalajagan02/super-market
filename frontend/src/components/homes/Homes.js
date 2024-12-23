import React from 'react'
import Header from '../header/Header' 
import { Button, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';

function Homes() {
    const navigate= useNavigate()

    const [allitems , setAllItems]= useState([])

    useEffect(()=>{
        const itemsFetching= async()=>{
            const response= await fetch('http://localhost:3001/items');
            if(response.ok){
                const data=  await response.json()
                setAllItems(data)
            }
            else{
                console.log("error")
            }
        }
        itemsFetching()
    },[])

    const handleViewDetails=(itemid)=>{
        navigate(`/view/${itemid}`);
    }

    const handleDelete = async (itemid) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        console.log(confirmDelete)
    
        if (!confirmDelete) {
          return; // Exit the function if the user cancels
        }
        try {
          const response = await fetch(`http://localhost:3001/items/${itemid}`,{
            method: 'DELETE',
          });
          if (response.ok) {
            setAllItems(allitems.filter((each) => each.item_id !== itemid));
          } else {
            console.error('Failed to delete book');
            alert('Failed to delete book')
          }
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      };

    const handleEdit=(itemid)=>{
        navigate(`/update/${itemid}`);

    }

  return (
   <>
   <Header/>  
  <div className='p-5'>
  <div className='container mb-3 p-3 mt-5'>
  <h1>Available Items</h1>
   {allitems.length>0?<><Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allitems.map((each) => (
                  <tr key={each.name}>
                    <td>{each.name}</td>
                    <td>{each.price}</td>
                    <td>{each.quantity}</td>
                    <td>{each.category_name}</td>

                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleViewDetails(each.item_id)}
                        className="me-2"
                      >
                        View
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEdit(each.item_id)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(each.item_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table></>:<><p>add your items</p></>}

   </div>

  </div>
   </>


  )
}

export default Homes