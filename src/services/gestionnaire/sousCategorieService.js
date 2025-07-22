const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SousCategorieService {
  async getAll() {
    return await prisma.sousCategorie.findMany({
      where: { deletedAt: null },
      include: { categorie: true }
    });
  }

  async getById(id) {
    return await prisma.sousCategorie.findUnique({
      where: { id: Number(id) },
    });
  }

  async create(data) {
    return await prisma.sousCategorie.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.sousCategorie.update({
      where: { id: Number(id) },
      data,
    });
  }

  async softDelete(id) {
    return await prisma.sousCategorie.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  }
}

module.exports = new SousCategorieService();
