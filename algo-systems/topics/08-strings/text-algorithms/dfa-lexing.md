---
id: str-dfa-lexing
kind: basic
version: 1
level: 4
tags: [strings, automata, compilers]
refs:
  - https://swtch.com/~rsc/regexp/regexp1.html
  - https://en.wikipedia.org/wiki/Deterministic_finite_automaton
---

## Why is a lexer a DFA rather than a list of regexes, and why can a "regex" take exponential time in some languages but not others?

---

A lexer needs to match **all** of its token patterns against the input
at once, take the longest match, and break ties by rule order. Compile
the union of the patterns into one NFA (Thompson's construction), then
determinise it (subset construction) and minimise: now each input byte
is a single table lookup `state = table[state][byte]`, and the lexer
runs in O(n) with a tiny constant, no backtracking, and no dependence
on the number of token kinds. That is what `lex`/`flex`/`re2c` emit,
and why adding a keyword to a language costs nothing at run time.

The longest-match rule is implemented by remembering the last accepting
state and its position, and rewinding to it when the automaton gets
stuck — bounded, unlike general backtracking.

The exponential-time question is about *engines*, not regular
expressions. A **backtracking** engine (PCRE, Perl, Python's `re`, Java,
JavaScript) explores alternatives recursively, so a pattern like
`(a+)+b` against `aaaaaaaaaaaaaaaaaaaaaaaaac` tries exponentially many
splits — the ReDoS vulnerability class, and a genuine denial-of-service
vector whenever a pattern touches user input. An **automaton** engine
(RE2, Go's `regexp`, rust's `regex`) simulates the NFA — tracking a set
of states — or builds the DFA lazily, and is O(n·m) worst case with no
backtracking at all. The trade is that backreferences and lookaround
cannot be expressed in an automaton, which is exactly why RE2 and Go's
`regexp` do not support them.

The practical rules that follow: use an automaton engine for anything
matching untrusted input; build the DFA lazily (cache states as they are
reached) when the full DFA would be too large, since subset construction
is exponential in the worst case even though real patterns are tame;
and for a fixed token set, generate the table at build time and keep it
in read-only memory.
