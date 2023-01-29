const express = require("express");

const app = express();
const router = express.Router();

app.use(express.json());

router.delete("/authors/:id", function(req, res) {
   console.log("DELETE");
   res.sendStatus(204);
 });

router.get("/authors", function(req, res) {
    const songs = [
       {
          title: "We Found Love",
          artist: "Rihanna",
          popularity: 10,
          releaseDate: new Date(2011, 9, 22),
          genre: ["electro house"]   
       },
       {
          title: "Happy",
          artist: "Pharrell Williams",
          popularity: 10,
          releaseDate: new Date(2013, 11, 21),
          genre: ["soul", "new soul"]
       }
    ];
 
    res.json(songs);
 });


app.use("/api", router);
app.listen(3000);