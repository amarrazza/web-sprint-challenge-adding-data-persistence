const db = require("../../data/dbConfig");

async function findResources() {
  const rows = await db("resources");
  return rows;
}

async function addResource(resource) {
  await db("resources").insert(resource);

  return findResources();
}

module.exports = {
  findResources,
  addResource,
};
