# Use official Node.js LTS image
FROM node:20-bullseye-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose no ports (Discord bots connect out)
# ENV variables (like DISCORD_TOKEN) should be set at runtime

# Start the bot
CMD ["node", "index.js"]