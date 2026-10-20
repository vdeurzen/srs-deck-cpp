---
id: technique-termination-gcd-trace
kind: trace
version: 1
level: 1
tags: [foundations, termination, tracing]
requires:
  - technique-termination-measure
elaborate: Say in one sentence, as to an interviewer, which value shrinks on every pass of a loop you wrote recently, and why it cannot shrink forever.
probes:
  1: { a: "18", b: "12" }
  2: { a: "12", b: "6" }
  3: { a: "6", b: "0" }
refs:
  - https://en.wikipedia.org/wiki/Euclidean_algorithm
---

Euclid's algorithm on 48 and 18, one iteration per `step()`.

```cpp
int a = 48, b = 18;

void step() {   // called while b != 0
  int t = a % b;
  a = b;
  b = t;
}

int main() {
  step();   // @1
  step();   // @2
  step();   // @3
}
```

---

`b` goes 18 → 12 → 6 → 0, smaller every time, because a remainder is
always below its divisor. When it hits 0 the loop stops and
`a = 6 = gcd(48, 18)`. The value of `b` bounds how many iterations can
remain.

(Values from running an instrumented copy under GCC 16.2.)
