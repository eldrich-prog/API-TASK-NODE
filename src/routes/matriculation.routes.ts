import router from "./router.instance";
import MatriculationHttpController from "../controllers/matriculation.controller";

const HttpController = new MatriculationHttpController


router.post('/matriculation', HttpController.post);
router.get('/matriculation', HttpController.get);
router.get('/matriculation/group/:id', HttpController.getGroupMatriculation);
router.put('/matriculation/:id', HttpController.put);
router.delete('/matriculation/:id', HttpController.delete);

export default router;