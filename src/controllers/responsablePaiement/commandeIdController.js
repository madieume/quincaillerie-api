const commandeIdService = require('../../services/responsablePaiement/commandeIdService');

exports.getVersementsByCommandeId = async (req, res) => {
  try {
    const commandeId = parseInt(req.params.id);
    const versements = await commandeIdService.getVersementsByCommandeId(commandeId);
    res.json(versements);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
