build:
	cd note-taking-app-backend && $(MAKE) build
	cd note-taking-app-frontend && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down

remove:
	docker image rm backend
	docker image rm frontend
	docker image rm postgres
	docker container rm note-taking-app-backend-1
	docker container rm note-taking-app-frontend-1
	docker container rm note-taking-app-db-1
