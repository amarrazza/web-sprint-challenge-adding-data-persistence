const db = require("../../data/dbConfig");

async function findTasks() {
  const rows = await db("tasks as t")
    .join("projects as p", "t.project_id", "p.project_id")
    .select("task_id", "task_description", "task_notes", "task_completed", "project_name", "project_description")


    const result = rows.map(row => {
        if (row.project_completed === 0) {
          return {
            task_id: row.task_id,
            task_description: row.task_description,
            task_notes: row.task_notes,
            task_completed: false,
            project_name: row.project_name,
            project_description: row.project_description
          };
        } else {
          return {
            task_id: row.task_id,
            task_description: row.task_description,
            task_notes: row.task_notes,
            task_completed: true,
            project_name: row.project_name,
            project_description: row.project_description
          };
        }
      });

  return result;
}

async function findById(id){
  const row = await db('tasks')
      .where('task_id', id)

  return row
}

async function addTask(project) {
const result = await db("tasks").insert(project);

return findById(result);
}

module.exports = {
  findTasks,
  addTask,
};
