# Use the Node.js 20.1 image to build the Angular application
FROM node:20.1 AS angular-build
WORKDIR /app
COPY ClickerFrontend/package.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY ClickerFrontend/ ./
RUN ng build
RUN ls -la /app/dist/clicker-frontend/browser

# Use Nginx to serve the Angular application
FROM nginx:1.21.1 AS final
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=angular-build /app/dist/ClickerFrontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
