---
id: fmt-explain-format
kind: explain
version: 2
level: 2
tags: [strings, format]
requires:
  - fmt-positional-trace
  - fmt-precision-trace
  - fmt-misconception-checked-late
  - fmt-print-cloze
elaborate: Numbered and bare braces cannot be mixed in one string. Which message in your own code would read better with positions?
refs:
  - https://en.cppreference.com/w/cpp/utility/format/format
  - https://en.cppreference.com/w/cpp/utility/format/spec
  - https://en.cppreference.com/w/cpp/io/print
---
A colleague still builds messages with `+` and `std::to_string`. Explain what `std::format` and `std::print` give them instead.
---
- [ ] One format string shows the output's shape; each `{}` takes the next argument, converted to text by its type
- [ ] `{0}`, `{1}` pick arguments by position from 0, so one can be reordered or repeated
- [ ] After `:`, a spec sets one argument's width, fill, alignment or precision
- [ ] A literal format string is checked against the arguments at compile time, so a mismatch fails the build
- [ ] C++23 `std::print` takes the same format string and writes to standard output without building a `std::string`
