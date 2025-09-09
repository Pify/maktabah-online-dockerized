# --- Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./

# Use npm ci instead of npm install for CI/CD builds
# - Faster, clean install
# - Uses package-lock.json for deterministic builds
# - Ensures deployments match local dev exactly
RUN npm ci

COPY . .
RUN npm run build

# --- Production Stage ---
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# add certbot for SSL
RUN apk add --no-cache certbot certbot-nginx bash

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
