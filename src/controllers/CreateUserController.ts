import { CreateUserService } from "../services/CreateUserService"
import {Request, Response} from "express"


class CreateUserController {

    async handle( request: Request, response: Response) {
        const { name, email, admin, password } = request.body

        const createUserService = new CreateUserService()

        const user = await createUserService.execute({ name, email, admin, password })

        return response.json(user)
    }
}

export { CreateUserController }