const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CommandeFournisseurService {
  // Créer une commande fournisseur
  async creerCommande(data) {
    return await prisma.commandeFournisseur.create({
      data: {
        dateCommande: new Date(),
        statut: 'EN_ATTENTE',
        fournisseurId: Number(data.fournisseurId),
        ligneCommandes: {
          create: data.lignes.map((ligne) => ({
            produitId: Number(ligne.produitId),
            quantite: Number(ligne.quantite),
            prixUnitaire: Number(ligne.prixUnitaire),
          })),
        },
      },
      include: {
        ligneCommandes: true,
      },
    });
  }

  // Lister toutes les commandes
  async listerCommandes() {
    return await prisma.commandeFournisseur.findMany({
      orderBy: { dateCommande: 'desc' },
      include: { ligneCommandes: true, fournisseur: true },
    });
  }

  // Annuler une commande (soft delete ou statut)
  async annulerCommande(id) {
    const commande = await prisma.commandeFournisseur.findUnique({ where: { id: Number(id) } });

    if (!commande) throw new Error('Commande non trouvée');

    return await prisma.commandeFournisseur.update({
      where: { id: Number(id) },
      data: { statut: 'ANNULEE' },
    });
  }

  // Filtrer les commandes par date et/ou statut
  async filtrerCommandes({ dateDebut, dateFin, statut }) {
    const conditions = {};

    if (dateDebut && dateFin) {
      conditions.dateCommande = {
        gte: new Date(dateDebut),
        lte: new Date(dateFin),
      };
    }

    if (statut) {
      conditions.statut = statut;
    }

    return await prisma.commandeFournisseur.findMany({
      where: conditions,
      orderBy: { dateCommande: 'desc' },
      include: { ligneCommandes: true, fournisseur: true },
    });
  }
}

module.exports = new CommandeFournisseurService();
