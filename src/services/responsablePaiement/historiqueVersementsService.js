const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class HistoriqueVersementsService {
  async getHistoriqueVersements(commandeId) {
    return await prisma.paiement.findMany({
      where: { commandeId: Number(commandeId) },
      orderBy: { dateVersement: 'desc' },
    });
  }
}

module.exports = new HistoriqueVersementsService();
