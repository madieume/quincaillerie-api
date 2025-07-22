const SousCategorieService = require('../../services/gestionnaire/sousCategorieService.js');

exports.create = async (req, res) => {
  try {
    const result = await SousCategorieService.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const result = await SousCategorieService.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await SousCategorieService.update(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.archive = async (req, res) => {
  try {
    const result = await SousCategorieService.softDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
