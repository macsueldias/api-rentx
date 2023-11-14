import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory,
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro 1",
            description: "Car description",
            brand: "Car Brand",
            daily_rate: 34,
            fine_amount: 40,
            license_plate: "XXXXX",
            category_id: "1c538833-aa63-4eb7-aaca-991629459ff5",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available to cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro 2",
            description: "Car description",
            brand: "Car Brand Test",
            daily_rate: 34,
            fine_amount: 40,
            license_plate: "XXXXX",
            category_id: "1c538833-aa63-4eb7-aaca-991629459ff5",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car Brand Test",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available to cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro 3",
            description: "Car description",
            brand: "Car Brand Test",
            daily_rate: 34,
            fine_amount: 40,
            license_plate: "XXXXX",
            category_id: "1c538833-aa63-4eb7-aaca-991629459ff5",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Carro 3",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available to cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro 4",
            description: "Car description",
            brand: "Car Brand Test",
            daily_rate: 34,
            fine_amount: 40,
            license_plate: "XXXXX",
            category_id: "12345",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    });
});
