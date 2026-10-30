---
id: coroutines-generator-is-a-view
kind: cloze
version: 1
level: 4
tags: [coroutines, ranges]
requires:
  - coroutines-generator-basic
  - ranges-range-categories
refs:
  - https://en.cppreference.com/w/cpp/coroutine/generator
---

`std::generator<T>` is a range, but the weakest useful kind: it models
{{c1::input_range::a range category}} and nothing stronger, so a second
traversal is impossible and algorithms that need multiple passes will
not compile against it. It is also {{c2::move-only::a copy/move
property}}, because it owns the coroutine frame — pass it by value or by
`auto&&`. And calling {{c3::begin()::a range member
function}} does real work: it resumes the body up to the first element,
may throw whatever the body throws, and may be called only once per
generator.
