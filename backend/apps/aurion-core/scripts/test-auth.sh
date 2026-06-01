#!/usr/bin/env bash
set -euo pipefail

BASE="http://localhost:3333"
TMPCOOKIE="/tmp/aurion_cookie.txt"

echo "Signing up test user..."
curl -s -c "$TMPCOOKIE" -H "Content-Type: application/json" -d '{"name":"Test","email":"test+auth@example.com","password":"secret"}' "$BASE/auth/signup" | jq .

echo "Checking session..."
curl -s -b "$TMPCOOKIE" "$BASE/auth/me" | jq .

echo "Signing out..."
curl -s -b "$TMPCOOKIE" -X POST "$BASE/auth/logout" | jq .

echo "Signing in..."
curl -s -c "$TMPCOOKIE" -H "Content-Type: application/json" -d '{"email":"test+auth@example.com","password":"secret"}' "$BASE/auth/signin" | jq .

echo "Session after sign-in:"
curl -s -b "$TMPCOOKIE" "$BASE/auth/me" | jq .

echo "Done."
