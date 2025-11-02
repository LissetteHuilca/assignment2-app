/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Lissette Huilca Aguilar Student ID: 107510240 Date: 02-11-2025
*
********************************************************************************/

const express = require('express'); // "require" the Express module
const path = require('path')
const app = express(); // obtain the "app" object
const PORT = process.env.PORT || 8080; // assign a port

const projectData = require("./modules/projects");

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/solutions/projects', (req, res) => {
  const {sector} = req.query;
  const promise = sector ? projectData.getProjectsBySector(sector) : projectData.getAllProjects();

  promise
    .then(projects  => res.render('projects', { projects: projects  }))
    .catch(err => {
      res.status(404).render('404', { message: `No projects found for sector: ${sector}.` })});
});

app.get('/solutions/projects/:id', (req, res) => {
  const id = Number(req.params.id);

  projectData.getProjectById(id)
    .then(project => res.render("project", {project: project}))
    .catch(err => res.status(404).render('404', { message: err }));
});

//404
app.use((req, res) => {
  res.status(404).render("404", {message: "I'm sorry, we're unable to find what you're looking for"});
});


projectData.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error("Initialization failed:", err));


// --- Vercel ---
module.exports = app;