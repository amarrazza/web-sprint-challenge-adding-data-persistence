// build your `Project` model here
const db = require("../../data/dbConfig");

async function findProjects() {
  const rows = await db("projects");

  //Change project_completed from 1/0 to true/false
  const result = rows.map(row => {
    if (row.project_completed === 0) {
      return {
        project_name: row.project_name,
        project_description: row.project_description,
        project_completed: false,
      };
    } else {
      return {
        project_name: row.project_name,
        project_description: row.project_description,
        project_completed: true,
      };
    }
  });

  return result;
}

async function addProject(project) {
  await db("projects").insert(project);

  return findProjects();
}

module.exports = {
  findProjects,
  addProject,
};
