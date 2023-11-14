import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create({
        name,
        description,
        brand,
        category_id,
        fine_amount,
        license_plate,
        daily_rate,
        specifications,
    }: ICreateCarDTO): Promise<Car>;

    findByLicensePlate(license_plate: string): Promise<Car>;

    findAvailable(
        brand?: string,
        category_id?: string,
        name?: string,
    ): Promise<Car[]>;

    findById(id: string): Promise<Car>;

    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
