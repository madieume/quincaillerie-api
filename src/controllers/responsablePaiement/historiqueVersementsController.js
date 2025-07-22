const historiqueVersementsService = require('../../services/responsablePaiement/historiqueVersementsService');

exports.getHistoriqueVersements = async (req, res) => {
  try {
    const commandeId = parseInt(req.params.id);
    const historique = await historiqueVersementsService.getHistoriqueVersements(commandeId);
    res.json(historique);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
