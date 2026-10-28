#!/usr/bin/env python3
"""Check nav/footer drift across pages.

Nav and footer are duplicated in every HTML file by design (no build step).
This script compares the <nav class="nav"> and <footer class="foot"> blocks
of every page against a reference (index.html for root pages, the first
work/ case study for work pages), after normalising per-page differences
that are intentional:

  - aria-current="page"   marks the active page
  - class="read"          a per-page list variant
  - whitespace            formatting only

Exit code 1 when real drift is found. Run before every deploy:

    python3 scripts/check_chrome.py
"""
import difflib
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAV = re.compile(r'<nav class="nav".*?</nav>', re.S)
FOOT = re.compile(r'<footer class="foot">.*?</footer>', re.S)


def block(html, rx):
    m = rx.search(html)
    return m.group(0) if m else ''


def normalize(s):
    s = s.replace(' aria-current="page"', '')
    s = s.replace(' class="read"', '')
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r'> <', '><', s)  # ignore formatting-only whitespace between tags
    return s.strip()


def main():
    os.chdir(ROOT)
    root_pages = sorted(glob.glob('*.html'))
    work_pages = sorted(glob.glob('work/*.html'))
    ref_root = {b: block(open('index.html', encoding='utf-8').read(), rx)
                for b, rx in (('nav', NAV), ('foot', FOOT))}
    ref_work_src = work_pages[0] if work_pages else 'index.html'
    ref_work = {b: block(open(ref_work_src, encoding='utf-8').read(), rx)
                for b, rx in (('nav', NAV), ('foot', FOOT))}

    drift = 0
    for f in root_pages + work_pages:
        html = open(f, encoding='utf-8').read()
        ref = ref_work if f.startswith('work/') else ref_root
        for b, rx in (('nav', NAV), ('foot', FOOT)):
            mine = normalize(block(html, rx))
            theirs = normalize(ref[b])
            if mine != theirs:
                drift += 1
                print('DRIFT %s (%s vs %s)' % (f, b, 'work ref' if f.startswith('work/') else 'index.html'))
                diff = difflib.unified_diff(theirs.split(' '), mine.split(' '), lineterm='', n=2)
                for line in list(diff)[:14]:
                    print('   ', line[:150])
    if drift:
        print('\n%d block(s) drifted. Update the pages above before deploying.' % drift)
        return 1
    print('OK — nav/footer in sync across %d pages.' % (len(root_pages) + len(work_pages)))
    return 0


if __name__ == '__main__':
    sys.exit(main())
