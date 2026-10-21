---
id: str-go-strings-and-bytes
kind: basic
version: 3
level: 3
tags: [strings, hashing, memory]
elaborate: Which hot-path lookup in your code builds a temporary key just to search, and what does that cost when the key is longer than 15 characters?
requires:
  - cpp-essentials/strings-string-view-intro
  - cpp-essentials/map-unordered-map-intro
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/find
  - https://wg21.link/p0919r3
---

A tokenizer looks up each token in `std::unordered_map<std::string, int> kw`.
`tok` is a `std::string_view` into the input.

```cpp
auto it = kw.find(tok);               // does not compile
auto it = kw.find(std::string(tok));  // compiles, builds a string per lookup
```

## In C++20, what lets `kw.find(tok)` compile and search without building a `std::string`?

---

**A hash and an equality that declare `is_transparent`: heterogeneous lookup.**

```cpp
struct StrHash { using is_transparent = void;
  size_t operator()(std::string_view s) const { return std::hash<std::string_view>{}(s); } };
std::unordered_map<std::string, int, StrHash, std::equal_to<>> kw;
```

`find` then hashes and compares the view directly; no allocation.
