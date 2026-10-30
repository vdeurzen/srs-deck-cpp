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

- [ ] A `const std::string&` parameter given a literal builds a temporary string, copying every character
- [ ] A `string_view` is just a pointer and a length into characters that someone else owns
- [ ] Even `substr` on a view copies nothing; the result points into the same characters
- [ ] A view owns nothing, so returning one into a local `std::string` dangles
- [ ] A view's `data()` need not be null-terminated, so code reading to a `'\0'` runs past its end
