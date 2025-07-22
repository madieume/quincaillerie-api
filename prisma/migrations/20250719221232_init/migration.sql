-- CreateEnum
CREATE TYPE "StatutCommande" AS ENUM ('EN_COURS', 'LIVRE', 'PAYE');

-- CreateEnum
CREATE TYPE "RoleUtilisateur" AS ENUM ('GESTIONNAIRE', 'ACHAT', 'PAIEMENT');

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SousCategorie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "deletedAt" TIMESTAMP(3),
    "categorieId" INTEGER NOT NULL,

    CONSTRAINT "SousCategorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "deletedAt" TIMESTAMP(3),
    "sousCategorieId" INTEGER NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandeFournisseur" (
    "id" SERIAL NOT NULL,
    "dateCommande" TIMESTAMP(3) NOT NULL,
    "montantTotal" DOUBLE PRECISION NOT NULL,
    "dateLivraisonPrevue" TIMESTAMP(3),
    "dateLivraisonReelle" TIMESTAMP(3),
    "statut" "StatutCommande" NOT NULL,
    "fournisseurId" INTEGER NOT NULL,

    CONSTRAINT "CommandeFournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandeProduit" (
    "id" SERIAL NOT NULL,
    "commandeId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prixAchat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CommandeProduit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "commandeId" INTEGER NOT NULL,
    "numeroVersement" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "dateVersement" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleUtilisateur" NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produit_code_key" ON "Produit"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_numero_key" ON "Fournisseur"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "SousCategorie" ADD CONSTRAINT "SousCategorie_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_sousCategorieId_fkey" FOREIGN KEY ("sousCategorieId") REFERENCES "SousCategorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeFournisseur" ADD CONSTRAINT "CommandeFournisseur_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeProduit" ADD CONSTRAINT "CommandeProduit_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "CommandeFournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandeProduit" ADD CONSTRAINT "CommandeProduit_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "CommandeFournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
