const app = require("./index")
const PORT = 2022;
const connect = require("./configs/db.js");

app.listen(PORT,async function () {
    await connect();
    console.log(`Listening on the port: http://localhost:${PORT}`);
  })