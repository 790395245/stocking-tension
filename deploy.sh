#!/usr/bin/env bash
# 重新构建 dist 并部署到 EdgeOne Makers（项目 stocking-tension）
set -euo pipefail
cd "$(dirname "$0")"
rm -rf dist && mkdir -p dist/assets
cp index.html dist/
cp assets/female_leg_low.glb dist/assets/
export PAGES_SOURCE=skills
echo "==> dist 已构建 ($(du -sh dist | cut -f1))，开始部署..."
edgeone makers deploy dist --json
