// build your `Project` model here
const db = require("../../data/dbConfig");

async function findProjects() {
  const rows = await db("projects");

  //Change project_completed from 1/0 to true/false
  const result = rows.map(row => {
    if (row.project_completed === 0) {
      return {
        project_id: row.project_id,
        project_name: row.project_name,
        project_description: row.project_description,
        project_completed: false,
      };
    } else {
      return {
        project_id: row.project_id,
        project_name: row.project_name,
        project_description: row.project_description,
        project_completed: true,
      };
    }
  });

  return result;
}

async function findById(id){
    const row = await db('projects as p')
        .where('p.project_id', id)
        
    return row
}

async function addProject(project, id) {
  const result = await db("projects").insert(project);

  return findById(result);
}

module.exports = {
  findProjects,
  addProject,
};
