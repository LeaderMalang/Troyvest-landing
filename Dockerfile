FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build with mode dev/prod (from build arg)
ARG VITE_MODE=prod
RUN npm run build -- --mode $VITE_MODE

RUN npm install -g serve

EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
