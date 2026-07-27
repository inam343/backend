# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the source code
COPY . .

# Remove .env if accidentally copied
RUN rm -f .env

# Start the app
CMD ["node", "app.js"]
