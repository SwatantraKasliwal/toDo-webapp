import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todo",
  password: "Swatantra@25",
  port: 5433,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];
app.get("/", async (req, res) => {
  let data = await db.query("SELECT * FROM items ORDER BY id ASC;");
  let items = data.rows;
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
    const updatedId = req.body.updatedItemId;
    const updatedTitle = req.body.updatedItemTitle;
    await db.query("UPDATE items SET title = ($1) WHERE id=$2", [updatedTitle, updatedId]);
    res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const deleteItem = req.body.deleteItemId;
  await db.query("DELETE FROM items WHERE id = $1",[deleteItem]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
