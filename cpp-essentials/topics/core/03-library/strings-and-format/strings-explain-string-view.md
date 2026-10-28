---
id: strings-explain-string-view
kind: explain
version: 2
level: 3
tags: [strings, string-view, lifetime]
requires:
  - strings-string-view-parameter
  - strings-string-view-not-null-terminated
  - strings-string-view-dangling
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string_view
  - https://en.cppreference.com/w/cpp/string/basic_string_view/data
elaborate: Find a `const std::string&` parameter in your own code; would a `std::string_view` be safe there, and why?
---

A reviewer asks why your new read-only function takes a `std::string_view`
rather than a `const std::string&`, and what a view makes you careful
about. Answer them.

---

- [ ] Problem: a `const std::string&` parameter given a literal builds a temporary string, copying every character
- [ ] Mechanism: a `string_view` is a pointer and a length into characters that someone else owns
- [ ] Example: `substr` on a view copies nothing; the result points into the same characters
- [ ] Trade-off: a view owns nothing, so returning one into a local `std::string` dangles
- [ ] Pitfall: a view's `data()` is not null-terminated, so code reading to a `'\0'` runs past its end
