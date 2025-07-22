const detteFournisseursService = require('../../services/responsablePaiement/detteFournisseursService');

exports.getDetteTotaleFournisseurs = async (req, res) => {
  try {
    const dette = await detteFournisseursService.getDetteTotaleFournisseurs();
    res.json({ dette });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
