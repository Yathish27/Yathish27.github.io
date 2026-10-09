#!/usr/bin/env bash
# Publish the portfolio to GitHub Pages and Firebase Hosting with fresh cache-busting stamps.
set -e
cd "$(dirname "$0")"
STAMP=$(date +%Y%m%d%H%M)
sed -i -E "s#(css/style\.css|js/data\.js|js/main\.js)(\?v=[0-9]+)?#\1?v=${STAMP}#g" index.html
git add -A && git commit -q -m "Publish ${STAMP}" || true
git push -q origin main
firebase deploy --only hosting --non-interactive | grep -i "hosting url\|error" || true
rm -f firebase-debug.log
echo "published ${STAMP}"
