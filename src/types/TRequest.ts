import { Request } from "express"

interface TRequest extends Request{
    userId?: number
  
}

export default TRequest