import {Request, Response, NextFunction} from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    //Receber o token
    const authToken = request.headers.authorization
    

     //Validar se o token está preenchido

     if(!authToken) {
        return response.status(401).end()
    }

    const [,token] = authToken.split(" ")

    //Validar se token é valido

    try {
        const {sub} = verify(token, "5d461e84f7c7de555c99cfc20880b098") as IPayload

        //Receber informações do usuario
        request.user_id = sub

        return next()
    } catch(err) {
        return response.status(401).end()
    }


}