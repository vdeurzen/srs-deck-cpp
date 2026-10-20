---
id: compiler-liveness-trace
kind: trace
version: 2
level: 4
tags: [compilers, dataflow, registers, tracing]
probes:
  1: { "live": "{a, c}" }
  2: { "live": "{a, b}" }
  3: { "live": "{a}" }
requires:
  - compiler-liveness
  - interview-essentials/std-set-multiset
  - cpp-essentials/lambda-amp-capture-intro
refs:
  - https://en.wikipedia.org/wiki/Live-variable_analysis
  - https://suif.stanford.edu/~courses/cs243/
elaborate: Which pair of these four values could share one register?
---

```cpp
// Block: b = a + 1;  c = a * b;  a = a + c;  return a;
// Walk it backwards; write each set as {x, y}.
std::set<char> live;                    // after `return a`: nothing
auto before = [&](char def, std::string uses) {
  live.erase(def);
  for (char u : uses) live.insert(u);
};
before(0,   "a");   // return a
before('a', "ac");  // @1 a = a + c
before('c', "ab");  // @2 c = a * b
before('b', "a");   // @3 b = a + 1
```

---

Each step applies one instruction's backward transfer: **kill the
definition, then add the uses**. Probe 1 is the point: `a = a + c`
kills `a` and reads it again, so `a` stays live. Adding the uses first
would drop it. `c` is live only between its definition and its use, and
probe 3 is the block's `live_in`. Values from an instrumented run,
GCC 16.2.
