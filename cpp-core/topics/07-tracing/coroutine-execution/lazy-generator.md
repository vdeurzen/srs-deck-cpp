---
id: trace-coroutine-lazy-generator
kind: trace
version: 2
level: 3
tags: [tracing, coroutines]
requires:
  - trace-coroutine-lazy-generator-worked
  - coroutines-eager-vs-lazy-start
elaborate: Say in one sentence, as to an interviewer, where cleanup code in a generator's body runs when the consumer loops `while (gen.next())`.
probes:
  1: { produced: "0" }
  2: { produced: "2", "gen.value()": "20" }
  3: { produced: "3", more: "false" }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_yield
---

`IntGen` is a lazy generator: `initial_suspend`, `yield_value` and
`final_suspend` all return `std::suspend_always`. `gen.next()` resumes
the body and returns `!done()`; `gen.value()` is the last yielded value.

```cpp
int produced = 0;

IntGen numbers() {
  produced = 1;
  co_yield 10;
  produced = 2;
  co_yield 20;
  produced = 3;
}

int main() {
  auto gen = numbers();       // @1
  bool more = gen.next();
  more = gen.next();          // @2
  more = gen.next();          // @3
}
```

---

Creating the generator runs none of the body, because `initial_suspend()`
suspended first: `produced` is still `0`. The first `next()` runs up to
`co_yield 10`; the second picks up *after* it and stops at `co_yield 20`,
so `produced` is `2` and the value is `20`. The third runs the tail
(`produced = 3`), falls off the end and suspends at `final_suspend`:
`done()` is true, so `next()` reports `false`, with no third value.
Verified by compiling and running this program, with `IntGen` written out
as described, under GCC 16.2 (`g++ -std=c++23`).
