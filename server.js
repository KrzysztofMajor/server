const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.json());

let db = new sqlite3.Database(':memory:');
db.serialize(() => { 
   db.run('CREATE TABLE Authors(id INTEGER NOT NULL,'
   +' author VARCHAR(100),'
   +' image VARCHAR(150),'
   +' alt VARCHAR(100),'
   +' description VARCHAR(2000),'
   +' tags VARCHAR(100),'
   +'PRIMARY KEY(id));');

   db.run('INSERT INTO Authors (author, image, alt, tags, description)'
   +' VALUES("Grace Hopper",'
   +'"https://upload.wikimedia.org/wikipedia/commons/3/37/Grace_Hopper_and_UNIVAC.jpg",'
   +'"Image of Grace Hopper at the UNIVAC I console",'
   +'"programming,linking,navy",'
   +'"Grace was very curious as a child; this was a lifelong trait. At the age of seven, she decided to determine how an alarm clock worked and dismantled seven alarm clocks before her mother realized what she was doing (she was then limited to one clock).");')

   db.run('INSERT INTO Authors (author, image, alt, tags, description)'
   +' VALUES("Grace Hopper",'
   +'"Image of Grace Hopper at the UNIVAC I console",'
   +'"asfda",'
   +'"htrh",'
   +'"desccc");')      
});

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

router.get("/", function(req, res) {      
   let sql = 'SELECT * FROM Authors;';

   db.all(sql, [], (err, rows) => {
      if (err) {
         res.status(400).send(err);
      }
      res.status(200).json(rows);
   });   
});

router.put("/:id", function(req, res) {      
   let data = [req.body.author, req.body.image, req.body.alt, req.body.tags, req.body.description, req.params.id];
   let sql = `UPDATE Authors
              SET author = ?, image = ?, alt = ?, tags = ?, description = ?
              WHERE id = ?`;
   
   db.run(sql, data, function(err) 
   {
      if (err) {
         res.status(400).send(err);
      } else {
         console.log(`Row(s) updated: ${this.changes}`);
         res.sendStatus(204);
      }    
    });   
});

router.post("/", function(req, res) {   
   console.log(req.body);
   let data = [req.body.author, req.body.image, req.body.alt, req.body.tags, req.body.description];
   let sql = `INSERT INTO Authors (author, image, alt, tags, description) VALUES (?,?,?,?,?);`;

   db.run(sql, data, function(err) 
   {
      if (err) {
         console.log(err);
         res.status(400).send(err);
      } else {         
         res.sendStatus(201);
      }    
    });   
});

router.delete("/:id", function(req, res) {   
   let data = [req.params.id];
   let sql = 'DELETE FROM Authors WHERE id =?';
   db.run(sql, data, function(err) {
      if (err) {         
         res.status(400).send(err);
      } else {         
         res.sendStatus(204);
      }    
   });      
});

app.use("/hello", router);

// Start the web server
app.listen(3000, function() {
   console.log("Listening on port 3000...");
});

