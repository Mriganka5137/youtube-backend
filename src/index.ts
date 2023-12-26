import "dotenv/config";
import connectToDatabase from "./db/mongoose.js";
import { app } from "./app.js";

const port: number = parseInt(process.env.PORT!) || 5138;
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
