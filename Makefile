IMAGES := $(shell docker images -aq --filter=reference='notes_*')

build:
	cd server && $(MAKE) build
	cd client && $(MAKE) build

run:
	docker compose up

stop:
	docker compose down 

delete:
	docker compose down
	docker rmi -f $(IMAGES)
	rm -rf server/postgresql