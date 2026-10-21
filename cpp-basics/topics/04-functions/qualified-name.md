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
  - cpp-essentials/fn-namespace-clash
elaborate: Where would two libraries you use both declare the same name, and why does qualifying it beat a `using namespace` directive there?
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
`id`. `sensor_b.id` is the Go package-selector habit: in C++ `.`
selects a member of an object, and a namespace is not an object.
