Clone this repository and run in the directory:

```shell
git clone https://github.com/j053noir/football-league-api.git && cd football-league-api
```

Set the environment variables in the .env file

```
SERVER_PORT=3000
DATABASE_URL=<database URL**>
DATABASE_USERNAME=<optional: database username>
DATABASE_PASSWORD=<optional:database Password>
TOKEN_SECRET=<string used for generating authentication tokens>
```

To start the server in development mode run:

```shell
npm run dev
```

---

# API V1

### Users Routes

| Route           | Method | Parameters | Body                                                                                                                                                           | Description               |
| --------------- | :----: | :--------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| /api/users      |  GET   |            |                                                                                                                                                                | Gets all users            |
| /api/users      |  POST  |            | username: `String`, email: `String`, password: `String`, firstname: `String`, lastname: `String`, _nickname_:`String`, _photo_url_: `String`, _role_: `String` | Creates a new user        |
| /api/users/{id} |  GET   | id: `Guid` |                                                                                                                                                                | Get user with Id {id}     |
| /api/users/{id} |  PUT   | id: `Guid` | username: `String`, email: `String`, password: `String`, firstname: `String`, lastname: `String`, _nickname_:`String`, _photo_url_: `String`, _role_: `String` | Updates user with Id {id} |
| /api/users/{id} | DELETE | id: `Guid` |                                                                                                                                                                | Deletes user with Id {id} |

### Teams Routes

| Route           | Method | Parameters | Body                                                   | Description               |
| --------------- | :----: | :--------: | ------------------------------------------------------ | ------------------------- |
| /api/teams      |  GET   |            |                                                        | Gets all teams            |
| /api/teams      |  POST  |            | name: `String`, _color1_: `String`, _color2_: `String` | Creates a new team        |
| /api/teams/{id} |  GET   | id: `Guid` |                                                        | Get team with Id {id}     |
| /api/teams/{id} |  PUT   | id: `Guid` | name: `String`, _color1_: `String`, _color2_: `String` | Updates team with Id {id} |
| /api/teams/{id} | DELETE | id: `Guid` |                                                        | Deletes team with Id {id} |

### Events Routes

| Route            | Method | Parameters | Body                             | Description                |
| ---------------- | :----: | :--------: | -------------------------------- | -------------------------- |
| /api/events      |  GET   |            |                                  | Gets all events            |
| /api/events      |  POST  |            | name: `String`, _type_: `String` | Creates a new event        |
| /api/events/{id} |  GET   | id: `Guid` |                                  | Get event with Id {id}     |
| /api/events/{id} |  PUT   | id: `Guid` | name: `String`, _type_: `String` | Updates event with Id {id} |
| /api/events/{id} | DELETE | id: `Guid` |                                  | Deletes event with Id {id} |

### Members Routes

| Route             | Method | Parameters | Body                                                            | Description                      |
| ----------------- | :----: | :--------: | --------------------------------------------------------------- | -------------------------------- |
| /api/members      |  GET   |            |                                                                 | Gets all team members            |
| /api/members      |  POST  |            | _number_: `String`, event: `Guid`, player: `Guid`, team: `Guid` | Creates a new team member        |
| /api/members/{id} |  GET   | id: `Guid` |                                                                 | Get team member with Id {id}     |
| /api/members/{id} |  PUT   | id: `Guid` | _number_: `String`, event: `Guid`, player: `Guid`, team: `Guid` | Updates team member with Id {id} |
| /api/members/{id} | DELETE | id: `Guid` |                                                                 | Deletes team member with Id {id} |

**NOTE:** _properties in italic are optional_

---

## Testing

Not yet available.
