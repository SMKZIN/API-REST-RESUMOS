import { Response } from "express"
import TResumo from "../types/TResumo"
import { ResumRepository } from "../repositories/resum-repository"
import { UserRepository } from "../repositories/user-repository"
import TRequest from "../types/TRequest"

export default class ResumController {
    async createResum(req: TRequest, res: Response) {
        const { materiaId, topicos } = req.body
        const userId = Number(req.userId)
        let { titulo } = req.body

        if (typeof materiaId !== 'number' || !materiaId || !topicos || !Array.isArray(topicos) || topicos.length === 0) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" })
        }

        const tituloFinal = typeof titulo === 'string' && titulo.trim() ? titulo : "Sem título"

        try {
            const resumoRepository = new ResumRepository()
            const userRepository = new UserRepository()
            const usuario = await userRepository.findById(userId)

            if (!usuario) {
                return res.status(402).json({ mensagem: "Falha na autenticação" })
            }

            const encontrarMateria = await resumoRepository.findBIdMatery(materiaId)
            if (!encontrarMateria) {
                return res.status(404).json({ mensagem: "Matéria não encontrada" })
            }

            const descricao = "Descrição padrão do resumo."

            const novoResumo: TResumo = {
                usuarioId: usuario.id,
                materiaId,
                titulo: tituloFinal,
                topicos: topicos.join(", "),
                descricao,
                criado: new Date().toISOString(),
            }

            const retorno = await resumoRepository.toCreate(novoResumo)

            return res.status(201).json(retorno)

        } catch (error) {
            const erro = error as Error
            return res.status(500).send(erro.message)
        }
    }
}
