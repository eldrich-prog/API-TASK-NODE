import router from "./router.instance";
import validateSchema from "../middlewares/safeParse.validator";
import tempSchema from "../schemas/temp.schema";
import tempHttpController from "../controllers/temp.controller";

const HttpController = new tempHttpController();


router.post('/temperatura/:temp', HttpController.post);
router.get('/temperatura', HttpController.get);


export default router;