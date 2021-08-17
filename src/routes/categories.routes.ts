import { Router } from "express";

import { CateroriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CateroriesRepository();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);
    if (categoryAlreadyExists) {
        return response.status(400).json({ error: "Category already exists" });
    }

    categoriesRepository.create({ name, description });
    return response
        .status(201)
        .json({ message: "Cadastro realizado com sucesso" });
});

categoriesRoutes.get("/", (request, response) => {
    const all = categoriesRepository.list();
    return response.json(all);
});

export { categoriesRoutes };
