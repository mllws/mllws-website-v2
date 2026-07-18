# MLLWS website — common development tasks
# Run `make` or `make help` to list targets.

.PHONY: help install dev build start lint fetch-blog clean

.DEFAULT_GOAL := help

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

install: ## Install npm dependencies
	npm install

dev: ## Start the Next.js development server
	npm run dev

build: ## Build the production site (fetches blog content first)
	npm run build

start: ## Serve the production build
	npm run start

lint: ## Run ESLint
	npm run lint

fetch-blog: ## Fetch blog content from the private mllws-blog repo
	node scripts/fetch-blog-content.js

clean: ## Remove build output and caches
	rm -rf .next out node_modules/.cache
