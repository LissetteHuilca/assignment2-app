
const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

// Initialize the array of projects
function initialize(){
    return new Promise((resolve, reject) => {
        try{
            projects = [];

            projectData.forEach(p => {
                //find the sector
                let sectorObj = sectorData.find(s => s.id === p.sector_id);

                let pjWithSector = {...p};

                // add the sector property 
                pjWithSector.sector = sectorObj ? sectorObj.sector_name : "Unknown";

                // save it in the array
                projects.push(pjWithSector);
            });

            resolve();
        } catch (err){
            reject("Initialization failed");
        }
    });
}


function getAllProjects(){
    return new Promise((resolve, reject) => {
        if (projects.length > 0){
            resolve(projects);
        } else{
            reject("No projects available");
        }
    });
}

function getProjectById(projectId){
    return new Promise((resolve, reject) => {
        // find the project by id
        const project = projects.find(p => p.id === projectId);

        if(project){
            resolve(project);
        } else{
            reject("Unable to find requested project");
        }
    });
}

function getProjectsBySector(sector){
    return new Promise((resolve, reject) => {
        const result = projects.filter(p =>
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );

        if(result.length > 0){
            resolve(result);
        } else{
            reject("Unable to find requested projects");
        }
    });
}

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector
};