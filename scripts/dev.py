#!/usr/bin/env python3
"""Local dev server with clean-URL support, matching Vercel's cleanUrls.

    python3 scripts/dev.py [port]

`/work` serves `work.html`, `/work/aum-apparel` serves `work/aum-apparel.html`,
`/` serves `index.html`. Use this instead of `python3 -m http.server` --
internal links are now extensionless, so plain http.server would 404 them.
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class CleanHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        resolved = super().translate_path(path)
        if (not os.path.exists(resolved) or os.path.isdir(resolved)) and not path.endswith('/'):
            candidate = resolved + '.html'
            if os.path.isfile(candidate):
                return candidate
        return resolved

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')  # dev only: always fresh
        super().end_headers()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    os.chdir(ROOT)
    print('Serving %s -> http://localhost:%d (clean URLs on)' % (ROOT, port))
    ThreadingHTTPServer(('', port), CleanHandler).serve_forever()
