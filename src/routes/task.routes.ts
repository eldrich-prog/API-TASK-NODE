import router from "./router.instance";
import TaskHttpController from "../controllers/task.controller";


const HttpController = new TaskHttpController


router.post('/task', HttpController.post);
router.get('/task', HttpController.get);
router.get('/task/group/:id', HttpController.getGroupTask);
router.put('/task/:id', HttpController.put);
router.delete('/task/:id', HttpController.delete);

export default router;