---
title: "DDIA Second Edition: Chapter 2 Recap"
description: "My notes on nonfunctional requirements: performance, reliability, scalability, and building software that stays pleasant to operate and change."
publishedDate: 2026-08-28
tags:
  - DDIA
  - System Design
  - Reliability
draft: false
---

Chapter 2 is about the requirements users rarely type into a feature ticket but absolutely notice when they are missing: speed, reliability, scalability, and maintainability.

A button may do the correct thing, but if it takes thirty seconds, fails every Tuesday, or requires three engineers and a lucky mug to deploy, the system still has work to do.

These are my notes from **Designing Data-Intensive Applications, Second Edition** by Martin Kleppmann and Chris Riccomini.

## Functional requirements tell us what; nonfunctional requirements tell us how well

A functional requirement says what the software should do: publish a post, transfer money, or show a home timeline.

A nonfunctional requirement describes the quality of that experience. The timeline should load quickly. The transfer should not disappear if a server fails. The system should handle a growing audience, and the team should be able to change it without summoning chaos.

Words like “fast” and “reliable” are nice intentions, but they are not yet useful requirements. We need to ask:

- Fast for whom, and at what percentile?
- Reliable under which failures?
- Scalable across which load dimension?
- Maintainable for which team and type of change?

Specific questions turn good vibes into engineering decisions.

## A timeline is a tiny architecture lesson

The chapter uses a social-network home timeline to show how one feature can have very different implementations.

One approach builds the timeline when a user opens the app. The system finds everyone they follow, fetches those users' posts, and merges the results. This keeps publishing cheap but makes reading do more work. It is often called **fan-out on read**.

Another approach prepares timelines when a post is published. The system writes that post into each follower's timeline so later reads are quick. This is **fan-out on write**.

```text
Fan-out on read:  cheap writes → assemble results at read time
Fan-out on write: more writes → serve prepared results at read time
```

Neither option wins every time. A celebrity with millions of followers makes fan-out on write expensive. A quiet account with a few friends is easy. Real systems can mix both approaches: precompute most timelines, then merge unusually popular accounts during reads.

The lesson is bigger than social media. **The shape of the load decides whether work belongs on the write path, the read path, or somewhere in between.**

## Performance is a distribution, not one number

Latency is how long one request waits. Throughput is how much work the system completes in a period of time. They are related, but they answer different questions.

An average response time can hide unhappy users. Imagine ten requests: nine finish in 100 ms, while one takes 5 seconds. The average moves upward, but it does not clearly show that one person had enough time to reconsider every life choice that led to clicking the button.

Percentiles describe the distribution better:

- **p50** is the median experience.
- **p95** shows the boundary for most requests.
- **p99** exposes the slow tail experienced by roughly one in a hundred requests.

Tail latency matters because one user action may depend on many backend calls. Even if each dependency is usually quick, the chance that at least one call is slow grows as the number of calls grows.

A useful performance target therefore names the workload and percentile, such as “p95 response time below 300 ms at 1,000 requests per second.” Now we have something we can test.

## Reliability means staying correct when things go wrong

A fault is one component behaving unexpectedly. A failure is the overall service no longer meeting its promise. Fault-tolerant design accepts that faults will happen and tries to stop them from becoming user-visible failures.

Faults come in several flavors:

- **Hardware faults:** disks fail, machines lose power, and networks misbehave.
- **Software faults:** a bug, bad configuration, or resource leak can affect many machines at once.
- **Human errors:** people deploy mistakes, misunderstand dashboards, and occasionally press the exciting button.

The answer is not to demand flawless humans. Better systems make safe actions easy and dangerous actions difficult. Clear monitoring, gradual rollouts, automated tests, useful runbooks, and quick rollback paths all help.

Reliability also needs a boundary. We may tolerate one machine failing, but do we also need to survive a whole region? More protection costs more, so the promise should match the real consequences of downtime or incorrect data.

## Scalability begins by describing load

“Will it scale?” is too vague to answer. First we need **load parameters** that describe what is growing.

For one system, the important number may be requests per second. For another, it might be active users, writes per account, records per day, fan-out size, or the ratio of reads to writes.

Once the load is named, we can ask how performance changes as that load increases and what resources are needed to keep the experience steady.

The chapter compares three broad ways machines can share work:

| Architecture | Basic idea | Main trade-off |
| --- | --- | --- |
| Shared memory | Processors use the same memory | Simple communication, limited scale |
| Shared disk | Machines have separate memory but common storage | Easier data sharing, storage can become a bottleneck |
| Shared nothing | Each node owns its memory and storage | Greater horizontal scale, harder coordination |

Scaling up means giving one machine more resources. Scaling out means adding machines. Many systems use both. The right answer depends on load, cost, reliability goals, and how much distributed complexity the team is ready to own.

## Maintainability is kindness to future-us

Most software cost arrives after the first release. The chapter groups maintainability into three ideas that feel wonderfully practical.

### Operability

Make the system pleasant to run. It should expose its health, support routine automation, provide useful diagnostics, and behave predictably during maintenance.

### Simplicity

Manage accidental complexity. Good abstractions hide details that callers should not need to understand. Clear boundaries and familiar patterns give engineers more brain space for the actual business problem.

Simplicity does not mean the problem is easy. It means the design is not adding extra puzzles just to feel clever.

### Evolvability

Make change affordable. Requirements will move, traffic will grow, and better tools will appear. Loose coupling, compatible data formats, focused tests, and small deployable changes let the system adapt without a dramatic rewrite every year.

## What I’m taking with me

- Turn vague quality words into measurable targets.
- Look at latency percentiles, not just averages.
- Design for faults so they do not automatically become failures.
- Treat human error as a system-design input, not a character flaw.
- Describe the load before claiming a system is scalable.
- Optimize architecture for both users and the people operating it.
- Keep systems simple enough to understand and flexible enough to change.

My biggest takeaway is that nonfunctional requirements are not bonus polish. They are part of the product. A feature is truly finished when it works, keeps working, and does not make the next engineer sigh before opening the repository.

Book details and the official chapter outline are available on [O'Reilly](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/).
