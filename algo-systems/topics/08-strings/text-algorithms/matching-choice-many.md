---
id: str-matching-choice-many
kind: cloze
version: 1
level: 4
tags: [strings, automata, indexing]
requires:
  - str-aho-corasick
  - str-dfa-lexing
  - str-suffix-array
refs:
  - https://en.wikipedia.org/wiki/String-searching_algorithm
  - https://swtch.com/~rsc/regexp/regexp1.html
---

Beyond one literal pattern. Many literals at once:
{{c1::Aho-Corasick::antivirus signatures}}, one pass whatever the
pattern count. A pattern language such as a lexer's tokens: compile the
union into a {{c2::DFA::what flex generates}}, one
table lookup per byte, no backtracking. Many queries against one
fixed text: build a {{c3::suffix array::a genome searched a million times}}
once, then binary-search per query.
