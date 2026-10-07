---
id: foundations-utilisation-knee
kind: basic
version: 1
level: 4
tags: [cost-model, throughput, low-latency, databases]
elaborate: At what utilisation does your hottest service run at peak? Which knob — admission control, more servers, shorter service time — would move it off the knee?
refs:
  - https://en.wikipedia.org/wiki/M/M/1_queue
  - https://doi.org/10.1287/opre.9.3.383
---

## A single-server queue with random (Poisson) arrivals runs at 90 % utilisation, so it is "not full". Why is its latency already terrible?

---

**Waiting grows as ρ/(1−ρ) service times: 9 at 90 %, against 1 at 50 %.**
At 99 % it is 99. Random bursts pile up faster than they drain (evenly
spaced arrivals would never wait). The knee sits around 70–80 %, so hot
paths run deliberately under-utilised.
