const commandesEnCoursService = require('../../services/responsablePaiement/commandes-en-coursService');

exports.getCommandesEnCours = async (req, res) => {
  try {
    const commandes = await commandesEnCoursService.getCommandesEnCours();
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
