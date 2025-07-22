const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');

const commandeIdController = require('../../controllers/responsablePaiement/commandeIdController');
const commandesEnCoursController = require('../../controllers/responsablePaiement/commandes-en-coursController');
const historiqueVersementsController = require('../../controllers/responsablePaiement/historiqueVersementsController');
const montantRestantController = require('../../controllers/responsablePaiement/montantRestantController');
const detteFournisseursController = require('../../controllers/responsablePaiement/detteFournisseursController');

/**
 * @swagger
 * tags:
 *   name: Responsable Paiement
 *   description: Opérations du Responsable Paiement
 */

// Middleware d'authentification appliqué à toutes les routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/responsable-paiement/commandes-en-cours:
 *   get:
 *     summary: Lister les commandes en cours (non entièrement payées)
 *     tags: [Responsable Paiement]
 *     responses:
 *       200:
 *         description: Liste des commandes en cours avec leur montant restant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MontantRestantCommande'
 *       500:
 *         description: Erreur serveur
 */
router.get('/commandes-en-cours', commandesEnCoursController.getCommandesEnCours);

/**
 * @swagger
 * /api/responsable-paiement/commandes/{id}/versements:
 *   get:
 *     summary: Voir l’historique des versements pour une commande
 *     tags: [Responsable Paiement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la commande
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historique des versements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paiement'
 *       400:
 *         description: Erreur de traitement
 */
router.get('/commandes/:id/versements', historiqueVersementsController.getHistoriqueVersements);

/**
 * @swagger
 * /api/responsable-paiement/commandes/{id}/montant-restant:
 *   get:
 *     summary: Calculer le montant restant à payer sur une commande
 *     tags: [Responsable Paiement]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la commande
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Montant restant à payer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MontantRestantCommande'
 *       400:
 *         description: Erreur de traitement
 */
router.get('/commandes/:id/montant-restant', montantRestantController.getMontantRestant);

/**
 * @swagger
 * /api/responsable-paiement/dette-fournisseurs:
 *   get:
 *     summary: Calculer la dette totale à chaque fournisseur
 *     tags: [Responsable Paiement]
 *     responses:
 *       200:
 *         description: Dette totale par fournisseur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetteFournisseur'
 *       500:
 *         description: Erreur serveur
 */
router.get('/dette-fournisseurs', detteFournisseursController.getDetteTotaleFournisseurs);

module.exports = router;
