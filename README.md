# 📝 CollabNote

## `프로젝트 이름`

📝 Collab Note

## `프로젝트 설명`

실시간 화상 공유, 동시 편집이 가능한 협업 툴

## `프로젝트 기술`

- WebRTC: 화상공유
  - WebRTC(Web Real-Time Communication)란 웹 애플리케이션과 사이트가 중간자 없이 브라우저 간에 오디오나 영상 미디어를 포착하고 마음대로 스트림할 뿐 아니라, 임의의 데이터도 교환할 수 있도록 하는 기술. ex) Zoom, Google Meet, Facebook
- CRDT: 동시 편집 알고리즘 구현
  - CRDT(Conflict-Free-Replicated Data Types)란 동시 수정 작업이 발생하는 분산 시스템에서 데이터 일관성을 보장하는 알고리즘. ex) Figma, Google Docs
- ETC:

  - Cypress를 통한 E2E(End To End) Testing

## `프로젝트 스택`

- Server: Nestjs, Postgresql, Prisma, Swagger
- Client: React(+Vite)
  - Global State: Tanstack Query, Zustand
  - UI: Emotion, Framer-motion, Storybook
- ETC:
  - Typescript
  - Pnpm의 workspace를 이용한 monorepo 방식
  - Socket.io, Socket.io-client 를 통한 Socket 통신

## `Links`

- server-dev: <https://dev.wap-dev.store>
- client-dev: <https://collab-note.vercel.app>
- storybook: <https://collab-note-storybook.vercel.app>
