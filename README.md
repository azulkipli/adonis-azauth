# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, here are the features.

1. MySQL Database, Adonis Cache, Adonis Route Throttle
2. JWT Token Authorization
3. Sample Model: User, Link
4. Sample User, Link Migrations and seeds
5. ...
6. ...

## Setup

Please follow quick guide below.

### Preparation

Use the adonis command to install required node modules

```bash
adonis install
```

or manually clone the repo cd to it and then run `npm install`.

Continue with copy example config file `.env.example` as `.env`

```bash
cp .env.example .env
```

Update all config with your credential.

Make sure all configuration in .env file are correct.

### Migrations & Seed

Run the following command to run startup migrations.

```js
adonis migration:run
```

Example output
```bash
$ adonis migration:run 
migrate: 1503250034279_user.js
migrate: 1503250034280_token.js
migrate: 1546067766659_links_schema.js
migrate: 1546067775962_clicks_schema.js
Database migrated successfully in 491 ms
```
Run seed files
```js
adonis seed --files="UserSeeder.js"
adonis seed --files="LinkSeeder.js" 
```

Example output
```bash
$ adonis seed --files="UserSeeder.js"
Seeded database in 1.05 s

$ adonis seed --files="LinkSeeder.js"                                        
Seeded database in 699 ms
```


### Development 

After all preparation success we can run dev server with command

```bash
adonis serve --dev
```

Open base URL of API on web browser or POSTMAN: [http://localhost:3232](http://localhost:3232)

Example output of : [http://localhost:3232](http://localhost:3232)
```json
{
  "app": "AdonisJS auth"
}
```

Example output of : [http://localhost:3232](http://localhost:3232)
```json
[
    {
    "id": 1,
    "short_url": "poNdoK",
    "long_url": "https://www.google.com/search?q=mysql+error+1064&oq=mysql+error+1064&aqs=chrome..69i57j0l5.4320j1j7",
    "ip": "127.0.0.1",
    "clicks": 0,
    "is_disabled": 0,
    "is_custom": 0,
    "user_id": null,
    "created_at": "2018-12-30 17:20:41",
    "updated_at": "2018-12-30 17:20:41"
  },
  {
    "id": 2,
    "short_url": "DV4Z9H",
    "long_url": "//www.gravatar.com/avatar/0f575e0945e983e8c81727940d6fbc26",
    "ip": "155.167.249.188",
    "clicks": 0,
    "is_disabled": 0,
    "is_custom": 1,
    "user_id": 5,
    "created_at": "2018-12-30 17:20:41",
    "updated_at": "2018-12-30 17:20:41"
  },
  {
    "id": 3,
    "short_url": "PcvURb",
    "long_url": "//www.gravatar.com/avatar/eecdea8c8c06b417ce10a88e46e12931",
    "ip": "196.110.157.49",
    "clicks": 0,
    "is_disabled": 0,
    "is_custom": 0,
    "user_id": 7,
    "created_at": "2018-12-30 17:20:41",
    "updated_at": "2018-12-30 17:20:41"
  },
  ...
  ...
  ...
]
```


