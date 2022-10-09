build:
	cd note-taking-app-backend && $(MAKE) build
	cd note-taking-app-frontend && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down