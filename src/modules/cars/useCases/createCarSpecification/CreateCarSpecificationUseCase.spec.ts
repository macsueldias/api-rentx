import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { AppError } from "@shared/errors/AppError";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;
describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory,
        );
    });

    it("should not be able to add a new specification to a now-existent car", async () => {
        const car_id = "1234";
        const specification_id = ["asdfasdf"];

        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specification_id,
            }),
        ).rejects.toEqual(new AppError("Car does not exist!"));
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "fasfdsjf234242",
            fine_amount: 123,
            brand: "Ford",
            category_id: "asdlfmasdfm",
        });

        const specification = await specificationRepositoryInMemory.create({
            description: "Test",
            name: "Test",
        });

        const specification_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specification_id,
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
