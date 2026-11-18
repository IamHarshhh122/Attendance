# 1. Official Node.js base image use karna
FROM node:18

# 2. Container ke andar working directory banana
WORKDIR /app

# 3. Package files copy karke dependencies install karna
COPY package*.json ./
RUN npm install

# 4. Baaki ka poora backend code container mein copy karna
COPY . .

# 5. App ka port expose karna (Port 5000)
EXPOSE 5000

# 6. Container start hone par server run karne ka command
CMD ["node", "server.js"]