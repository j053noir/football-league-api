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
  res.json({});
};

exports.read = (req, res, next) => {
  res.json({});
};

exports.update = (req, res, next) => {
  res.json({});
};

exports.delete = (req, res, next) => {
  res.json({});
};
