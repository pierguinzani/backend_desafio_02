const app = require("../src/index");
const { useDatabase } = require("../src/database/index");
const { PORT, CONNECTION_STRING } = require("../config/index");

useDatabase(CONNECTION_STRING);

app.listen(PORT, () => {
  console.log(
    `Server is running on port: ${PORT}\n`
  );
});
