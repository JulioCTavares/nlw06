import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentRepositories"


class ListUserReceiveComplimentService {

    async execute(user_id: string) {

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

        const compliment = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            },
        })

        return compliment
    }
}

export { ListUserReceiveComplimentService }