/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage-or-redirect' },
  'GET /welcome':            { action: 'dashboard/view-welcome' },

  'GET /faq':                { view:   'pages/faq' },
  'GET /legal/terms':        { view:   'pages/legal/terms' },
  'GET /legal/privacy':      { view:   'pages/legal/privacy' },
  'GET /contact':            { view:   'pages/contact' },

  'GET /signup':             { action: 'entrance/view-signup' },
  'GET /email/confirm':      { action: 'entrance/confirm-email' },
  'GET /email/confirmed':    { view:   'pages/entrance/confirmed-email' },

  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the CloudSDK library.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/account/update-billing-card':        { action: 'account/update-billing-card' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/send-password-recovery-email': { action: 'entrance/send-password-recovery-email' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },
  'POST  /api/v1/deliver-contact-form-message':          { action: 'deliver-contact-form-message' },


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  'GET /toto/count':'PersonController.count',
  'GET /person/count':'PersonController.count',
  'GET /spid':'SpidController.get',
  'GET /api/v1/spid/info': { action: 'spid/info' },
  'GET /api/v1/spid/club-liste': { action: 'spid/club-liste' },
  'GET /api/v1/spid/club-detail': { action: 'spid/club-detail' },
  'GET /api/v1/spid/organisme': { action: 'spid/organisme' },
  'GET /api/v1/spid/epreuve': { action: 'spid/epreuve' },
  'GET /api/v1/spid/division': { action: 'spid/division' },
  'GET /api/v1/spid/resultat-equipe': { action: 'spid/resultat-equipe' },
  'GET /api/v1/spid/rencontre': { action: 'spid/rencontre' },
  'GET /api/v1/spid/equipe-liste': { action: 'spid/equipe-liste' },
  'GET /api/v1/spid/resultat-indiv': { action: 'spid/resultat-indiv' },
  'GET /api/v1/spid/classement': { action: 'spid/classement' },
  'GET /api/v1/spid/joueur-liste-cla': { action: 'spid/joueur-liste-cla' },
  'GET /api/v1/spid/joueur-liste-spid': { action: 'spid/joueur-liste-spid' },
  'GET /api/v1/spid/joueur-detail-cla': { action: 'spid/joueur-detail-cla' },
  'GET /api/v1/spid/joueur-detail-spid': { action: 'spid/joueur-detail-spid' },
  'GET /api/v1/spid/joueur-partie-spid': { action: 'spid/joueur-partie-spid' },
  'GET /api/v1/spid/joueur-partie-mysql': { action: 'spid/joueur-partie-mysql' },
  'GET /api/v1/spid/joueur-historique-cla': { action: 'spid/joueur-historique-cla' },
  'POST /api/v1/spid/login': { action: 'spid/joueur-liste-spid' },
  'GET /api/v1/user-info/:licence': 'LicencieInfoController.get',
  'GET /api/v1/club-info/:club': {action:'spid/club-detail'},
  'GET /api/v1/joueur-info/:licence':{action:'spid/joueur-detail-cla'},
  'GET /api/v1/equipes/:type/:numclu':{ action: 'spid/equipe-liste' },
  'GET /api/v1/resultat-equipe/:cx_poule/:d/:action?':{ action: 'spid/resultat-equipe' },
  'GET /api/v1/detail-rencontre/':{ action: 'spid/rencontre' },
  'GET /api/v1/joueur-parties/:numlic':{ action: 'spid/joueur-partie-mysql' },
  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝
  '/terms':                   '/legal/terms',
  '/logout':                  '/api/v1/account/logout',

};
