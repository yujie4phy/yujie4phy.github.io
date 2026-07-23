#!/bin/zsh
cd "$(dirname "$0")"

if command -v python3 >/dev/null 2>&1; then
  python3 scripts/content_editor.py
else
  /usr/bin/python3 scripts/content_editor.py
fi

echo ""
echo "The website editor has stopped. You may close this window."
read -r
