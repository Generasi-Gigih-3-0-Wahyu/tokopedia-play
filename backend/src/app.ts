import express from "express";
import "dotenv/config";
import env from "./utils/validateEnv";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./utils/connectDb";
import router from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import cookieParser from "cookie-parser";

const app = express();
const port = env.PORT;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(deserializeUser);
app.use(router);

app.listen(port, () => {
  connectDb();
});

export default app;
