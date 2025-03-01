import { Repository, getRepository } from "typeorm";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";
import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };
