import { Response } from "express"
import TRequest from "../types/TRequest"
import { ResumRepository } from "../repositories/resum-repository"

export class ListarResumos {
    async listarResumo(req: TRequest, res: Response) {
        const  userId  = Number(req.userId)
        const { materia } = req.query

        if (!userId) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        try {
            let resumos

            if (!materia || typeof materia !== 'string') {
                resumos = await new ResumRepository().listAllResum(userId)
            } else {

                resumos = await new ResumRepository().FilterResum(userId, materia)
            }

            return res.status(200).json(resumos)
        } catch (error) {
            console.error('Erro ao listar resumos:', error)
            return res.status(500).json({ error })
        }
    }
}

