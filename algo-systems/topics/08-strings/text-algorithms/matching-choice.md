---
id: str-matching-choice
kind: cloze
version: 1
level: 4
tags: [strings, automata, scanning]
refs:
  - https://en.wikipedia.org/wiki/String-searching_algorithm
  - https://en.cppreference.com/w/cpp/algorithm/search
---

One short pattern, one pass, no preprocessing budget: just scan — and
for a single byte, `memchr`, which is already {{c1::vectorised::SIMD,
16 or 32 bytes per compare}} in every libc worth using. One pattern,
long text, streaming: KMP, O(n + m), whose distinctive property is
that the text pointer {{c2::never moves backwards::so it works on a
stream you cannot re-read}}.

One pattern, long text, random access allowed: Boyer–Moore(–Horspool),
which is sublinear in practice because a mismatch lets it
{{c3::skip ahead::by the bad-character and good-suffix rules}} rather
than advance by one. Many patterns at once: {{c4::Aho-Corasick::a trie
plus failure links — one pass, independent of the pattern count}}.

Substring equality by hash, or chunking a stream by content: a rolling
hash. Repeated queries against a **fixed** text: build a suffix array
with its LCP array once, then answer each query in O(m + log n). And
for a pattern language rather than a literal: compile the union of the
patterns into a {{c5::DFA::one table lookup per input byte, no
backtracking}}, which is what a lexer generator emits and what an
automaton-based regex engine simulates to avoid the exponential
blow-up a backtracking engine has on untrusted input.
