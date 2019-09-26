const server = require("./server");
const { createLightship } = require("lightship");
const { setupDB, shutdown } = require("./config/db");
const PORT = process.env.PORT || 5000;
const lightship = createLightship();

setupDB()
  .then(() => {
    lightship.registerShutdownHandler(async () => {
      await shutdown();
      server.close();
    });
    server.listen(PORT);
    lightship.signalReady();
  })
  .catch(err => {
    console.error(err);
  });
