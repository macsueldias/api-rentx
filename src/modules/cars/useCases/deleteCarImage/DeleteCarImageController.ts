import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCarImageUseCase } from "./DeleteCarImageUseCase";

class DeleteCarImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { image_name } = request.body;

        const deleteCarImageUseCase = container.resolve(DeleteCarImageUseCase);

        deleteCarImageUseCase.execute({ id });

        return response.status(202).send();
    }
}

export { DeleteCarImageController };
