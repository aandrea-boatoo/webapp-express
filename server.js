import express from "express";

//Other imports
import errorsHandler from "./middlewares/errorsHandler.js";
import notFound from "./middlewares/notFound.js";
import corsPolicy from "./middlewares/corsPolicy.js";
import booksRouter from "./routes/books.js";
// create a server instance
const app = express();

// set costant to port
const port = process.env.PORT || 3000;
app.use(express.static("public"));

app.use(corsPolicy);

// registro il body-parser per "application/json"
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home Page");
});

//other routes
app.use("/books", booksRouter);
//index = /books lista libri (get) Rtot
//show = /books/:id singolo libro (get) Rpar
//store = /books salvo nuovo libro (post) C
//update = /books/:id aggiorno un libro (put) U
//destroy = /books/:id elimino un libro (delete) D

//rotte di errore che rispondono con un messaggio json
app.use(errorsHandler);

app.use(notFound);

//server must listen on your host and your port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}}`);
});
