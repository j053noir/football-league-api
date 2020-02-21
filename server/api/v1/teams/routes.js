const router = require('express').Router();
const controller = require('./controller');
const { auth, admin } = require('./../auth');

router.param('id', controller.id);

router
  .route('/')
  .get(auth, controller.all)
  .post(auth, admin, controller.create);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth, admin, controller.update)
  .delete(auth, admin, controller.delete);

module.exports = router;
