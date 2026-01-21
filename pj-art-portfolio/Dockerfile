FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
# Accept build-time environment variables
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Make them available during build
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY

COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app

# Debug: Show if env vars are set
RUN echo "Building with VITE_SUPABASE_URL: $VITE_SUPABASE_URL" && \
    echo "VITE_SUPABASE_ANON_KEY length: ${#VITE_SUPABASE_ANON_KEY}"

# Cache bust for SSR build - change this comment to force rebuild
# Build version: 3
RUN npm run build

FROM node:20-alpine
COPY ./package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
COPY ./public /app/public
COPY ./supabaseClient.js /app/supabaseClient.js
COPY ./react-router.config.ts /app/react-router.config.ts
WORKDIR /app

# Expose port 3000
EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV=production

CMD ["npm", "run", "start"]