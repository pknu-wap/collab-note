#! /bin/bash

pnpm install
pnpm prisma:generate
pnpm build
pnpm start:pm2
