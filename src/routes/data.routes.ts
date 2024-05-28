import router from "./router.instance";
import validateSchema from "../middlewares/safeParse.validator";
import tempSchema from "../schemas/temp.schema";
import dataHttpController from "../controllers/data.controller";

const HttpController = new dataHttpController();


router.post('/data/:str', HttpController.post);
router.get('/data', HttpController.get);


export default router;