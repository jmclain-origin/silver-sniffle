FROM node:alpine3.20

WORKDIR /home/app/server

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@8 && pnpm install

COPY . .

ENV NODE_ENV=production

RUN pnpm run build

EXPOSE 8080

CMD ["node", "build/src/app.js"]
