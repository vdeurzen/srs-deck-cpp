# `cpp-core`

C++ from fundamentals through C++23, plus interview depth, for readers who
already program. 137 Cards in nine Topics; the Cards teach the language
and its idioms, not a particular codebase. `algo-systems` builds on this
Deck and may `require` its Cards.

## Layout

```
deck.yaml
topics/<topic-path>/<card-id>.md
```

The Topic is the directory path under `topics/` and nothing more; there is
no Topic metadata file. Topics: `01-basics`, `02-types`, `03-library`,
`04-language` (incl. coroutines, move semantics, smart pointers),
`05-interview`, `06-idioms`, `07-tracing`, `08-transfer`, `09-execution`
(senders and receivers, `std::execution`).

The grammar is `docs/FORMAT.md`; its "Per-Kind guide (from the cpp-core
Deck)" section holds the per-Kind detail and examples, so it is not repeated
here.

## Conventions specific to this Deck

- **Refs are required.** Every Card cites at least one primary source
  (cppreference, the standard or a proposal paper, a book).
- **Compile-checked Cards discriminate at compile time.** The compile
  service never runs code, so `code` and `parsons` Harnesses use
  `static_assert`/`constexpr`, or a deliberate compile failure, never a
  `main()` that returns a value. The compiler is GCC 14.2 (`g142`),
  `-std=c++23`: nothing GCC 14 lacks.
- **`compile: null` cases.** Four `chunk` Cards (`erase-remove`,
  `sender-pipeline`, `io-uring-submit`, `io-uring-completion-loop`) have no
  compile block, because the snippet cannot be checked by the compile
  service (e.g. `std::execution` is C++26, which GCC 14.2 lacks; io_uring
  needs Linux headers). They are graded by whitespace-normalised equality
  and say so on their face.
- **The `misconception` tag.** `08-transfer/go-to-cpp` holds Cards whose
  front is a plausible, wrong belief carried over from Go, each with an
  `elaborate` prompt; a handful of Cards elsewhere carry the tag for the
  same reason. Filtering Browse on it gives "what I am most likely to have
  wrong".
- **`trace` Cards were run.** Expected values come from compiling and
  running an instrumented copy, not from reasoning; implementation-defined
  results (e.g. `vector` growth) are flagged on the Card.
- **Versions.** Ids never change. Bump `version` only when a Card's
  question changes meaning or its Kind changes.

## Validating

From the repository root, with both Decks so cross-Deck `requires` resolve:

```sh
tool/validate cpp-core algo-systems
scripts/check-code cpp-core              # compile-graded Cards
```
