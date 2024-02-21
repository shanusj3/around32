import app from "./app";
import { connectToDatabase, disconnectFromDatabase } from "./db/connection";
import env from "./utils/envValidation";

const PORT = env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port: " + PORT);
    });
  })
  .catch(() => {
    disconnectFromDatabase();
  });
