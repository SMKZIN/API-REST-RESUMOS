import { Request, Response } from 'express'
import { UserRepository } from '../repositories/user-repository'
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken"

export class LoginController {
    async login(req: Request, res: Response) {
        const { email, senha } = req.body

        if (!email || !senha || typeof email !== 'string' || typeof senha !== 'string') {
            return res.status(400).json({
                mensagem: "Todos os campos são obrigatórios"
            })
        }

        try {
            const userRepository = new UserRepository()
            const emailExiste = await userRepository.findByEmail(email)

            if (!emailExiste) {
                return res.status(400).json({
                    mensagem: "E-mail ou senha inválidos"
                })
            }

            const validarSenha = await bcrypt.compare(senha, emailExiste.senha)

            if (!validarSenha) {
                return res.status(400).json({
                    mensagem: "E-mail ou senha inválidos"
                })
            }

            const token = Jwt.sign({ id: emailExiste.id }, process.env.SECRET_JWT as string, {
                expiresIn: '20d'
            })

            return res.status(200).json({
                token: token
            })

        } catch (error) {
            const erro = error as Error
            return res.status(500).json({
                mensagem: erro.message
            })
        }
    }
}