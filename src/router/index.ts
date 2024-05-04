import exprees from "express";
import petRouter from "../router/petRouter"

const router = (app: exprees.Router) => {
    app.use("/pets", petRouter);
}

export default router