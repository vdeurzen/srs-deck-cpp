---
id: raii-storage-durations
kind: cloze
version: 1
level: 1
tags: [lifetime, raii, storage-duration]
refs:
  - https://en.cppreference.com/w/cpp/language/storage_duration
  - https://timsong-cpp.github.io/cppwp/n4950/basic.stc.general
---

Every object's storage duration fixes when it is destroyed. A local
declared inside a block has {{c1::automatic::the enclosing block decides}}
storage duration: it is destroyed, destructor and all, when control leaves
the block, however it leaves. An object created with `new` has
{{c2::dynamic::nothing ends it but you}} storage duration and lives until
the matching `delete`, which is why a forgotten `delete` is a leak. A
namespace-scope variable has {{c3::static::one per program}} storage
duration: it lives for the whole program and is destroyed after `main`
returns.
