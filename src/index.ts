import "dotenv/config";
import connectToDatabase from "./db/mongoose.js";
import { app } from "./app.js";

const port: number = parseInt(process.env.PORT!) || 8000;
connectToDatabase()
  .then(() => {
    app.listen(port),
      () => {
        console.log(`Listening on port: ${port}`);
      };
  })
  .catch((err) => {
    console.log(err);
  });
