const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const {
  create,
  findAll,
  archive
} = require('../../controllers/gestionnaire/produitController');

router.use(authMiddleware);

/**
 * @swagger
 * /api/produits:
 *   get:
 *     summary: Liste des produits
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Liste des produits
 */
router.get('/', findAll);

/**
 * @swagger
 * /api/produits:
 *   post:
 *     summary: Créer un nouveau produit
 *     tags: [Produits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - designation
 *               - stock
 *               - prixUnitaire
 *               - sousCategorieId
 *             properties:
 *               code:
 *                 type: string
 *               designation:
 *                 type: string
 *               stock:
 *                 type: integer
 *               prixUnitaire:
 *                 type: number
 *               image:
 *                 type: string
 *               sousCategorieId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', create);

/**
 * @swagger
 * /api/produits/{id}/archive:
 *   put:
 *     summary: Archiver un produit
 *     tags: [Produits]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à archiver
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Archivé avec succès
 *       404:
 *         description: Non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id/archive', archive);

module.exports = router;
