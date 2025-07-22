// src/controllers/gestionnaire/categorieController.js

const CategorieService = require('../../services/gestionnaire/categorieService.js');

exports.create = async (req, res) => {
  const result = await CategorieService.create(req.body);
  res.status(201).json(result);
};

exports.findAll = async (req, res) => {
  try {
    const result = await CategorieService.getAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await CategorieService.update(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.archive = async (req, res) => {
  try {
    const result = await CategorieService.softDelete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
