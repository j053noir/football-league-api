const users = [];

function currentDate() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}

exports.create = (req, res, next) => {
  const { username = '', password = '', confirmPassword } = req.body;

  if (username === '') {
    next({
      message: 'Param "username" is required.',
      statusCode: 422,
      type: 'warn',
    });
  } else if (password === '') {
    next({
      message: 'Param "password" is required.',
      statusCode: 422,
      type: 'warn',
    });
  } else if (confirmPassword === '') {
    next({
      message: 'Param "confirmPassword" is required.',
      statusCode: 422,
      type: 'warn',
    });
  } else if (password !== confirmPassword) {
    next({
      message: 'Params "password" and confirmPassword must match.',
      statusCode: 422,
      type: 'warn',
    });
  } else if (users.find(u => u.username === username)) {
    next({
      message: `"username" (${username}) is already taken.`,
      statusCode: 422,
      type: 'warn',
    });
  } else {
    const user = {
      id: users.length + 1,
      username,
      password,
      createdAt: currentDate(),
      updatedAt: null,
    };

    users.push(user);
    res.statusCode(201);
    res.json({
      message: 'User created',
    });
  }
};

exports.all = (req, res, next) => {
  res.json(users.slice());
};

exports.read = (req, res, next) => {
  const user = users.find(u => u.id === +req.params.id);

  if (!user) {
    next({
      message: `User (${req.params.id}) not found`,
      statusCode: 404,
      type: 'warn',
    });
  } else {
    res.json(user);
  }
};

exports.update = (req, res, next) => {
  const userIndex = users.findIndex(u => u.id === +req.params.id);
  const user = users[userIndex];

  if (userIndex >= 0) {
    next({
      message: `User (${req.params.id}) not found`,
      statusCode: 404,
      type: 'warn',
    });
  } else {
    const { password = '', confirmPassword = '', oldPassword = '' } = req.body;

    if (password === '') {
      next({
        message: 'Param "password" is required.',
        statusCode: 422,
        type: 'warn',
      });
    } else if (confirmPassword === '') {
      next({
        message: 'Param "confirmPassword" is required.',
        statusCode: 422,
        type: 'warn',
      });
    } else if (confirmPassword === '') {
      next({
        message: 'Param "oldPassword" is required.',
        statusCode: 422,
        type: 'warn',
      });
    } else if (oldPassword !== user.password) {
      next({
        message: 'Params "oldPassword" does not match the user\'s current password.',
        statusCode: 422,
        type: 'warn',
      });
    } else if (password !== confirmPassword) {
      next({
        message: 'Params "password" and confirmPassword must match.',
        statusCode: 422,
        type: 'warn',
      });
    }

    user.password = password;
    user.updatedAt = currentDate();

    users.splice(userIndex, 1, user);

    res.json({
      message: `User (${user.id}) updated.`,
    });
  }
};

exports.delete = (req, res, next) => {
  const userIndex = users.findIndex(u => u.id === +req.params.id);

  if (userIndex >= 0) {
    next({
      message: `User (${req.params.id}) not found`,
      statusCode: 404,
      type: 'warn',
    });
  } else {
    users.splice(userIndex, 1);

    res.json({
      message: `User (${+req.params.id}) deleted.`,
    });
  }
};
