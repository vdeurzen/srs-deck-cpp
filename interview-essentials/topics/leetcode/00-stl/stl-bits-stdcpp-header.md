---
id: stl-bits-stdcpp-header
kind: basic
version: 1
level: 1
tags: [stl, foundations, headers]
requires:
  - cpp-essentials/std-names-and-headers
refs:
  - https://gcc.gnu.org/onlinedocs/libstdc++/manual/using_headers.html
  - https://en.cppreference.com/w/cpp/headers
elaborate: Say to an interviewer why you would write the real headers in production code even though this line compiles on LeetCode.
---

Competitive-programming solutions often start with one line and no
other `#include`:

```cpp
#include <bits/stdc++.h>
std::vector<int> v{3, 1};
```

## With GCC, which standard headers does that one line include?

---

**All of them: it is GCC's internal header that includes the whole standard library.**
It is not part of the C++ standard, so MSVC, and Clang with libc++,
reject it, and it slows every build. Use it only where the judge runs
GCC; elsewhere include the headers you use.
