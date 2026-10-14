---
id: packet-lifetime-contrast
kind: basic
version: 1
level: 5
tags: [packets, lifetime, launder, c++23]
requires:
  - packet-start-lifetime-as
  - cpp-core/storage-launder
refs:
  - https://timsong-cpp.github.io/cppwp/n4950/obj.lifetime#3
  - https://timsong-cpp.github.io/cppwp/n4950/ptr.launder#2
  - https://timsong-cpp.github.io/cppwp/n4950/intro.object#13
elaborate: If you copy the header into a local `Hdr` with `std::memcpy`, do you need either call? Why?
---

```cpp
struct Hdr { std::uint32_t seq; std::uint16_t len, type; };
alignas(Hdr) unsigned char buf[2048];                     // filled by recv()
const Hdr* a = std::start_lifetime_as<Hdr>(buf);
const Hdr* b = std::launder(reinterpret_cast<const Hdr*>(buf));
```

## Both lines yield a `const Hdr*` to `buf[0]`. What does `start_lifetime_as` do there that `launder` does not?

---

**It creates a `Hdr` whose object representation is the bytes already in `buf`.**
`launder` creates nothing: it only works if a `Hdr` already lives
there, and nothing guarantees one holds the received bytes, so `b` is
at best unspecified for bytes `recv()` wrote.
