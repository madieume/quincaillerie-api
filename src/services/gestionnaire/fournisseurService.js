const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FournisseurService {
  async getAll() {
    return await prisma.fournisseur.findMany({
      where: { deletedAt: null },
    });
  }

  async getById(id) {
    return await prisma.fournisseur.findUnique({
      where: { id: Number(id) },
    });
  }

  async create(data) {
    return await prisma.fournisseur.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.fournisseur.update({
      where: { id: Number(id) },
      data,
    });
  }

  async softDelete(id) {
    return await prisma.fournisseur.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  }
}

module.exports = new FournisseurService();
