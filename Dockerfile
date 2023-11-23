# Stage 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the app's source code
COPY . .

# Build the Angular app
RUN npm run build

# Stage 2: Serve the Angular app with NGINX
FROM nginx:1.21.3-alpine
COPY --from=build /app/dist/manager-train-stations-frontend /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]