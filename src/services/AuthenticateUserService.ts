import { getCustomRepository } from "typeorm"
import { compare} from "bcryptjs"
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"




interface IAuthenticateRequest {
    email: string,
    password: string
}

class AuthenticateUserService {

    async execute({ email, password}: IAuthenticateRequest) {
        const userRepository = getCustomRepository(UsersRepositories)

        //Verificar se email existe
        const user = await userRepository.findOne({
            email
        })
        if(!user) {
            throw new Error ("Email or Password Incorrect")
        }

        //Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new Error ("Email or Password Incorrect")
        }

        //Gerar Token
        const token = await sign({
            email: user.email
        }, "5d461e84f7c7de555c99cfc20880b098", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token

    }
}

export { AuthenticateUserService}