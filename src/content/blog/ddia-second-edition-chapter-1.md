---
title: "DDIA Second Edition: Chapter 1 Recap"
description: "My friendly recap of trade-offs in data systems architecture: OLTP, analytics, cloud choices, distributed systems, and why context always wins."
publishedDate: 2026-08-27
tags:
  - DDIA
  - System Design
  - Data Systems
draft: false
---

Chapter 1 opens with an idea I want to keep taped near my desk: **architecture is a collection of trade-offs, not a hunt for one perfect tool**.

That sounds obvious until a shiny database, cloud service, or architecture diagram walks into the room and promises to solve everything. The chapter gives us a calmer way to think. Start with the job the system must do, understand the costs of each option, and choose the trade-offs that fit.

These are my notes from **Designing Data-Intensive Applications, Second Edition** by Martin Kleppmann and Chris Riccomini.

## Data-intensive is not the same as compute-intensive

A compute-intensive application spends most of its energy doing difficult calculations. A data-intensive application is challenged by the amount, shape, speed, or complexity of the data it stores and moves.

For data-intensive software, the tricky questions usually sound like this:

- Where should the data live?
- How quickly must it be available?
- Which copy is the source of truth?
- What happens when part of the system is unavailable?
- How do we support both everyday product traffic and big analytical questions?

That last question leads to the first major split in the chapter.

## Operational and analytical systems have different personalities

**Operational systems** handle the application's daily work. They serve lots of small reads and writes: creating an order, checking a balance, updating a profile, or recording a payment. This is the world usually described as online transaction processing, or OLTP.

**Analytical systems** look across large collections of data to find patterns. Their queries may scan millions of records, join multiple datasets, and calculate trends over months or years.

Trying to make one database equally wonderful at both jobs can create a grumpy system. A heavy report can compete with customer transactions for CPU, memory, and storage bandwidth. Separating the workloads lets each side use a design that suits it.

My mental model is simple:

| Workload | Typical question | What it wants |
| --- | --- | --- |
| Operational | “What is this customer's current balance?” | Fast, small, concurrent reads and writes |
| Analytical | “How did transaction volume change by region this quarter?” | Large scans, aggregation, and historical context |

Neither is more important. They are just solving different problems.

## Systems of record and derived data

The **system of record** holds the authoritative version of information. If two places disagree, this is the place we trust.

**Derived data** is created from that source: a search index, cache, materialized view, recommendation model, or data warehouse table. Derived data is incredibly useful because it makes a particular read or analysis faster. The lovely part is that, in principle, it can be rebuilt from the source.

This distinction makes architecture conversations much clearer. Before adding another datastore, I should ask:

1. Is it authoritative or derived?
2. How does it receive changes?
3. How stale may it be?
4. How would we rebuild it after a bad day?

If nobody knows the source of truth, every incident becomes a detective story—and not the fun kind.

## Cloud versus self-hosting

Cloud services trade some control for convenience. Managed databases, object storage, and queues can remove a mountain of setup and operational work. They also bring provider limits, ongoing cost, data-location questions, and the risk of depending too deeply on one vendor's special features.

Self-hosting offers more control over hardware, configuration, upgrades, and placement. That control is valuable when the workload, regulation, or cost profile demands it. It also means the team owns more of the maintenance and failure recovery.

So “cloud or not?” is not a personality test. It is a decision based on team size, expertise, regulation, workload shape, cost, and how much operational responsibility we truly want to carry.

Cloud-native architecture also changes operations. Infrastructure is programmable, resources can be temporary, and systems are often assembled from managed pieces. That makes automation and observability even more important: if servers come and go, we cannot rely on someone remembering which special machine needs a gentle restart.

## Distributed versus single-node systems

A single machine is wonderfully easy to reason about. Calls are local, state is close by, and partial network failures are not invited to the party.

Distribution becomes useful when one machine is no longer enough, when the service must survive a machine or location failing, or when users need low latency in different regions. But every extra node introduces coordination, network delays, partial failures, and more operational surface area.

The cheerful but important reminder: **distribution should pay rent**. If a well-sized single node meets the requirements, using it can be a strong engineering choice. If we distribute, we should be able to name the requirement that justifies the complexity.

## Microservices, serverless, and supercomputing

Microservices split an application into independently deployed services. This can help teams own clear boundaries and scale parts separately, but it turns local calls into network calls and makes data consistency harder.

Serverless platforms push more infrastructure work to a provider and can scale nicely for bursty workloads. In exchange, we accept platform constraints, less control, and sometimes unpredictable latency or cost.

Supercomputing solves a different kind of problem: tightly coordinated, computation-heavy work where machines often operate together on one large calculation. Typical cloud applications are more loosely coupled and spend much of their time storing, retrieving, and moving data.

These labels are useful only when they help explain the workload. “Modern” is not a requirement.

## Architecture has human consequences

The chapter ends by widening the lens. Data systems are not only technical machinery. They affect privacy, power, safety, accessibility, energy use, and the people represented by the data.

That means legal and social questions belong in architecture discussions early. Where is personal data stored? Who can access it? How long is it retained? Could a derived model create unfair outcomes? A system can be technically impressive and still be the wrong thing to build.

## What I’m taking with me

- Begin with requirements, not products.
- Separate operational and analytical workloads when their needs pull in different directions.
- Name the system of record and treat every other view as derived.
- Choose cloud services intentionally; convenience and control both have a price.
- Keep a system on one node until there is a real reason to distribute it.
- Include people, law, and society in the definition of a “good” architecture.

My favorite lesson is that good engineering is less about knowing the fanciest answer and more about asking the friendliest, most honest question: **what trade-off are we making, and is it the right one for this situation?**

Book details and the official chapter outline are available on [O'Reilly](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781098119058/).
