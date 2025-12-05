# --- STAGE 1 : build ---
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install react-icons

COPY . .
RUN npm run build

# --- STAGE 2 : nginx ---
FROM nginx:stable-alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
