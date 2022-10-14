IMAGES := $(shell docker images -aq)

build:
	cd note-taking-app-backend && $(MAKE) build
	cd note-taking-app-frontend && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down

delete:
	docker-compose down
	docker rmi -f $(IMAGES)
	rm -rf note-taking-app-backend/postgresql