const express = require('express')
const app = express()
const port = 3000
const client = require('./db/conn.js');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads')) 

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`); 
    }
  })  
  const upload = multer({ storage: storage });

app.get('/', async (req, res) => { 
    res.json({ "message": "Api works!" })
})
 
app.get('/blog/:cat', async (req, res) => {
    const result = await client.query(
        req.params.cat != 'all' ? `SELECT * from blogs where category = '${req.params.cat}'` : 'SELECT * from blogs'
      );
    res.json({ "data": result.rows })
}) 

app.get('/blogbyid/:id', async (req, res) => {
    const result = await client.query(`SELECT * from blogs where id = ${req.params.id}`);
    res.json({ "data": result.rows })
}) 

app.post('/blog', async (req, res) => {
    try {
        const { title, image, post, category } = req.body; 

        const result = await client.query(
            'INSERT INTO blogs (title, image, post, category) VALUES ($1, $2, $3, $4) RETURNING *', 
            [title, image, post, category]
        );

        res.status(201).json({ message: "Blog added successfully!", data: result.rows[0] });
    } catch (error) {
        console.error("Error inserting blog:", error); 
        res.status(500).json({ error: error.message });  
    }   
}); 

app.post('/blogimage', upload.single('file'), function (req, res) {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({ path: `/uploads/${req.file.filename}` }); 
}); 
  
app.get("/welcome", (req, res) => {
    res.send("Hello, Welcome to Express!");
});

app.post("/data", (req, res) => {
    const receivedData = req.body;
    res.json({ message: "Data received successfully!", data: receivedData });
});

app.listen(port, () => {
    console.log(`Example app listeninig on port ${port}`)
})