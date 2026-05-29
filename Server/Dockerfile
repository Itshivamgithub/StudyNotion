FROM node:20-alpine

# Add build dependencies for native modules
RUN apk add --no-cache python3 make g++

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]