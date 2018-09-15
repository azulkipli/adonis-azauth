// Procfile

release: ENV_SILENT=true cp .env.example .env && node ace migration:run --force
web: ENV_SILENT=true npm start
