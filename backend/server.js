const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
const cors = require('cors');
app.use(express.json()) 
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
let db = null
const dbPath = path.join(__dirname, "market.db"); 



const intializeConnection = async () => {
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      })
      app.listen(3001, () => {
        console.log(`server started at localhost:${3001}`)
      })
    } catch (e) {
      console.log(`error in connecting ${e.message}`)
      process.exit(1)
    }
  }
  intializeConnection() 



  app.get('/catogories', async (req, res) => {
    const authorsQuery = 'SELECT * FROM categories;';
    try {
        const dbResponse = await db.all(authorsQuery);  
        if (dbResponse.length > 0) {
            res.status(200).json(dbResponse);  
        } else {
            res.status(404).json({ message: 'No items found' });  
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}); 



app.post('/additems', async (req,res)=>{ 
    console.log("enter------------------");
    const adddetails= req.body;
    console.log(adddetails);
    try{
      const insertQuery=`insert into items (name,category_id ,price,quantity) values ('${adddetails.Name}',${adddetails.selectCategory},${adddetails.Price},${adddetails.qunatity});`;
      await db.run(insertQuery) 
      console.log("item added successfully");
      res.status(200).send('item created successfully');
    }
    catch(error){
      res.status(500).json({ message: 'Server error', error: error.message });  
    }
  }); 



  app.delete('/items/:itemid', async(req,res)=>{ 
    console.log("enter-----------------delete")
    const {itemid} = req.params  
    console.log(itemid)
    try {
      const deleteQuery = `DELETE FROM items WHERE item_id = ${itemid};`;
      const result = await db.run(deleteQuery);
  
      if (result.changes > 0) {
        res.status(200).json({ message: "item deleted successfully" });
      } else {
        res.status(404).json({ message: "item not found" });
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

  }) 


  app.get('/view/:id', async (req, res) => {
    console.log('enter to view-------')
    const {id} = req.params
    console.log(id)
    const genresQuery = `SELECT 
    items.name, 
    items.price, 
    items.quantity,
    categories.category_name
  FROM 
    items
  INNER JOIN
  categories on items.category_id = categories.category_id
  WHERE 
    items.item_id=${id};`;
    try {
        const dbResponse = await db.get(genresQuery);  
        if (dbResponse) {
            res.status(200).json(dbResponse);  
        } else {
            res.status(404).json({ message: 'No item found' }); 
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
  }); 



  app.get('/items', async (req, res) => {
    console.log("enter----------- items");
    const genresQuery = `
        SELECT  
            items.item_id,
            items.name, 
            items.price, 
            items.quantity,
            categories.category_name 
        FROM items 
        INNER JOIN categories 
        ON items.category_id = categories.category_id;
    `;
    try {
        const dbResponse = await db.all(genresQuery);  
        if (dbResponse.length > 0) {
            res.status(200).json(dbResponse);  
        } else {
            res.status(404).json({ message: 'No items found' });  
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
});




app.get('/items/:id', async (req, res) => {
    const {id} = req.params
    console.log("enter-----------idd")
    const genresQuery = `SELECT * FROM items where item_id =${id};`;
    try {
        const dbResponse = await db.get(genresQuery);  
        if (dbResponse) {
            res.status(200).json(dbResponse);  
        } else {
            res.status(404).json({ message: 'No items found' });  
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
}); 




app.put('/update/:itemid', async (req, res) => {

    const { itemid } = req.params;
    const updateDetails = req.body;
    const { Name, selectCategory, Price, qunatity } = updateDetails;
    
    console.log(updateDetails);
    console.log(itemid);
  
    try {
        const updateQuery = `
        UPDATE items 
        SET 
            name = '${Name}', 
            category_id = '${selectCategory}',
            price = '${Price}', 
            quantity = '${qunatity}'
        WHERE item_id = ${itemid};
      `;
  
      await db.run(updateQuery);
  
      res.status(200).send({ message: "item updated successfully" });
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).send({ message: "Failed to update item", error });
    }
  });
  





  











