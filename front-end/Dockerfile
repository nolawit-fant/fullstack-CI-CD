# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps


# Copy the rest of your app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the app port and start
EXPOSE 3000
CMD ["npm", "start"]


