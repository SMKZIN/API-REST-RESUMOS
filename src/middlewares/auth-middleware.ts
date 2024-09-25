import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken"
import { UserRepository } from "../repositories/user-repository"
import TRequest from "../types/TRequest"



export const authMideleware = async (req: TRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      mensagem: "Falha na autenticação"
    })
  }

  const token = authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      mensagem: "Falha na autenticação"
    })
  }

  try {
    jwt.verify(token, process.env.SECRET_JWT as string, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          mensagem: "Falha na autenticação"
        })
      }

      const userRepository = new UserRepository()
      const payload = decoded as JwtPayload
      const usuario = await userRepository.findById(Number(payload.id))

      // if (!usuario) {
      //   return res.status(408).json({
      //     mensagem: "Falha na autenticação"
      //   })
      // }
      req.userId = payload.id

      next()
    })
  } catch (error) {
    const erro = error as Error
    if (error instanceof TokenExpiredError) {
      return res.status(403).json({
        mensagem: "Falha na autenticação"
      })
    }
    return res.status(500).json({
      mensagem: erro.message
    })
  }

}