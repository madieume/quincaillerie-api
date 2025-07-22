const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Quincaillerie',
      version: '1.0.0',
      description: "Documentation de l'API pour la gestion d'une quincaillerie",
    },
    components: {
      schemas: {
        // Catégories
        Categorie: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nom: { type: 'string', example: 'Fer' },
            description: { type: 'string', example: 'Catégorie ferraille' },
            deletedAt: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        CategorieInput: {
          type: 'object',
          required: ['nom'],
          properties: {
            nom: { type: 'string', example: 'Fer' },
            description: { type: 'string', example: 'Catégorie ferraille' }
          }
        },

        // Sous-catégories
        SousCategorie: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nom: { type: 'string', example: 'Tubes' },
            categorieId: { type: 'integer', example: 1 },
            deletedAt: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        SousCategorieInput: {
          type: 'object',
          required: ['nom', 'categorieId'],
          properties: {
            nom: { type: 'string', example: 'Tubes' },
            categorieId: { type: 'integer', example: 1 }
          }
        },

        // Fournisseurs
        Fournisseur: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            numero: { type: 'string', example: 'F001' },
            nom: { type: 'string', example: 'Sen Matériaux' },
            adresse: { type: 'string', example: 'Dakar' },
            deletedAt: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        FournisseurInput: {
          type: 'object',
          required: ['numero', 'nom', 'adresse'],
          properties: {
            numero: { type: 'string', example: 'F001' },
            nom: { type: 'string', example: 'Sen Matériaux' },
            adresse: { type: 'string', example: 'Dakar' }
          }
        },

        // Produits
        Produit: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            code: { type: 'string', example: 'P001' },
            designation: { type: 'string', example: 'Fer à béton' },
            stock: { type: 'integer', example: 100 },
            prixUnitaire: { type: 'number', format: 'float', example: 2000 },
            image: { type: 'string', example: 'http://image.url/fer.jpg' },
            sousCategorieId: { type: 'integer', example: 1 },
            deletedAt: { type: 'string', format: 'date-time', nullable: true }
          }
        },
        ProduitInput: {
          type: 'object',
          required: ['code', 'designation', 'stock', 'prixUnitaire', 'sousCategorieId'],
          properties: {
            code: { type: 'string', example: 'P001' },
            designation: { type: 'string', example: 'Fer à béton' },
            stock: { type: 'integer', example: 100 },
            prixUnitaire: { type: 'number', format: 'float', example: 2000 },
            image: { type: 'string', example: 'http://image.url/fer.jpg' },
            sousCategorieId: { type: 'integer', example: 1 }
          }
        },

        // Utilisateurs
        Utilisateur: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nom: { type: 'string', example: 'Jean Dupont' },
            email: { type: 'string', example: 'jean@example.com' },
            password: { type: 'string', example: 'hashedpassword123' },
            role: { type: 'string', enum: ['GESTIONNAIRE', 'ACHAT', 'PAIEMENT'], example: 'ACHAT' }
          }
        },
        UtilisateurInput: {
          type: 'object',
          required: ['nom', 'email', 'password', 'role'],
          properties: {
            nom: { type: 'string', example: 'Jean Dupont' },
            email: { type: 'string', example: 'jean@example.com' },
            password: { type: 'string', example: 'password123' },
            role: { type: 'string', enum: ['GESTIONNAIRE', 'ACHAT', 'PAIEMENT'], example: 'ACHAT' }
          }
        },

        // Commande Fournisseur (Responsable Achat)
        CommandeFournisseur: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            dateCommande: { type: 'string', format: 'date-time', example: '2025-07-20T10:30:00Z' },
            montantTotal: { type: 'number', format: 'float', example: 150000.50 },
            dateLivraisonPrevue: { type: 'string', format: 'date-time', example: '2025-07-25T00:00:00Z', nullable: true },
            dateLivraisonReelle: { type: 'string', format: 'date-time', example: '2025-07-26T00:00:00Z', nullable: true },
            statut: { type: 'string', enum: ['EN_COURS', 'LIVRE', 'PAYE'], example: 'EN_COURS' },
            fournisseurId: { type: 'integer', example: 1 },
            produits: {
              type: 'array',
              items: { $ref: '#/components/schemas/CommandeProduit' }
            }
          }
        },
        CommandeFournisseurInput: {
          type: 'object',
          required: ['dateCommande', 'montantTotal', 'fournisseurId', 'produits'],
          properties: {
            dateCommande: { type: 'string', format: 'date-time', example: '2025-07-20T10:30:00Z' },
            montantTotal: { type: 'number', format: 'float', example: 150000.50 },
            dateLivraisonPrevue: { type: 'string', format: 'date-time', example: '2025-07-25T00:00:00Z' },
            fournisseurId: { type: 'integer', example: 1 },
            produits: {
              type: 'array',
              items: { $ref: '#/components/schemas/CommandeProduitInput' }
            }
          }
        },

        CommandeProduit: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            commandeId: { type: 'integer', example: 1 },
            produitId: { type: 'integer', example: 1 },
            quantite: { type: 'integer', example: 10 },
            prixAchat: { type: 'number', format: 'float', example: 15000 }
          }
        },
        CommandeProduitInput: {
          type: 'object',
          required: ['produitId', 'quantite', 'prixAchat'],
          properties: {
            produitId: { type: 'integer', example: 1 },
            quantite: { type: 'integer', example: 10 },
            prixAchat: { type: 'number', format: 'float', example: 15000 }
          }
        },

        // Paiement (Responsable Paiement)
        Paiement: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            commandeId: { type: 'integer', example: 5 },
            numeroVersement: { type: 'string', example: 'V1' },
            montant: { type: 'number', format: 'float', example: 50000.0 },
            dateVersement: { type: 'string', format: 'date-time', example: '2025-07-20T15:30:00Z' }
          }
        },

        MontantRestantCommande: {
          type: 'object',
          properties: {
            commandeId: { type: 'integer', example: 5 },
            montantTotal: { type: 'number', format: 'float', example: 150000.0 },
            montantPayé: { type: 'number', format: 'float', example: 100000.0 },
            montantRestant: { type: 'number', format: 'float', example: 50000.0 }
          }
        },

        DetteFournisseur: {
          type: 'object',
          properties: {
            fournisseurId: { type: 'integer', example: 2 },
            nomFournisseur: { type: 'string', example: 'Sen Matériaux' },
            detteTotale: { type: 'number', format: 'float', example: 200000.0 }
          }
        }
      },

      parameters: {
        categorieIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID de la catégorie',
          schema: { type: 'integer', example: 1 }
        },
        sousCategorieIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID de la sous-catégorie',
          schema: { type: 'integer', example: 1 }
        },
        fournisseurIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID du fournisseur',
          schema: { type: 'integer', example: 1 }
        },
        produitIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID du produit',
          schema: { type: 'integer', example: 1 }
        },
        utilisateurIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          description: "ID de l'utilisateur",
          schema: { type: 'integer', example: 1 }
        },
        commandeFournisseurIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID de la commande fournisseur',
          schema: { type: 'integer', example: 1 }
        },

        paiementIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          description: "ID du paiement",
          schema: { type: 'integer', example: 1 }
        },

        commandeIdParam: {
          name: 'id',
          in: 'path',
          required: true,
          description: "ID de la commande",
          schema: { type: 'integer', example: 5 }
        }
      },

      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/**/*.js'], // chemins vers tes fichiers routes annotés swagger
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
