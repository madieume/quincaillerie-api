const jwt = require('jsonwebtoken');

// Simuler une base utilisateurs en mémoire
const users = [];

// Secret JWT (à déplacer en variable d'environnement dans un vrai projet)
const JWT_SECRET = 'votre_clé_secrète';

exports.register = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  // Vérifier si utilisateur existe déjà
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Utilisateur déjà existant' });
  }

  // Ajouter nouvel utilisateur
  const newUser = {
    id: users.length + 1,
    email,
    mot_de_passe, 
  };
  users.push(newUser);

  res.status(201).json({ message: 'Utilisateur créé avec succès' });
};

exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;
  const user = users.find(u => u.email === email && u.mot_de_passe === mot_de_passe);

  if (!user) {
    return res.status(401).json({ error: 'Identifiants invalides' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
