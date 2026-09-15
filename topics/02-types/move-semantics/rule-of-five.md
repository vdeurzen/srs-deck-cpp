---
id: move-semantics-rule-of-five
kind: basic
version: 1
level: 2
tags: [move-semantics]
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three
---

## What is the "Rule of Five", and when does a class need to obey it?

If a class manages a resource directly (owns a raw pointer, a file
handle, and so on) and therefore needs a user-defined **destructor**, it
almost certainly also needs a user-defined **copy constructor**, **copy
assignment**, **move constructor**, and **move assignment** — five special
members that all exist to answer the same question, "what happens to the
resource when this object is copied, moved, or destroyed".

Declaring only some of the five is dangerous: declaring a destructor
suppresses the implicitly-generated move members, silently falling back to
copying (or worse, a double-free from a shallow default copy) wherever a
move was expected. The **Rule of Zero** is the preferred escape: hold the
resource in a member that already manages itself (`std::unique_ptr`,
`std::vector`, ...) and declare none of the five at all.
