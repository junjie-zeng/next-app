const { db } = require("@vercel/postgres");

let client;

async function setup() {
  client = await db.connect();
}

async function query(text, params) {
  if (!client) {
    await setup();
  }
  return client.query(text, params);
}

module.exports = {
  query,
};
