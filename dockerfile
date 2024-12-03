# Stage 1: Builder
FROM node:18-alpine as builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 관리 파일 복사 및 종속성 설치
COPY package.json package-lock.json ./
RUN npm install --production1

# 모든 소스 코드를 복사
COPY . .

# 빌드 단계
RUN npm run build

# Stage 2: Runner
FROM node:18-alpine as runner

# 작업 디렉토리 설정
WORKDIR /app

# 빌더 단계에서 설치된 node_modules와 소스 코드 복사
COPY --from=builder /app .

# 환경 변수 설정
ENV NODE_ENV=production1
ENV VITE_API_SERVER_URL=http://172.31.8.44:9000

# 애플리케이션 실행
CMD ["npm", "run", "start:prod"]
