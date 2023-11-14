import { Repository, getRepository } from "typeorm";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarImage } from "../entities/CarImage";
import { deleteFile } from "@utils/file";

class CarsImagesRepository implements ICarsImagesRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<CarImage> {
        const carImage = this.repository.create({
            car_id,
            image_name,
        });

        await this.repository.save(carImage);

        return carImage;
    }

    async delete(id: string): Promise<void> {
        const carImage = await this.repository.findOne(id);
        const { image_name } = carImage;

        await this.repository.delete(id);
        await deleteFile(`./tmp/cars/${image_name}`);
    }
}

export { CarsImagesRepository };
