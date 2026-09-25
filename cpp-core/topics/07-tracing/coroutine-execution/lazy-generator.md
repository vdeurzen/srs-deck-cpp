---
id: trace-coroutine-lazy-generator
kind: trace
version: 1
level: 3
tags: [tracing, coroutines]
probes:
  1: { produced: "0" }
  2: { produced: "1", "gen.value()": "10", more: "true" }
  3: { produced: "2", "gen.value()": "20", more: "true" }
  4: { produced: "3", more: "false" }
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_yield
---

```cpp
// Generator<T> is the hand-rolled skeleton from the parsons Card:
// initial_suspend is suspend_always, yield_value stores the value in
// the promise and suspends, and next() resumes then returns !done().
int produced = 0;

Generator<int> numbers() {
  produced = 1;
  co_yield 10;
  produced = 2;
  co_yield 20;
  produced = 3;
}

int main() {
  auto gen = numbers();       // @1
  bool more = gen.next();     // @2
  more = gen.next();          // @3
  more = gen.next();          // @4
}
```

---

Each `next()` buys exactly one more segment of the body. Creating the
generator runs none of it — `produced` is still `0` — because
`initial_suspend()` suspended first. The first `next()` runs up to and
including `co_yield 10`, so `produced` is `1` and the value is `10`;
the second picks up *after* that `co_yield` and stops at the next one.

The last `next()` is the interesting one: it runs the tail of the body
(`produced = 3`), falls off the end, and suspends at `final_suspend`,
so `done()` is true and `next()` reports `false`. The third value never
existed — the coroutine's last act was to update a variable, not to
yield. A consumer that loops `while (gen.next())` therefore executes
everything after the final `co_yield` and then stops, which is where
cleanup code in a generator body actually runs.

Verified by compiling and running this program, with the parsons Card's
`Generator<T>`, under GCC 13.3 (`g++ -std=c++23`).
