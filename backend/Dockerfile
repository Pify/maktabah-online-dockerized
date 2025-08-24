# Use lightweight Node image
FROM node:20

# Create app dir
WORKDIR /app

# Install build tools for packages like pg, bcrypt
#RUN apk add --no-cache python3 make g++

# Copy deps first
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

RUN chmod +x wait-for-it.sh

# Expose API port
EXPOSE 8080

# Start server
CMD ["npm", "start"]

# FROM node:20-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# CMD ["npm", "start"]
