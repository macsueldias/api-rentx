import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "fasfdsjf234242",
            fine_amount: 123,
            brand: "Ford",
            category_id: "asdlfmasdfm",
        });

        expect(car).toHaveProperty("id");
    });

    it("should be able to create a car with exists license plate", async () => {
        await createCarUseCase.execute({
            name: "Name Car1",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "fasfdsjf234242",
            fine_amount: 123,
            brand: "Ford",
            category_id: "asdlfmasdfm",
        });
        await expect(
            createCarUseCase.execute({
                name: "Name Car2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "fasfdsjf234242",
                fine_amount: 123,
                brand: "Ford",
                category_id: "asdlfmasdfm",
            }),
        ).rejects.toEqual(new AppError("Car already exists!"));
    });

    it("should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Available",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "fasfdsjf234242",
            fine_amount: 123,
            brand: "Ford",
            category_id: "asdlfmasdfm",
        });

        expect(car.available).toBe(true);
    });
});
