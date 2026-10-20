---
id: raii-storage-durations
kind: cloze
version: 1
level: 1
tags: [lifetime, raii, storage-duration]
requires:
  - life-stack-vs-heap
elaborate: Which object in your code has static duration, and when is it destroyed relative to `main`?
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration
  - https://timsong-cpp.github.io/cppwp/n4950/basic.stc.general
---

Every object's storage duration fixes when it is destroyed. A local
declared inside a block has {{c1::automatic}}
storage duration: it is destroyed, destructor and all, when control leaves
the block, however it leaves. An object created with `new` has
{{c2::dynamic}} storage duration and lives until
the matching `delete`, which is why a forgotten `delete` is a leak. A
namespace-scope variable (one declared outside every function) has {{c3::static}} storage
duration: it lives for the whole program and is destroyed after `main`
returns.
