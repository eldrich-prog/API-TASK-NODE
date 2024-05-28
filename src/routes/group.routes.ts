import router from "./router.instance";
import GroupHttpController from "../controllers/group.controller";

const HttpController = new GroupHttpController();


router.post('/group', HttpController.post);
router.get('/group', HttpController.get);
router.put('/group/:id', HttpController.put);
router.delete('/group/:id', HttpController.delete);

export default router;