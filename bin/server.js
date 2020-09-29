const app = require("../src/index");
const { useDatabase } = require("../src/database/index");
const { NODE_EXTERNAL_PORT, HOSTMONGO, MONGOBD } = require("../config/index");

useDatabase(HOSTMONGO, MONGOBD);

app.listen(NODE_EXTERNAL_PORT, () => {
  console.log(
    `Server is running on port: ${NODE_EXTERNAL_PORT}\n`
  );
});
