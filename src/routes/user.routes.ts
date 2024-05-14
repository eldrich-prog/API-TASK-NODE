import router from "./router.instance";
import validateSchema from "../middlewares/safeParse.validator";
import userSchema from "../schemas/user.schema";
import UserHttpController from "../controllers/user.controller";

const HttpController = new UserHttpController();


router.post('/user', validateSchema(userSchema), HttpController.post);
router.get('/user', HttpController.get);
router.put('/user/:id', validateSchema(userSchema), HttpController.put);
router.delete('/user/:id', HttpController.delete);



export default router;