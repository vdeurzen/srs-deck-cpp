---
id: fn-qualified-name
kind: code
version: 1
level: 1
tags: [functions, namespaces, name-lookup]
input: chips
choices:
  c1: ["sensor_b::id", "id", "::id", "sensor_b.id"]
compile:
  harness: |
    static_assert(probe == 9);
    int main() {}
requires:
  - fn-namespace-clash
refs:
  - https://en.cppreference.com/w/cpp/language/namespace
  - https://en.cppreference.com/w/cpp/language/qualified_lookup
---

Initialise `probe` with 9, by calling the function that returns it.

```cpp
namespace sensor_a { constexpr int id() { return 7; } }
namespace sensor_b { constexpr int id() { return 9; } }

constexpr int probe = {{c1::sensor_b\::id}}();
```

---

A name declared inside a namespace is found by its plain name only inside
that namespace. Outside it you write a **qualified name**, `ns::name`.
Plain `id` and `::id` both look in the global namespace, which has no
`id`. `sensor_b.id` is Go or Java habit: `.` selects a member of an
object, and a namespace is not an object.
