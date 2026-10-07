---
id: ll-huge-page-ratio
kind: cloze
version: 1
level: 3
tags: [low-latency, memory-hierarchy, os]
requires:
  - ll-page-walk-depth
refs:
  - https://www.kernel.org/doc/html/latest/admin-guide/mm/hugetlbpage.html
---

One TLB entry maps one page, so a 2 MiB huge page lets an entry cover
{{c1::512×::a power of two}} the memory a 4 KiB page does.

---

2 MiB / 4 KiB = 2⁹. A 1 GiB page is 512× again (262,144× a 4 KiB page).
