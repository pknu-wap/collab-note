#! /bin/bash

pnpm install
pnpm prisma:generate
pnpm build:server
pnpm start:pm2
