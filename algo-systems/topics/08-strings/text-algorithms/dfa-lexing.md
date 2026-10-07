---
id: str-dfa-lexing
kind: basic
version: 1
level: 4
tags: [strings, automata, compilers]
requires:
  - str-dfa-step
refs:
  - https://swtch.com/~rsc/regexp/regexp1.html
  - https://re2c.org/manual/manual_c.html
---

## Why is a lexer compiled into one DFA rather than run as a list of token regexes tried in turn?

---

**One table lookup per input byte, however many token kinds, with no backtracking.**

Thompson's construction unions every token pattern into one NFA; subset
construction and minimisation turn it into a DFA:
`state = table[state][byte]`. Trying regexes in turn rereads the input
once per rule. `flex` and `re2c` generate exactly this table or its
equivalent code.
