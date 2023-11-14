import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
}

@injectable()
class DeleteCarImageUseCase {
    constructor(
        @inject("CarsImagesRepository")
        private repository: ICarsImagesRepository,
    ) {}
    async execute({ id }: IRequest) {
        this.repository.delete(id);
    }
}

export { DeleteCarImageUseCase };
