---
id: fmt-explain-format
kind: explain
version: 1
level: 2
tags: [strings, format]
requires:
  - fmt-positional-trace
  - fmt-precision-trace
  - fmt-misconception-checked-late
  - fmt-print-cloze
refs:
  - https://en.cppreference.com/w/cpp/utility/format/format
  - https://en.cppreference.com/w/cpp/utility/format/spec
  - https://en.cppreference.com/w/cpp/io/print
---
A colleague still builds messages with `+` and `std::to_string`. Explain what `std::format` and `std::print` give them instead.
---
- [ ] One format string shows the output's shape, and each `{}` is replaced by the next argument in order
- [ ] Each argument is converted to text by its type, so no `to_string` calls and no `+` chain
- [ ] `{0}`, `{1}` pick arguments by position from 0, so one can be reordered or repeated; a string uses either numbered or bare braces, not both
- [ ] After `:` a spec controls one argument (width, fill and alignment, precision), and a literal format string is checked against the arguments at compile time, so a mismatch fails the build instead of misbehaving like `printf`
- [ ] C++23 `std::print` (`std::println` adds the newline) takes the same format string and writes to standard output without building a `std::string` first
