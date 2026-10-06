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
value or by `auto&&` and never copied into a second variable.

Two consequences catch people out. Calling {{c3::begin()::which resumes
the coroutine far enough to produce the first element}} does real work
and may throw whatever the body throws, and it may be called only once
per generator. And because the elements live in the frame rather than in
a container, `std::generator<T>` hands out {{c4::references into the
coroutine frame::reference is T&& by default, valid only until the next
increment}} — perfectly safe to read in the loop body, dangling the
moment you advance.
