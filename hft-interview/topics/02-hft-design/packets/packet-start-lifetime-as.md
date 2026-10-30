---
id: packet-start-lifetime-as
kind: basic
version: 1
level: 4
tags: [packets, lifetime, c++23]
requires:
  - packet-reinterpret-ub
  - cpp-essentials/layout-alignment
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/obj.lifetime#2
  - https://en.cppreference.com/w/cpp/memory/start_lifetime_as
  - https://wg21.link/P2590R2
elaborate: The IP header behind a 14-byte Ethernet header has the same problem; how do NIC drivers and kernels usually avoid it?
---

```cpp
struct Ip { std::uint32_t w0, w1, w2, src, dst; };
alignas(64) unsigned char frame[2048];                 // filled by recv()
const Ip* ip = std::start_lifetime_as<Ip>(frame + 14);   // after the Ethernet header
```

## C++23's `std::start_lifetime_as` creates an `Ip` there whose value is the bytes already present. Which precondition does this call still violate?

---

**Alignment: `frame + 14` is 2 bytes past a multiple of 4, so it isn't aligned for `Ip`.**
The function fixes the missing object: it makes the returned pointer
point at the new `Ip`, which a plain cast doesn't. It doesn't fix the
address. `memcpy` into a local `Ip` has no alignment precondition.
C++23; test `__cpp_lib_start_lifetime_as`.
