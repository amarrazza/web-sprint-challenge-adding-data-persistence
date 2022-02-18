const db = require("../../data/dbConfig");

async function findResources() {
  const rows = await db("resources");
  return rows;
}

async function findById(id){
  const row = await db('resources')
      .where('resource_id', id)

  return row[0] 
}

async function addResource(resource) {
const result = await db("resources").insert(resource);

return findById(result);
}

module.exports = {
  findResources,
  addResource,
};
