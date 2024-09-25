import { Request, Response } from "express"
import { UserRepository } from "../repositories/user-repository"
import bcrypt from 'bcrypt'

export default class UserController {
    async create(req: Request, res: Response) {
        const { nome, email, senha } = req.body

        if (!nome || !email || !senha ||
            typeof nome !== 'string' ||
            typeof email !== 'string' ||
            typeof senha !== 'string'
        ) {
            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios"
            })
        }

        try {
            const userRepository = new UserRepository()
            const emailExiste = await userRepository.findByEmail(email)

            if (emailExiste) {
                return res.status(400).json({
                    mensagem: "E-mail já cadastrado"
                })
            }

            const hashSenha = await bcrypt.hash(senha, 10)
            const novoUsuario = {
                nome,
                email,
                senha: hashSenha
            }

            const usuarioCriado = await userRepository.ToCreate(novoUsuario)

            return res.status(201).json(usuarioCriado)

        } catch (error) {
            const erro = error as Error
            return res.status(500).json({
                mensagem: erro.message
            })
        }
    }
}