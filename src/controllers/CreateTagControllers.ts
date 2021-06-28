import {Request, Response} from "express"
import {CreateTagsService} from "../services/CreateTagsService"

class CreateTagControllers {

    async handle(request: Request, response: Response) {
        const { name } = request.body
        const createTagService = new CreateTagsService()

        const tag = await createTagService.execute(name)

        return response.json(tag)
    }
}

export {CreateTagControllers}