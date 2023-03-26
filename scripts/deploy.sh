#! /bin/bash

pnpm install
pnpm prisma:generate

./scripts/deploy-server.sh
