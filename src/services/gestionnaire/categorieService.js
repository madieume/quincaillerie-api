// src/services/gestionnaire/categorie.service.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategorieService {
  async getAll() {
    return await prisma.categorie.findMany({
      where: { deletedAt: null },
    });
  }

  async getById(id) {
    return await prisma.categorie.findUnique({
      where: { id: Number(id) },
    });
  }

  async create(data) {
    return await prisma.categorie.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.categorie.update({
      where: { id: Number(id) },
      data,
    });
  }

  async softDelete(id) {
    return await prisma.categorie.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  }
}

module.exports = new CategorieService();
