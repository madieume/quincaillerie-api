const montantRestantService = require('../../services/responsablePaiement/montantRestantService');

exports.getMontantRestant = async (req, res) => {
  try {
    const commandeId = parseInt(req.params.id);
    const montantRestant = await montantRestantService.getMontantRestant(commandeId);
    res.json({ montantRestant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
