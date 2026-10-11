---
id: fmt-misconception-checked-late
kind: basic
version: 1
level: 2
tags: [strings, format, misconception]
requires:
  - fmt-spec-trace
elaborate: Which printf or string-building call in your code could have a mismatch between what it asks for and what it is given, and who would find out?
refs:
  - https://en.cppreference.com/w/cpp/utility/format/basic_format_string
  - https://eel.is/c++draft/format.string.general
---

## `{:d}` asks for an integer, but `id` is a `std::string`. When is the mismatch reported?

```cpp
std::string id = "A17";
std::string s = std::format("item {:d}", id);
```

---

**When the program is compiled: the build fails.** A literal format
string is checked at compile time against the types of the arguments,
so a spec, count or position that cannot match never reaches run time.
`printf("%d", ...)` given a string compiles anyway and is undefined
behaviour when it runs, the habit this check breaks.
