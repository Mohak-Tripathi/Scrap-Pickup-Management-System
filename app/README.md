### steps to run the app
0. create `prisma/.env` file and add the database
```
DATABASE_URL="file:./app.db"
```

1. Build the css
```bash
npm run build:css
```

2. Build repository
```bash
npm run build:repo
```

3. Run the app in debug mode
```bash
npm run dev
```