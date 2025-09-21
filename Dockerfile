# Escolhe a imagem Node
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Build do NestJS
RUN npm run build

# Porta que o container vai expor
EXPOSE 3000

# Comando para rodar o NestJS
CMD ["npm", "run", "start"]
