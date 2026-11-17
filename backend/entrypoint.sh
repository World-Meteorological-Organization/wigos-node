#!/bin/sh
set -e

# pywmdr validates against our pinned schema, not the one its bundle downloads
cp api/schemas/wmdr2-bundled.json "$HOME/.pywmdr/wmdr2/wmdr2-bundled.json"

python manage.py migrate --noinput

exec "$@"
