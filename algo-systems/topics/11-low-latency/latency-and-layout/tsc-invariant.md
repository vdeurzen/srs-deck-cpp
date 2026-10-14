---
id: ll-tsc-invariant
kind: basic
version: 1
level: 5
tags: [low-latency, measurement, x86]
requires:
  - ll-rdtsc-ordering
refs:
  - "Intel 64 and IA-32 Architectures Software Developer's Manual, Vol. 3B, §17.17 Time-Stamp Counter (§17.17.1 Invariant TSC; numbering varies by edition): https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html"
  - https://www.kernel.org/doc/html/latest/virt/kvm/x86/timekeeping.html
---

## A latency logger converts `rdtsc` deltas to nanoseconds with one fixed ticks-per-ns constant. Which CPU property must hold for that constant to survive frequency changes and idle states?

---

**An invariant TSC: CPUID leaf 80000007H, EDX bit 8 (Linux shows
`constant_tsc nonstop_tsc`).** Older TSCs ticked with the core clock or
stopped in deep C-states. In a VM, check the flag is exposed. Take
ticks-per-ns from calibration, not the nominal GHz in the CPU name.
Invariance fixes the rate, not agreement across sockets.
