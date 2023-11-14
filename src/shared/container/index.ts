import { container } from "tsyringe";

import "@shared/container/providers";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";

import { ICarsRepository } from "@modules/cars/repositories/ICarRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";

import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IStorageProvider } from "./providers/StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "./providers/StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./providers/StorageProvider/implementations/S3StorageProvider";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository,
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository,
);

container.registerSingleton<IRentalRepository>(
    "RentalsRepository",
    RentalsRepository,
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository,
);
