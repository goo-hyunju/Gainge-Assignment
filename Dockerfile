# 베이스 이미지로 Node.js 사용
FROM node:16

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 빌드
RUN npm run build

# 애플리케이션 포트 설정
EXPOSE 5000

# 애플리케이션 시작 명령어
CMD ["npm", "run", "start:prod"]