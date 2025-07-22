// src/controllers/responsableAchat/commandeFournisseurController.js

const commandeFournisseurService = require('../../services/responsableAchat/commandeFournisseurService.js');

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const result = await commandeFournisseurService.creerCommande(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    // On récupère les filtres depuis les query params
    const { start, end, statut } = req.query;
    // Appeler le service avec les filtres pour lister ou filtrer
    const commandes = await commandeFournisseurService.filtrerCommandes({
      dateDebut: start,
      dateFin: end,
      statut
    });
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.annuler = async (req, res) => {
  try {
    const commandeId = parseInt(req.params.id);
    const result = await commandeFournisseurService.annulerCommande(commandeId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
