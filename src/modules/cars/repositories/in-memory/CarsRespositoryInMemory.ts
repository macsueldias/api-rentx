import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        brand,
        category_id,
        name,
        description,
        daily_rate,
        fine_amount,
        license_plate,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            brand,
            category_id,
            name,
            description,
            daily_rate,
            fine_amount,
            license_plate,
            specifications,
            id,
        });

        this.cars.push(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async findAvailable(
        brand: string,
        category_id: string,
        name: string,
    ): Promise<Car[]> {
        const all = this.cars.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
        });
        return all;
    }

    async findById(id: string): Promise<Car> {
        const car = this.cars.find((car) => car.id === id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === id);
        this.cars[findIndex].available = available;
    }
}

export { CarsRepositoryInMemory };
