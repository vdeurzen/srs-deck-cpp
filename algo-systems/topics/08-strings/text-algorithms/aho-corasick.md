---
id: str-aho-corasick
kind: basic
version: 1
level: 4
tags: [strings, automata, scanning]
refs:
  - https://dl.acm.org/doi/10.1145/360825.360855
  - https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm
---

## You must find which of 50 000 patterns occur in a stream. What does Aho–Corasick build, and why is it linear regardless of the pattern count?

---

Build a **trie of all the patterns**, then add two kinds of link:

- **Failure link** from each node to the node representing the longest
  proper suffix of its string that is also a prefix of some pattern —
  the multi-pattern generalisation of KMP's failure function. Computed
  by a BFS over the trie, so a node's failure link is known before its
  children's.
- **Output link** to the nearest ancestor-by-failure that is itself a
  complete pattern, so a position that ends several patterns at once
  ("she", "he") reports all of them without a separate search.

Scanning then feeds one character at a time: follow the goto edge if it
exists, otherwise follow failure links until one does. **The input
pointer never moves backwards**, so the scan is O(n) in the text plus
O(total pattern length) to build plus O(occurrences) to report —
independent of the number of patterns. That is the property that makes
it the right answer when the pattern set is large.

The structure is a **DFA** once you materialise the transitions:
precompute `goto(state, c)` for every character, and each input byte
becomes a single table lookup with no failure walking at all. That is
the classic space/time trade — 256 pointers per state is a lot of
memory for 50 000 patterns, so implementations use the double-array
trie, a hash per state, or keep the failure links and accept the
amortised walk.

Where it shows up: intrusion detection and antivirus signature matching
(Snort, ClamAV), `grep -F` with many patterns (Aho's own `fgrep` was
an early implementation), tokenising against a keyword set, dictionary
matching in a lexer, and content filtering. When the pattern set is
*small*, prefer Commentz-Walter/Boyer–Moore-style skipping or plain
SIMD scanning — Aho–Corasick reads every byte, and a skipping algorithm
does not.
