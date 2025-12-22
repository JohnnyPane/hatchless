# --- Stage 1: Build React ---
FROM node:24-slim AS frontend-builder
WORKDIR /app
COPY hatchless-frontend/package*.json ./
RUN npm install
COPY hatchless-frontend/ ./
RUN npm run build

# --- Stage 2: Build Rails ---
FROM ruby:3.3.0-slim AS rails-builder
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    curl

WORKDIR /rails

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development test"

COPY hatchless-api/Gemfile hatchless-api/Gemfile.lock ./
RUN bundle install

COPY hatchless-api/ .
COPY --from=frontend-builder /app/dist /rails/public

# --- Stage 3: Final Runtime ---
FROM ruby:3.3.0-slim
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    libpq5 \
    curl \
    libvips \
    && rm -rf /var/lib/apt/lists /var/cache/apt/archives
WORKDIR /rails

ENV RAILS_ENV="production" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_BIN="/usr/local/bundle/bin" \
    GEM_HOME="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test" \
    BUNDLE_DEPLOYMENT="1" \
    RAILS_SERVE_STATIC_FILES="true" \
    RAILS_LOG_TO_STDOUT="true"

ENV PATH="${BUNDLE_BIN}:${PATH}"

COPY --from=rails-builder /usr/local/bundle /usr/local/bundle
COPY --from=rails-builder /rails /rails

RUN bundle config set --local without 'development test'

EXPOSE 8080
CMD ["bin/rails", "server", "-b", "0.0.0.0", "-p", "8080"]