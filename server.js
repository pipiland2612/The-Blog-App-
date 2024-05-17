import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//render all  the blog app 
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts`)
        console.log(response.data)
        res.render("index.ejs", {
            posts: response.data,
        })
    } catch (error) {
        console.log(error)
    }
})

app.get("/new", (req, res) => {
    res.render("modify.ejs",
        { heading: "New Post", submit: "Create Post" }
    )
})

app.get("/edit/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`)
        res.render("modify.ejs", {
            heading: "Edit Post",
            submit: "Update Post",
            post: response.data,
        })
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/posts", async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, req.body)
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})


app.post("/api/posts/:id", async (req, res) => {
    try {
        const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body)
        console.log(req.params.id)
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/posts/delete/:id", async (req, res) => {
    try {
        const response = await axios.delete(`${API_URL}/posts/${req.params.id}`)
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);
});