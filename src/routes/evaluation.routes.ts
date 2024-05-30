import router from "./router.instance";
import EvaluationHttpController from "../controllers/evaluation.controller";

const HttpController = new EvaluationHttpController();


router.post('/evaluation', HttpController.post);
router.get('/evaluation', HttpController.get);
router.get('/evaluation/group', HttpController.getGroupEvaluation);
router.put('/evaluation/:id', HttpController.put);
router.put('/evaluation/note/:id', HttpController.putNoteEvaluation);
router.delete('/evaluation/:id', HttpController.delete);

export default router;