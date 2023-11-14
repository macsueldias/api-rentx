import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRespositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(2, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory,
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "XX5-1234",
            fine_amount: 30,
            category_id: "1234",
            brand: "brand test",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it(" should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            expected_return_date: dayAdd24Hours,
            user_id: "12345",
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            }),
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it(" should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1111",
            expected_return_date: dayAdd24Hours,
            user_id: "12345",
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            }),
        ).rejects.toEqual(
            new AppError("There's a rental in progress for user!"),
        );
    });

    it("should not be able to create a new rental with invalid return time", async () => {
        await expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "ak@#$dsafj234çsd",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toEqual(new AppError("Invalid return time!"));
    });
});
