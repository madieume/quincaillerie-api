const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CommandesEnCoursService {
  // Récupère les commandes où le total payé est < montantTotal
  async getCommandesEnCours() {
    const commandes = await prisma.commandeFournisseur.findMany({
      where: {
        statut: { not: 'PAYE' }
      },
      include: {
        paiements: true,
      },
      orderBy: { dateCommande: 'desc' },
    });
    // Optionnel: filtre côté code pour vérifier si paiement total < montantTotal
    return commandes.filter(cmd => {
      const totalVerse = cmd.paiements.reduce((sum, p) => sum + p.montant, 0);
      return totalVerse < cmd.montantTotal;
    });
  }
}

module.exports = new CommandesEnCoursService();
