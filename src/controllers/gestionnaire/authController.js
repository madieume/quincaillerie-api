const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { nom, email, password, role } = req.body;

  if (!nom || !email || !password || !role) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ message: "L'utilisateur existe déjà." });
    }

    // Créer l'utilisateur
    const nouvelUtilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        email,
        password,
        role
      }
    });

    return res.status(201).json({
      message: "Utilisateur créé avec succès",
      utilisateur: nouvelUtilisateur
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
