# Storybook

## 설치

pnpx sb@next init -s && pnpm install

## 배포

set vercel root directory to "/packages/client"
set build-command to pnpm build-storybook / override
set output directory to storybook-static / override
Turn off the override for the rest
