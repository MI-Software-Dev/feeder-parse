# Use an official Bun image as the base image
FROM oven/bun:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and bun.lockb to leverage Docker cache
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the project files into the container
COPY . .

# Run Next.js build using Bun
RUN bun run build

# Expose the port your app will run on
EXPOSE 3000

# Define the command to run your app in production mode using Next.js's start command
CMD ["bun", "run", "start"]
