const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const {
  create,
  findAll,
  annuler
} = require('../../controllers/responsableAchat/commandeFournisseurController');

/**
 * @swagger
 * tags:
 *   name: Commandes Fournisseurs
 *   description: Opérations du Responsable Achat
 */

// Appliquer l'authentification à toutes les routes de ce module
router.use(authMiddleware);

/**
 * @swagger
 * /api/responsable-achat/commandes:
 *   post:
 *     summary: Enregistrer une commande fournisseur
 *     tags: [Commandes Fournisseurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fournisseurId
 *               - produits
 *               - dateLivraisonPrevue
 *             properties:
 *               fournisseurId:
 *                 type: integer
 *                 example: 1
 *               dateLivraisonPrevue:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-01
 *               produits:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [produitId, quantite, prixAchat]
 *                   properties:
 *                     produitId:
 *                       type: integer
 *                       example: 2
 *                     quantite:
 *                       type: integer
 *                       example: 10
 *                     prixAchat:
 *                       type: number
 *                       example: 5000.0
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/commandes', create);

/**
 * @swagger
 * /api/responsable-achat/commandes:
 *   get:
 *     summary: Lister toutes les commandes fournisseur (avec filtres)
 *     tags: [Commandes Fournisseurs]
 *     parameters:
 *       - in: query
 *         name: statut
 *         schema:
 *           type: string
 *           enum: [EN_COURS, LIVRE, PAYE]
 *         description: Filtrer par statut
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de début (filtre par dateCommande)
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *         description: Date de fin (filtre par dateCommande)
 *     responses:
 *       200:
 *         description: Liste des commandes
 *       500:
 *         description: Erreur serveur
 */
router.get('/commandes', findAll);

/**
 * @swagger
 * /api/responsable-achat/commandes/{id}/annuler:
 *   put:
 *     summary: Annuler une commande fournisseur
 *     tags: [Commandes Fournisseurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la commande à annuler
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Commande annulée avec succès
 *       400:
 *         description: Erreur de traitement
 */
router.put('/commandes/:id/annuler', annuler);

module.exports = router;
