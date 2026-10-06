---
id: coroutines-generator-is-a-view
kind: cloze
version: 1
level: 4
tags: [coroutines, ranges]
requires:
  - coroutines-generator-basic
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---

`std::generator<T>` is a range, but the weakest useful kind: it models
{{c1::input_range::single pass — the elements are produced, not stored}}
and nothing stronger, so a second traversal is impossible and algorithms
that need multiple passes will not compile against it. It is also
{{c2::move-only::it owns the coroutine frame, so copying it would mean
two owners destroying one frame}}, which is why it is passed around by
value or by `auto&&` and never copied into a second variable. And
calling {{c3::begin()::which resumes the coroutine far enough to produce
the first element}} does real work — it may throw whatever the body
throws — and may be called only once per generator.
