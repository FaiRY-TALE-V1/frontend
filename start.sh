#!/bin/bash

# FaiRY TALE 프론트엔드 시작 스크립트

echo "🧚‍♀️ FaiRY TALE 프론트엔드를 시작합니다..."
echo "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "="

# Node.js 버전 확인
if ! command -v node &> /dev/null; then
    echo "❌ Node.js가 설치되지 않았습니다."
    echo "Node.js를 설치해주세요: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js 버전: $NODE_VERSION"

# npm 확인
if ! command -v npm &> /dev/null; then
    echo "❌ npm이 설치되지 않았습니다."
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm 버전: $NPM_VERSION"

# node_modules 확인 및 설치
if [ ! -d "node_modules" ]; then
    echo "📦 패키지를 설치합니다..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 패키지 설치에 실패했습니다."
        exit 1
    fi
    echo "✅ 패키지 설치가 완료되었습니다."
else
    echo "✅ 패키지가 이미 설치되어 있습니다."
fi

# .env 파일 확인
if [ ! -f ".env" ]; then
    echo "⚠️  .env 파일이 없습니다."
    echo "💡 .env.example을 복사하여 .env 파일을 만드시겠습니까? (y/n)"
    read -r answer
    if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
        cp .env.example .env
        echo "✅ .env 파일이 생성되었습니다."
    else
        echo "⚠️  .env 파일 없이 기본 설정으로 실행합니다."
    fi
fi

# 백엔드 연결 확인
echo "🔍 백엔드 서버 연결을 확인합니다..."
API_URL=${REACT_APP_API_URL:-"http://localhost:8000"}

if curl -s "$API_URL" > /dev/null; then
    echo "✅ 백엔드 서버에 연결되었습니다: $API_URL"
else
    echo "⚠️  백엔드 서버에 연결할 수 없습니다: $API_URL"
    echo "백엔드 서버를 먼저 실행해주세요."
    echo ""
    echo "백엔드 실행 방법:"
    echo "cd ../backend"
    echo "python start.py"
    echo ""
    echo "그래도 프론트엔드를 실행하시겠습니까? (y/n)"
    read -r answer
    if [ "$answer" != "y" ] && [ "$answer" != "Y" ]; then
        echo "👋 프론트엔드 실행을 취소합니다."
        exit 0
    fi
fi

echo "🚀 개발 서버를 시작합니다..."
echo "📍 프론트엔드: http://localhost:3000"
echo "📍 백엔드: $API_URL"
echo "💝 아이 맞춤형 동화 생성 서비스"
echo "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "=" "="

# React 개발 서버 시작
npm start
