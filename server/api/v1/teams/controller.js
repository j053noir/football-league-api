const teams = [];

exports.create = (req, res, next) => {
  const { name = '', color1 = '', color2 = '' } = req.body;

  if (name === '') {
    next({
      message: 'Param "name" is required.',
      statusCode: 422,
      type: 'warn',
    });
  } else if (teams.find(t => t.name === name)) {
    next({
      message: `"name" (${name}) is already taken.`,
      statusCode: 422,
      type: 'warn',
    });
  } else {
    const team = {
      id: teams.length + 1,
      name,
      color1,
      color2,
    };

    teams.push(team);
    res.status(201);
    res.json({
      message: 'Team Created',
    });
  }
};

exports.all = (req, res, next) => {
  res.json(teams);
};

exports.read = (req, res, next) => {
  const team = teams.find(t => t.id === +req.params.id);

  if (!team) {
    next({
      message: `Team (${req.params.id}) not found`,
      statusCode: 404,
      type: 'warn',
    });
  } else {
    res.json(team);
  }
};

exports.update = (req, res, next) => {
  const teamIndex = teams.findIndex(t => t.id === +req.params.id);

  if (teamIndex >= 0) {
    next({
      message: `Team (${req.params.id}) not found`,
      statusCode: 404,
      type: 'warn',
    });
  } else {
    const { name = '', color1 = '', color2 = '' } = req.body;
    const team = teams[teamIndex];

    if (name === '') {
      next({
        message: 'Param "name" is required.',
        statusCode: 422,
        type: 'warn',
      });
    }

    team.name = name;

    if (color1 !== '') {
      team.color1 = color1;
    }

    if (color2 !== '') {
      team.color2 = color2;
    }

    teams.splice(teamIndex, 1, team);

    res.json({
      message: `Team (${team.id}) updated.`,
    });
  }
};

exports.delete = (req, res, next) => {
  const teamIndex = teams.findIndex(t => t.id === +req.params.id);

  if (teamIndex >= 0) {
    next({
      message: `Team (${req.params.id}) not found`,
      statusCode: 404,
      type: 'warn',
    });
  } else {
    teams.splice(teamIndex, 1);

    res.json({
      message: `Team (${+req.params.id}) deleted.`,
    });
  }
};
