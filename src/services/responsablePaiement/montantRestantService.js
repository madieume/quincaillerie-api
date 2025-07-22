const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MontantRestantService {
  async getMontantRestant(commandeId) {
    const commande = await prisma.commandeFournisseur.findUnique({
      where: { id: Number(commandeId) },
      include: { paiements: true },
    });
    if (!commande) throw new Error('Commande non trouvée');

    const totalVerse = commande.paiements.reduce((sum, p) => sum + p.montant, 0);
    return commande.montantTotal - totalVerse;
  }
}

module.exports = new MontantRestantService();
