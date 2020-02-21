const router = require('express').Router();
const controller = require('./controller');
const { auth, owner } = require('./../auth');

router.param('id', controller.id);

router
  .route('/')
  .get(auth, controller.all);

router.route('/signup').post(controller.create);
router.route('/signin').post(controller.signin);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth, owner, controller.update)
  .delete(auth, owner, controller.delete);

module.exports = router;
