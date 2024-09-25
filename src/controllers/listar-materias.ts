import { UserRepository } from "../repositories/user-repository";
import { Request, Response } from "express";

export class ListController {
    async list(req: Request, res: Response) {
        try {
            const userRepository = new UserRepository()
            const materias = await userRepository.list()
            return res.status(200).json(materias)

        } catch (error) {
            const erro = error as Error
            return res.status(500).json({
                mensagem: erro.message
            })
        }
    }
}
