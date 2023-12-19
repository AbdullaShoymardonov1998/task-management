# Organization Task Management

Framework: Nest JS

ORM: Prisma (PostgreSQL)

Swagger URL:

```
http://localhost:3000/api
```

## Steps to start project locally

1. Copy .env.example content to new .env file

2. Set database URL

3. Run following commands

```
npm ci
```

```
npx prisma migrate deploy
```

```
npx prisma db seed
```

```
npm run start:dev
```

4. Go to Swagger UI:

```
http://localhost:3000/api
```
