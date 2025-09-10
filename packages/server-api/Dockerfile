# Use Node.js 20 as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and dependencies
RUN npm install -g pnpm && \
    pnpm install --prod

# Copy prisma schema and generate client
COPY prisma ./prisma/
RUN pnpm prisma:generate

# Copy built application
COPY dist ./dist

# Copy environment files
COPY .env.production .env

# Expose port
EXPOSE 3000

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Start the application
CMD ["pnpm", "start:prod"]