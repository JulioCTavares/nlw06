import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"



interface IComplimentRequest {
    tag_id: string,
    user_sender: string,
    user_receiver: string,
    message: string
}

class CreateComplimentsService {

    async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest) {
        const complimentRepository = getCustomRepository(ComplimentsRepositories)
        const userRepository = getCustomRepository(UsersRepositories)
        
        if (user_sender === user_receiver) {
            throw new Error ("Current User Receiver")
        }

        const userReceiverExist = await userRepository.findOne(user_receiver)

        if (!userReceiverExist) {
            throw new Error ("User Receiver does not exist")
        }

        const compliment = complimentRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentRepository.save(compliment)

        return compliment

    }
}

export { CreateComplimentsService }