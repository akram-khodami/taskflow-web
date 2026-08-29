# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.17.0

################################################################################
# Base stage
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

################################################################################
# DEVELOPMENT stage
FROM base as development
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

################################################################################
# DEPENDENCIES stage
FROM base as deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# BUILD stage
FROM deps as build
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

################################################################################
# FINAL stage
FROM base as final
ENV NODE_ENV production
USER node
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 5173
CMD ["npm", "run", "preview"]