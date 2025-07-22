const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Routes Gestionnaire
const categorieRoutes = require('./gestionnaire/categorieRoutes');
const sousCategorieRoutes = require('./gestionnaire/sousCategorieRoutes');
const produitRoutes = require('./gestionnaire/produitRoutes');
const fournisseurRoutes = require('./gestionnaire/fournisseurRoutes');

// Routes Responsable Achat
const responsableAchatRoutes = require('./responsableAchat/commandeFournisseurRoutes');

// Routes Responsable Paiement
const responsablePaiementRoutes = require('./responsablePaiement/responsablePaiementRoutes');

// Middleware global d'authentification
router.use(authMiddleware);

// Routes pour le gestionnaire
router.use('/categories', categorieRoutes);
router.use('/sous-categories', sousCategorieRoutes);
router.use('/produits', produitRoutes);
router.use('/fournisseurs', fournisseurRoutes);

// Routes pour le responsable achat
router.use('/responsable-achat', responsableAchatRoutes);

// Routes pour le responsable paiement
router.use('/responsable-paiement', responsablePaiementRoutes);

module.exports = router;
