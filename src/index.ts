import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import cron from "node-cron";
import { connectToDatabase } from "./dbConnection";
import authRoutes from "./routes/auth.route"
import userRoutes from "./routes/user.route"
import productRoutes from "./routes/product.route"
import imageUploadRoutes from "./routes/imageUpload.route"
import { sendEmail } from "./middlewares/sendEmail.middleware";

dotenv.config();
const app = express();
const PORT = 8000;

declare global {
    namespace Express {
        interface Request {
            userId: string;
            role: string;
        }
    }
}

app.use(cors({credentials: true,}));
app.use(cookieParser())
app.use(bodyParser.json());

// Schedling a cron job for sending email to owner's at 6PM IST
cron.schedule('* * 18 * *', () => {
    sendEmail();
});

app.get("/", (req: express.Request, res: express.Response) => {                                                                                                                     
    res.send("Inventory Management App");
})

// Connection with DB
connectToDatabase(process.env.MONGO_URL as string);

app.listen(PORT, () => {
    console.log(`App is live at http://localhost:${PORT}`)
})

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/imageUpload", imageUploadRoutes);