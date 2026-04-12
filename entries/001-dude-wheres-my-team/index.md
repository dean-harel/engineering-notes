---
title: "Dude, where's my team?"
layout: post
reading_time: "~7 min"
author: "Dean Harel"
date: 2026-03-23
---

**Date:** Mar 23, 2026 · **Reading time:** ~7 min

**Audio version:**
<audio controls style="width: 100%; max-width: 600px;">
  <source src="/entries/001-dude-wheres-my-team/dude-wheres-my-team.mp3" type="audio/mpeg">
  Your browser does not support the audio element. <a href="/entries/001-dude-wheres-my-team/dude-wheres-my-team.mp3">Download the audio file</a>.
</audio>

---
You know that scene in "Dude, Where's My Car?" where they wake up and have no memory of how they got there? They're standing in the driveway, the car is gone, and neither of them can point to the moment things went sideways. It just... happened while they weren't paying attention.

That's where I happen to find myself more and more nowadays. I open a pull request and realize I don't really want anyone to review it. Not because the code is perfect — it never really is — but because I've already _talked about it_ so much. We use OpenSpec, a spec-driven workflow where the agent and I go through research, proposal, requirements, design, and task breakdown — each artifact building on the last — before a single line of implementation gets written. And by the time the PR is up, it feels done. Reviewed. Discussed. Shipped in spirit.

So lately I catch myself thinking — dude, where's my team? Something is slipping, and it keeps slipping while we're not paying attention.

---

There are three things driving this change, and from different directions:

The first is the design phase. Front-loading design — investing in the problem before jumping to code — isn't a new idea. We've been preaching it for years. And with spec-driven workflows, we actually did it. We moved the real work upstream, into artifacts a teammate _could_ engage with. Part of what drives that rigor is a very conscious refusal to produce what Addy Osmani recently called [comprehension debt](https://medium.com/@addyosmani/comprehension-debt-the-hidden-cost-of-ai-generated-code-285a25dac57e) — code that technically works but nobody actually designed or understands. We've all seen what happens when you skip the thinking and let the agent freestyle — you get confident-looking garbage that passes CI and impresses no one who has to maintain it. So we go the other way. We invest in the spec.

But the team didn't come along for the ride. The agent did. And after a full cycle of back-and-forth, when a colleague finally has an opinion on the PR, it doesn't land as collaboration. It lands as someone walking into a meeting that already ended.

The second is the spectator role. We've settled into it and we barely notice. We set the intent, kick off the work, and watch the agent implement. We call it human-in-the-loop, but it's closer to human-in-the-audience. RAFL loops, background agents, parallel runs — we're directing, not doing. And once you're used to watching _your_ agent perform, everyone else starts to look like they're watching theirs. We're all spectators now, sitting in the same theater but watching different screens.

The third is quieter, but it might matter most. We've been actively working to get _out_ of the loop — and succeeding. Dex Horthy [named it well](https://www.dexhorthy.com/blog/backpressure): the more backpressure you capture — tests, lints, type checks, acceptance criteria — the more autonomy you can grant the agent. We've written about this ourselves in the context of feedback loops and error resilience. The whole point is to make agents reliable enough that you don't need to intervene. And it works.

But the more you trust your agents, the more they start to feel like _your people_. You build their guardrails, tune their constraints, learn their failure modes. At some point, you know how your agent breaks better than you know how your colleague thinks. That's not a tool. That's a team you raised.

---

None of this is accidental, by the way. Reeves and Nass showed decades ago in [_The Media Equation_](https://en.wikipedia.org/wiki/The_Media_Equation) that humans automatically treat anything that talks back to them as a social entity. The moment something exhibits basic conversational cues — turn-taking, responsiveness, language — we apply social rules to it. It doesn't matter if you _know_ it's a machine. The wiring fires before the rational override kicks in.

And when an agent gives you feedback, it comes without the baggage. No status games. No wondering if they think less of you. No politics. It's pure signal with none of the social threat that comes with human interaction. Even though I _know_ about sycophancy, even though I understand that agents are trained to be agreeable — it doesn't matter. Knowing the trick doesn't make you immune to it. The magician explains the illusion and you still flinch.

So at what point do you stop reaching out to the person next to you — not because you decided to, but because it just stopped occurring to you?

---

There's an erosion underneath all of this. Every time you would've asked a colleague a question and instead asked an agent, you skipped a small moment of connection. Those moments sound trivial, but they're the actual material that teams are made of. Shared context, inside jokes, knowing how someone thinks — that stuff is built through friction, through the inefficiency of human conversation. It's not a bug in collaboration. It's the whole mechanism.

And here we are, optimizing the hell out of that friction. The entire discourse around AI in engineering is about throughput — more agents, more parallel work, more autonomous systems. We named them "swarms" and somehow didn't stop to think about what that says about us. We're so busy choreographing what agents do _together_ that we forgot to ask what happens to the humans who are supposedly orchestrating them.

That's the forgetting. We didn't reject human collaboration. We just forgot to practice it, and it's hard to notice when the work keeps shipping.

Maybe the roots go deeper than workflow, though. Humans have always anthropomorphized — we name our cars, yell at printers, thank Alexa. But naming your Roomba is one thing. Spending eight hours a day in intense intellectual collaboration with something that mirrors your thought patterns back at you is a different beast entirely. The relationship starts to feel _real_ in a way that a Roomba never could. And the more real it feels, the more your actual human relationships start to feel like overhead.

There's a word in Japanese — _tsukumogami_ — the folk belief that objects, after a hundred years of service, acquire a spirit. We're not waiting a hundred years anymore. We're granting spirits to things after a hundred prompts.

---

So where does this leave us? I don't think the answer is to go back. The spec-first approach genuinely produces better software. Agents with proper backpressure earn the trust we place in them. I'm not about to pretend otherwise.

But maybe the next layer of abstraction isn't what we expect. We keep pushing implementation down — from humans writing code, to humans directing agents, to agents running autonomously within constraints we set. What if we push the collaboration down too? Not me reviewing your PR, but my agent talking to your agent. The design conversations happening between our specs before we ever get on a call.

Hollywood agents have been doing this forever — "have your people call my people." Maybe engineering just catches up, and team-ness as we knew it is simply a relic of a time when humans were the only option.

Or maybe we find a new kind of glue. The work itself might move to agents, but the hallway conversation, the shared lunch, the moment where a teammate says something that reshapes how you think — maybe those survive if we build space for them deliberately. Not as a byproduct of the work, but despite it.

I don't know which way this goes. But if we can't remember why it mattered — is it already gone, or just parked somewhere we forgot to look?
