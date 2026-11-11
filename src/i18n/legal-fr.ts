import type { LegalBundle } from "./legal-pages";

const COMPANY =
  "Lanzarote Experience Tours S.L.U., que opera comercialmente como Lanzarote Tours";
const ADDRESS =
  "Calle Calderetas, 100, 35550 San Bartolomé, Lanzarote (Las Palmas), España";
const CIF = "B76071836";
const LICENSE = "I-AV-0002407.1";
const EMAIL = "info@lanzaroteexperiencetours.com";
const SUPPORT = "support@lanzaroteexperiencetours.com";
const PHONE = "+34 646 08 05 85";

export const frLegal: LegalBundle = {
  privacy: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 9 septembre 2026",
    intro: `Cette politique explique comment ${COMPANY} traite les données personnelles des personnes qui visitent ce site ou y réservent. La marque publique est Lanzarote Tours ; le responsable du traitement est la société indiquée, avec les mêmes données fiscales et de contact.`,
    sections: [
      {
        heading: "1. Responsable du traitement",
        paragraphs: [
          `${COMPANY}. CIF ${CIF}. Siège social : ${ADDRESS}. Licence d'agence de voyages ${LICENSE}.`,
          `Contact : ${PHONE}, ${SUPPORT} et, pour exercer vos droits en matière de protection des données, ${EMAIL}.`,
        ],
      },
      {
        heading: "2. Données que nous collectons",
        paragraphs: [
          "Identité et contact : nom, prénom, adresse e-mail, téléphone (y compris l'indicatif international) et, le cas échéant, données de facturation.",
          "Réservation : date et heure du service, nombre de personnes, hôtel ou point de prise en charge, navire et port pour les réservations de croisière, observations et référence.",
          "Paiement : nous ne stockons pas le numéro complet de votre carte. L'encaissement est traité par des prestataires tels que Stripe ou PayPal. Nous conservons l'état du paiement, les montants et les références de transaction nécessaires à la facturation et au suivi des incidents.",
          "Données techniques : adresse IP, langue, type d'appareil et données de navigation ou cookies, comme décrit dans la politique de cookies.",
        ],
      },
      {
        heading: "3. Finalités et bases juridiques",
        paragraphs: [
          "Gérer devis, réservations, bons, factures, modifications et annulations (exécution d'un contrat ou mesures précontractuelles, art. 6.1.b du RGPD).",
          "Répondre aux demandes via le formulaire, l'e-mail, le téléphone, WhatsApp ou l'assistant du site (intérêt légitime ou, si vous nous écrivez, mesures précontractuelles).",
          "Respecter les obligations comptables, fiscales et de consommation (obligation légale, art. 6.1.c du RGPD).",
          "Envoyer des communications strictement opérationnelles concernant votre réservation. Nous ne vous enverrons pas de publicité sans votre consentement.",
        ],
      },
      {
        heading: "4. Destinataires",
        paragraphs: [
          "Guides, chauffeurs et prestataires nécessaires à l'exécution du service réservé (uniquement les données indispensables à la prise en charge et au déroulement de l'activité).",
          "Sous-traitants qui nous fournissent l'hébergement, la messagerie, le stockage, la passerelle de paiement ou les outils d'administration, avec les garanties exigées par le RGPD.",
          "Administrations publiques lorsqu'une norme l'impose.",
          "Nous ne vendons pas vos données et ne les cédons pas à des fins étrangères à la réservation ou au traitement de votre demande.",
        ],
      },
      {
        heading: "5. Conservation",
        paragraphs: [
          "Les données d'une réservation sont conservées pendant la relation contractuelle, puis pendant les délais légaux de facturation, de réclamation et d'obligations fiscales (en général, jusqu'à 6 ans pour la documentation commerciale).",
          "Les demandes sans réservation sont supprimées ou anonymisées lorsqu'elles ne sont plus nécessaires, sauf obligation légale de conserver une trace.",
        ],
      },
      {
        heading: "6. Transferts internationaux",
        paragraphs: [
          "Certains prestataires (par exemple les passerelles de paiement ou la messagerie) peuvent traiter des données en dehors de l'Espace économique européen. Dans ce cas, nous exigeons les clauses types de la Commission européenne ou une autre garantie adéquate du RGPD.",
        ],
      },
      {
        heading: "7. Vos droits",
        paragraphs: [
          "Vous pouvez demander l'accès, la rectification, l'effacement, la limitation, l'opposition et la portabilité, et retirer votre consentement lorsque celui-ci est la base juridique.",
          `Pour les exercer, écrivez à ${EMAIL} ou à ${ADDRESS}, en indiquant votre nom et le droit que vous souhaitez exercer. Nous pouvons demander une identification raisonnable.`,
          "Vous pouvez également introduire une réclamation auprès de l'Agence espagnole de protection des données (www.aepd.es).",
        ],
      },
      {
        heading: "8. Mineurs",
        paragraphs: [
          "Les réservations sont effectuées par un adulte. Les données des mineurs ne sont collectées que dans la mesure nécessaire à la place (âge ou catégorie tarifaire), sous la responsabilité de la personne qui réserve.",
        ],
      },
      {
        heading: "9. Sécurité et modifications",
        paragraphs: [
          "Nous appliquons des mesures techniques et organisationnelles raisonnables. Aucune transmission sur Internet n'est totalement sûre.",
          "Nous pouvons mettre à jour cette politique. La version en vigueur est celle publiée sur ce site, avec sa date de mise à jour.",
        ],
      },
    ],
  },
  terms: {
    title: "Conditions de réservation et d'annulation",
    updated: "Dernière mise à jour : 9 septembre 2026",
    intro: `Ces conditions régissent la réservation d'excursions, de transferts, d'activités et de services associés conclus via ce site avec ${COMPANY} (marque Lanzarote Tours).`,
    sections: [
      {
        heading: "1. Identification du professionnel",
        paragraphs: [
          `${COMPANY}. CIF ${CIF}. Adresse : ${ADDRESS}. Licence d'agence ${LICENSE}. Téléphone ${PHONE}. E-mail ${SUPPORT}.`,
        ],
      },
      {
        heading: "2. Objet",
        paragraphs: [
          "L'objet est l'intermédiation et/ou la prestation de visites guidées, de transferts privés, d'excursions pour croisiéristes et des autres services décrits sur chaque fiche. La langue, la durée, la taille maximale du groupe, la prise en charge et les inclusions sont ceux publiés au moment de la réservation.",
          "Sauf indication contraire, les excursions partagées se déroulent en petits groupes et nous ne mélangeons pas les langues dans le même groupe.",
        ],
      },
      {
        heading: "3. Processus de réservation",
        paragraphs: [
          "En finalisant une réservation, vous déclarez être majeur et que les données fournies sont exactes. Vous recevrez un e-mail avec la référence. Le bon et, le cas échéant, la facture sont émis selon le moyen de paiement.",
          "Certaines demandes (par exemple des groupes privés ou des dates soumises à un minimum de participants) peuvent rester en attente de confirmation par notre équipe.",
        ],
      },
      {
        heading: "4. Prix et paiement",
        paragraphs: [
          "Les prix incluent les taxes applicables (IGIC sauf indication contraire) et ce que décrit la fiche. Les entrées des sites peuvent être incluses ou non ; la fiche le précise.",
          "Vous pouvez payer par carte via une passerelle sécurisée (Stripe ou d'autres moyens activés), PayPal ou d'autres formes publiées. Pour certains services, un acompte est possible et le solde se règle le jour de l'activité, selon les conditions affichées lors de la réservation.",
          "Les factures sont émises pour les montants encaissés par carte, conformément à la réglementation fiscale. Le paiement en espèces le jour du service, lorsqu'il est autorisé, ne génère pas de facture pour ce montant s'il n'a pas été encaissé par voie électronique.",
        ],
      },
      {
        heading: "5. Prise en charge et ponctualité",
        paragraphs: [
          "Pour les séjours sur l'île, sauf si la fiche indique un point de rendez-vous, nous venons vous chercher à l'hébergement dans les zones touristiques habituelles. L'heure exacte est confirmée avant le service.",
          "Pour les réservations de croisière, le rendez-vous a lieu au quai indiqué, une fois le contrôle portuaire passé, avec une marge suffisante par rapport à l'heure de retour à bord. Il vous appartient d'être à l'heure et de respecter les horaires du navire.",
          "Si vous n'êtes pas au point de prise en charge à l'heure convenue, le service peut être considéré comme non présenté, sans droit à remboursement.",
        ],
      },
      {
        heading: "6. Annulation et modification par le client",
        paragraphs: [
          "Si nous recevons votre demande d'annulation ou de modification plus de 48 heures avant l'heure de prise en charge du service, le montant encaissé pour ce service vous sera intégralement remboursé.",
          "Si l'annulation ou la modification intervient moins de 48 heures avant cette heure, aucun montant ne sera remboursé.",
          "Vous pouvez gérer ou annuler depuis les liens de l'e-mail de confirmation ou depuis « Gérer la réservation ». La fiche d'une activité peut indiquer un délai différent ; en cas de conflit, ce qui a été indiqué lors de la confirmation de cette réservation prévaut.",
        ],
      },
      {
        heading: "7. Annulation ou modification de notre fait",
        paragraphs: [
          "Nous pouvons annuler ou modifier un service pour force majeure, météo défavorable, fermeture de sites, minimum de participants ou raisons de sécurité. Dans ce cas, nous vous proposerons une alternative ou le remboursement du montant correspondant.",
          "Les horaires peuvent être légèrement ajustés en raison du trafic, des files d'attente ou des instructions de l'autorité portuaire.",
        ],
      },
      {
        heading: "8. Comportement et limites",
        paragraphs: [
          "Nous nous réservons le droit de ne pas admettre ou d'interrompre le service si le comportement met en danger le groupe, le chauffeur ou le guide. Aucun remboursement n'est dû dans ces cas.",
          "Nous ne disposons pas actuellement de minibus adaptés aux fauteuils roulants. Renseignez-vous avant de réserver pour tout besoin d'accessibilité.",
        ],
      },
      {
        heading: "9. Responsabilité",
        paragraphs: [
          "Nous répondons de la bonne exécution du service contracté avec la diligence d'une agence professionnelle. Nous ne répondons pas des dommages résultant d'informations inexactes fournies par le client, de retards de croisière ou de vol, ni des sites gérés par des tiers lorsque l'accès en dépend, au-delà de ce que la loi exige.",
        ],
      },
      {
        heading: "10. Droit de rétractation",
        paragraphs: [
          "Les services de loisirs pour une date précise peuvent être exclus du droit de rétractation de 14 jours prévu pour les contrats à distance, conformément à la réglementation des consommateurs. La politique d'annulation de l'article 6 s'applique.",
        ],
      },
      {
        heading: "11. Droit applicable et juridiction",
        paragraphs: [
          "Le droit espagnol s'applique, y compris la réglementation de consommation des Canaries le cas échéant. Les litiges relèvent des tribunaux du domicile du consommateur lorsque la loi le prévoit ; à défaut, des tribunaux d'Arrecife (Lanzarote).",
        ],
      },
    ],
  },
  cookies: {
    title: "Politique de cookies",
    updated: "Dernière mise à jour : 9 septembre 2026",
    intro: `Ce site, exploité par ${COMPANY} (marque Lanzarote Tours), utilise des cookies et des technologies similaires pour fonctionner et mémoriser vos préférences.`,
    sections: [
      {
        heading: "1. Que sont les cookies",
        paragraphs: [
          "Ce sont de petits fichiers enregistrés par votre navigateur. Ils peuvent être de session (supprimés à la fermeture du navigateur) ou persistants.",
        ],
      },
      {
        heading: "2. Cookies que nous utilisons",
        paragraphs: [
          "Essentiels : langue de navigation, session d'administration et fonctions de panier ou de réservation. Sans eux, le site ne peut pas fournir le service demandé.",
          "Cookies techniques de tiers : les passerelles de paiement telles que Stripe ou PayPal peuvent déposer leurs propres cookies lors du paiement, selon leurs politiques.",
          "Nous n'utilisons pas de cookies publicitaires ou de reciblage, ni de profilage commercial étranger à votre réservation.",
        ],
      },
      {
        heading: "3. Base juridique",
        paragraphs: [
          "Les cookies strictement nécessaires reposent sur l'intérêt légitime et la fourniture du service. Tout cookie non essentiel ajouté à l'avenir exigerait un consentement préalable.",
        ],
      },
      {
        heading: "4. Comment les gérer",
        paragraphs: [
          "Vous pouvez accepter ou limiter les cookies non essentiels depuis le bandeau de ce site (ou via « Gérer les cookies » dans le pied de page). Vous pouvez aussi bloquer ou supprimer les cookies dans les réglages de votre navigateur. Si vous désactivez les cookies essentiels, la langue, le panier ou le paiement peuvent cesser de fonctionner.",
        ],
      },
      {
        heading: "5. Informations complémentaires",
        paragraphs: [
          `Pour toute question sur les cookies ou les données personnelles, écrivez à ${EMAIL} ou consultez la politique de confidentialité de ce site.`,
        ],
      },
    ],
  },
};
