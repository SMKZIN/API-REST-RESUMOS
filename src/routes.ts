import { Router } from "express";
import UserController from "./controllers/cadastro-estudante";
import { LoginController } from "./controllers/login-estudante";
import { ListController } from "./controllers/listar-materias";
import resumController from "./controllers/cadastrar-resumo";
import { authMideleware } from "./middlewares/auth-middleware";
import { ListarResumos } from "./controllers/listar-resumos";





const routes = Router()

// create:
routes.post('/usuarios', new UserController().create)

// login:
routes.post('/login', new LoginController().login)

// Token auth:

routes.use(authMideleware)

// list:
routes.get('/materias', new ListController().list)

// create Resum:
routes.post('/resumos', new resumController().createResum)

//list Resum:
routes.get('/resumos', new ListarResumos().listarResumo)

export default routes