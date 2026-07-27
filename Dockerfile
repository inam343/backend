# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Copy rest of the source code
COPY . .

# Expose port (Railway overrides this with PORT env var)
EXPOSE 5000

# Start the app
CMD ["node", "app.js"]
