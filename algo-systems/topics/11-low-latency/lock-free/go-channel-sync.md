---
id: ll-go-channel-sync
kind: cloze
version: 1
level: 3
tags: [go, concurrency, memory-model]
requires:
  - ll-go-blocking-basics
  - cpp-core/atomics-synchronizes-with
refs:
  - https://go.dev/ref/mem
---

The Go memory model: a send on a channel is
{{c1::synchronized before::a happens-before building block}}
the completion of the corresponding receive. So everything the sender
wrote before `ch <- p` is visible to the receiver after `p := <-ch`, which
is why a pointer can be passed through a channel with no further locking
— the role a {{c2::release store::a C++ atomic operation and its order}}
plays when a C++ queue publishes a slot.

---

Go 1.19 restated its memory model in the C++ style: *synchronized before*
plus *sequenced before* gives *happens before*. The sender must not
touch the object again after the send; ownership moved.
