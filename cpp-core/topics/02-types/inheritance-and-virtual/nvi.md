---
id: virtual-nvi
kind: code
version: 1
level: 4
tags: [inheritance, virtual, idioms]
input: chips
choices:
  c1: ["private", "public"]
compile:
  harness: |
    template <class T>
    concept CanCallStep = requires(T& t) { t.do_run(); };
    static_assert(!CanCallStep<Job>);
    static_assert(!CanCallStep<Backup>);
    int main() {
        Backup b;
        b.run();
    }
requires:
  - virtual-override-keyword
elaborate: Where else would a non-virtual public function that wraps a private virtual step let a base class enforce logging or locking?
refs:
  - http://www.gotw.ca/publications/mill18.htm
  - https://en.cppreference.com/w/cpp/language/access
---

Callers go through `run()`, which checks a precondition around the
customisable step. Choose the step's access.

```cpp
class Job {
public:
    void run() { if (ready()) do_run(); }
    virtual ~Job() = default;
    bool ready() const { return true; }
{{c1::private}}:
    virtual void do_run() = 0;
};
class Backup : public Job { void do_run() override {} };
```

---

**Non-Virtual Interface**: the public function is non-virtual and owns the
contract (checks, logging, locking); the virtual step is private, so derived
classes customise *how* but cannot skip the checks. A derived class can
still override a private virtual, it just cannot call it. Use `protected`
only if overrides must call the base implementation.
