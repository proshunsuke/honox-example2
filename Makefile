compose/build:
	docker compose build --no-cache

compose/up:
	docker compose up

dev:
	npm run dev

ssh/app:
	docker compose exec app /bin/bash

db/reset:
	docker compose exec app npx prisma migrate reset --preview-feature

db/console:
	docker compose exec db mysql -u root -proot honox_example2

