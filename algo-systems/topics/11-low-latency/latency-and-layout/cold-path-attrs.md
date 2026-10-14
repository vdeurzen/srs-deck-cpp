---
id: ll-cold-path-attrs
kind: cloze
version: 1
level: 4
tags: [low-latency, layout, front-end, gcc]
requires:
  - ll-icache-layout
refs:
  - https://gcc.gnu.org/onlinedocs/gcc-14.2.0/gcc/Common-Function-Attributes.html
  - https://en.cppreference.com/w/cpp/language/attributes/likely
elaborate: Which error handler on your hot path is a plain inline function today, and what would you see in `perf annotate` after marking it?
---

GCC 14 at `-O2`, a hot loop with a rare error branch. `[[unlikely]]` on the
branch alone still lets GCC inline the handler: its block moves to the end
of the function, but its bytes stay in the function's own `.text`. Marking
the handler {{c1::`[[gnu::cold]]`::an attribute on the function}} (GCC/Clang)
is documented to optimise it for size, place it in a special subsection of
the text section, and predict every path to it unlikely. Adding
{{c2::`[[gnu::noinline]]`::a second attribute}} is the documented guarantee
that its body is never copied back into a hot caller.

---

Observed on GCC, not documented: with the handler cold, each caller's call
block is also split out into a separate `f(...) (.cold)` fragment in
`.text.unlikely`. GCC also left the cold handler out of line without
`noinline` in that test, but only `noinline` promises it.
