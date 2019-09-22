const server = require("./server");
const { setupDB, shutdown } = require("./config/db");
const PORT = process.env.PORT || 5000;

setupDB()
  .then(() => {
    server.listen(PORT);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(async () => {
    await shutdown();
  });
