.PHONY: help build up down logs clean restart

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Build all Docker images
	docker-compose build

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## Show logs from all services
	docker-compose logs -f

logs-server: ## Show server logs
	docker-compose logs -f server

logs-web: ## Show web logs
	docker-compose logs -f web

logs-db: ## Show database logs
	docker-compose logs -f db

restart: ## Restart all services
	docker-compose restart

clean: ## Stop and remove all containers, networks, and volumes
	docker-compose down -v

ps: ## Show running containers
	docker-compose ps

shell-server: ## Open shell in server container
	docker-compose exec server sh

shell-web: ## Open shell in web container
	docker-compose exec web sh

shell-db: ## Open PostgreSQL shell
	docker-compose exec db psql -U bonchi -d bonchi_db
