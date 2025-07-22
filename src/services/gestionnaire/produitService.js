const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProduitService {
  async getAll() {
    return await prisma.produit.findMany({
      where: { deletedAt: null },
      include: { sousCategorie: true }
    });
  }

  async getById(id) {
    return await prisma.produit.findUnique({
      where: { id: Number(id) },
    });
  }

  async create(data) {
    return await prisma.produit.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.produit.update({
      where: { id: Number(id) },
      data,
    });
  }

  async softDelete(id) {
    return await prisma.produit.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  }
}

module.exports = new ProduitService();
