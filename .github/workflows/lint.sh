#!/bin/bash

set -e
echo 'Installing backend dependencies...'
cd backend
npm ci

echo 'Linting backend contents'
npx tsc

echo 'Installing frontend dependencies...'
cd ../frontend
npm ci

echo 'Linting frontend contents'
npm run lint

echo 'Linting success!'