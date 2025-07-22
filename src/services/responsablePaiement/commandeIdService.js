const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CommandeIdService {
  async getCommandeById(id) {
    const commande = await prisma.commandeFournisseur.findUnique({
      where: { id: Number(id) },
      include: {
        produits: true,
        paiements: true,
        fournisseur: true
      },
    });
    if (!commande) throw new Error('Commande non trouvée');
    return commande;
  }
}

module.exports = new CommandeIdService();
