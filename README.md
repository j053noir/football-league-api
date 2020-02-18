Clone this repository and run in the directory

````
```shell
git clone https://github.com/j053noir/football-league-api.git && cd football-league-api
````

@@ -36,6 +36,16 @@ To start the server in development mode run:
npm run dev

```

# API V1

| Route           | Method | Parameters | Body                                | Description               |
| --------------- | :----: | ---------: | ----------------------------------- | ------------------------- |
| /api/users      |  GET   |          - | -                                   | Gets all users            |
| /api/users      |  POST  |            | description: string, author: string | Creates a new user        |
| /api/users/{id} |  GET   | id: number | -                                   | Get user with Id {id}     |
| /api/users/{id} |  PUT   | id: number | description: string, author: string | Updates user with Id {id} |
| /api/users/{id} | DELETE | id: number | -                                   | Deletes user with Id {id} |

## Testing

Not yet available.
```
