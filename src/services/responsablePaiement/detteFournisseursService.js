const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class DetteFournisseursService {
  async getDetteTotaleFournisseurs() {
    // Récupérer tous les fournisseurs avec leurs commandes et paiements
    const fournisseurs = await prisma.fournisseur.findMany({
      include: {
        commandes: {
          include: { paiements: true }
        }
      }
    });

    // Calculer la dette (montantTotal - somme paiements) par fournisseur
    return fournisseurs.map(fournisseur => {
      const totalDette = fournisseur.commandes.reduce((sumCmd, cmd) => {
        const totalVerse = cmd.paiements.reduce((sumPay, p) => sumPay + p.montant, 0);
        return sumCmd + (cmd.montantTotal - totalVerse);
      }, 0);

      return {
        fournisseurId: fournisseur.id,
        fournisseurNom: fournisseur.nom,
        detteTotale: totalDette
      };
    });
  }
}

module.exports = new DetteFournisseursService();
