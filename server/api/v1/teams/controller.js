const Model = require('./model');

exports.id = (req, res, next, id) => {
  Model.findById(id)
    .exec()
    .then(doc => {
      if (!doc) {
        const message = `${Model.modelName} with id (${id}) not found`;

        res.json({
          success: false,
          statusCode: 404,
          message,
        });
      } else {
        req.doc = doc;
        next();
      }
    })
    .catch(err => {
      next(new Error(err));
    });
};

exports.create = (req, res, next) => {
  const doc = new Model(req.body);

  doc.save()
    .then(created => {
      res.status(201);
      res.json({
        success: true,
        item: created,
      });
    })
    .catch(err => {
      next(new Error(err));
    });
};

exports.all = (req, res, next) => {
  Model.find()
    .exec()
    .then(docs => {
      res.json({
        success: true,
        item: docs,
      });
    })
    .catch(err => {
      next(new Error(err));
    });
};

exports.read = (req, res, next) => {
  const { doc } = req;
  res.json({
    success: true,
    item: doc,
  });
};

exports.update = (req, res, next) => {
  const { doc, body } = req;

  Object.assign(doc, body);

  doc.save()
    .then(updated => {
      res.json({
        success: true,
        item: updated,
      });
    })
    .catch(err => {
      next(new Error(err));
    });
};

exports.delete = (req, res, next) => {
  const { doc } = req;

  doc.remove()
    .then(removed => {
      res.json({
        success: true,
        item: removed,
      });
    })
    .catch(err => {
      next(new Error(err));
    });
};
