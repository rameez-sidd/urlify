import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/errorHandler.js"
import path from "path"
const __dirname = path.resolve();

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../client/dist")))
app.use(cookieParser())


//routes import
import linkRoutes from './routes/link.routes.js'
import redirectRoutes from "./routes/redirect.routes.js";
import healthRoutes from "./routes/health.routes.js";

//routes declaration
app.use("/api", linkRoutes);
app.use("/", healthRoutes);
app.use("/", redirectRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));

})

app.use(errorHandler);

export { app }