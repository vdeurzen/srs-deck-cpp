---
id: value-categories-std-move-cloze
kind: cloze
version: 1
level: 2
tags: [value-categories]
requires:
  - value-categories-taxonomy
refs:
  - https://en.cppreference.com/w/cpp/utility/move
---

`std::move(x)` does {{c1::not move anything::it is just a cast}} — it is a
{{c2::static_cast to an rvalue reference::T&&}} of `x`. The result is an
{{c3::xvalue::has identity, but can still be moved from}}, which is why `x`
still has an address after `auto y = std::move(x);` even though its state
is now moved-from.
