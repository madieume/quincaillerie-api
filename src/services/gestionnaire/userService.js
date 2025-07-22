// Simule une base de données locale pour l'exemple
const utilisateurs = [
  {
    nom: 'Admin Principal',
    email: 'admin@mail.com',
    motDePasse: 'admin123',
    role: 'admin'
  },
  {
    nom: 'Utilisateur Test',
    email: 'test@mail.com',
    motDePasse: 'test123',
    role: 'user'
  }
];

// Fonction pour trouver un utilisateur par email
exports.findUserByEmail = (email) => {
  return utilisateurs.find(user => user.email === email);
};
