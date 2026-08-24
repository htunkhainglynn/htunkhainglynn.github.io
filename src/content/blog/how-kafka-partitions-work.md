---
title: "How Kafka Partitions Actually Work"
description: "My notes on Kafka partitions, replication, ordering, and the design choices they force us to make."
publishedDate: 2026-08-24
updatedDate: 2026-08-24
tags:
  - Kafka
  - Distributed Systems
draft: false
---

A Kafka topic is not one ordered log. It is a collection of **partitions**, and each partition is an ordered, append-only sequence of records. That distinction explains most of Kafka's useful properties—and many of the surprises teams encounter in production.

> A partition is simultaneously a unit of ordering, storage, replication, and parallelism.

## The partition is the log

Every record in a partition receives an offset. The offset identifies a position inside that partition; it is not a timestamp and it has no meaning in another partition.

```text
orders-0: [0][1][2][3][4]
orders-1: [0][1][2]
orders-2: [0][1][2][3]
```

If a topic has three partitions, Kafka can process the three logs independently. That improves throughput, but there is no total order across all three.

### Keys define the ordering boundary

When a producer supplies a key, Kafka's partitioner consistently maps that key to a partition. Records for `customer-42` therefore land on the same partition and retain their relative order.

```java
var record = new ProducerRecord<String, OrderEvent>(
    "orders",
    event.customerId(),
    event
);

producer.send(record);
```

The practical design question is not “do we need ordering?” It is “**which entity needs ordering?**” An order ID, account ID, or device ID may each create a different workload shape.

## Replication is about availability

A partition has one leader and zero or more followers. Producers and consumers communicate with the leader. Followers copy its log and can become leader if the current leader fails.

| Concept | Responsibility |
| --- | --- |
| Leader | Handles reads and writes for the partition |
| Follower | Replicates the leader's log |
| ISR | Tracks replicas sufficiently caught up to be eligible leaders |
| Replication factor | Sets the number of copies of each partition |

Replication gives us redundancy, but acknowledgement settings determine what durability guarantee a producer actually observes. With `acks=all`, the leader waits for all in-sync replicas required by the broker configuration.

## Consumer groups divide the work

Within one consumer group, a partition can be assigned to at most one consumer at a time. This is what lets consumers scale while preserving partition order.

```text
3 partitions + 1 consumer  = one consumer handles all partitions
3 partitions + 3 consumers = one partition per consumer
3 partitions + 5 consumers = two consumers remain idle
```

Adding consumers beyond the partition count does not increase parallelism for that group. Increasing partitions can, but it also changes key distribution and raises the operational cost borne by brokers and consumers.

## What the model implies

The core tradeoffs are connected:

1. **More partitions** create more potential throughput and consumer parallelism.
2. **Ordering** exists only within a partition.
3. **Key choice** decides which records share that order and load.
4. **Replication** protects each partition, not the topic as an abstract whole.
5. **Retries** can still create duplicates, so consumers should be idempotent.

Kafka is easier to reason about once a topic stops looking like a queue and starts looking like a set of replicated logs. From there, partition count and key choice become domain decisions—not configuration trivia.
