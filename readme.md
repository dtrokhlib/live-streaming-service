## General setup

Config file _.env_ should be create at server folder and full-filled as following:

```
SESSION_SECRET=
PORT=
SALT_ROUNDS=
```

Start docker containers for Redias and MongoDB connection from Infra folder (Docker should be installed on the system and):

```
docker-compose up -d
```

Install node modules

```
npm i
```

Start project

```
npm run start
```

Others commands can be found in the package.json file