---
id: seq-go-slice-window
kind: code
version: 2
level: 3
requires:
  - seq-go-subslice-capacity
  - cpp-essentials/constexpr-fn-static-assert
tags: [buffers, views, lifetime]
input: chips
choices:
  c1: ["std::string", "std::string_view", "const char*", "std::span<const char>"]
compile:
  harness: |
    constexpr bool check() {
      Session s;
      {
        std::string buf = "AB12 and a message body past the small buffer";
        keep_id(s, buf);
      }                                   // buf is freed here
      return s.id == "AB12";
    }
    static_assert(check());
    int main() {}
elaborate: Say what this copy costs per session, and why it is still cheaper than keeping the message buffer alive.
refs:
  - https://en.cppreference.com/w/cpp/string/basic_string
  - https://en.cppreference.com/w/cpp/string/basic_string_view
---

`keep_id` stores a session's 4-byte id from a message whose buffer is
freed right after the call. Complete the member type so `s.id` stays
readable afterwards.

```cpp
#include <string>
#include <string_view>
struct Session {
    {{c1::std\::string}} id;
};
constexpr void keep_id(Session& s, std::string_view msg) {
    s.id = msg.substr(0, 4);
}
```

---

**Only `std::string` owns a copy of the bytes.** A `string_view` or
`span` member keeps a pointer into the freed buffer, so reading `s.id`
later is undefined behaviour; `const char*` cannot be assigned from a `string_view` at all.
