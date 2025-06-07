import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const port = 3000;
const API_URL = process.env.API_URL;

app.use(express.static("public"));
app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/questions`);
    console.log(response);
    res.render("index.ejs", { questions: response.data });
      }catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Question", submit: "Create Question" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/questions/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Question",
      submit: "Update Question",
      question: response.data,
      });
      } catch (error) {
        res.status(500).json({ message: "Error fetching question" });
      }
});

// Create a new question
app.post("/api/questions", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/questions`, req.body);
    console.log(response.data);
    res.redirect("/");
     }catch (error) {
       res.status(500).json({ message: "Error creating question" });
       }
});

// Partially update a question
app.post("/api/questions/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.patch(
      `${API_URL}/questions/${req.params.id}`,
      req.body
    );
    console.log(response.data);
    res.redirect("/");
     } catch (error) {
       res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a question
app.get("/api/questions/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/questions/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting question" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
