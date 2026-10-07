---
id: str-matching-choice
kind: cloze
version: 1
level: 4
tags: [strings, scanning]
requires:
  - str-kmp-failure-function
  - str-horspool-skip
refs:
  - https://en.wikipedia.org/wiki/String-searching_algorithm
  - https://en.cppreference.com/w/cpp/algorithm/search
---

One literal pattern: choose by what you may do with the text. A single
byte: `memchr`, already {{c1::vectorised::finding newlines in a log}}
in every serious libc. A stream you cannot re-read: KMP, O(n + m),
because its text pointer {{c2::never moves backwards::matching on a socket}}. Random access to a long text: Boyer–Moore–Horspool, which on
a mismatch can {{c3::skip ahead::searching a 1 GB file for a long word}} and so
reads only part of the text.
