.PHONY: build rust web dev deploy clean

# Build everything
build: rust web

# Build Rust backend
rust:
	cargo build --release

# Build Astro frontend
web:
	cd web && npm install && npm run build

# Run development server
dev:
	cargo run

# Deploy to Cloudflare Pages
deploy: web
	npx wrangler pages deploy web/dist --project-name=llmdeals

# Clean build artifacts
clean:
	cargo clean
	cd web && rm -rf dist .astro

# Initialize database
init:
	cargo run -- init

# Seed with OpenCode Go data
seed:
	cargo run -- seed

# Run tests
test:
	cargo test
