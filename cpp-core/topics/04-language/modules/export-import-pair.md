---
id: modules-export-import-pair
kind: chunk
version: 1
level: 2
tags: [modules, idioms]
expose_ms: 7000
compile: null
requires:
  - modules-interface-unit-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/modules
---

```cpp
// geometry.cppm
export module geometry;
export double area(double r) { return 3.14159 * r * r; }
// main.cpp
import geometry;
int main() { return area(1.0) > 3.0 ? 0 : 1; }
```

---

The smallest module: an interface unit that names the module and exports a
function, and a client that imports it. `export module` declares the unit;
`export` on `area` makes it visible; `import` makes it usable without any
header. Graded by text: the compile service builds a single file, and a
module's interface must be built before its importer.
