# Research: Agents and the LOC double standard

## Rough Idea

Suddenly with agents it's ok to show off LOC as a metric again — a double standard. For decades, lines of code was widely dismissed as a vanity metric ("good engineers delete code, not add it"). But now that AI agents can generate thousands of LOC quickly, the same engineers who rejected LOC are using it to show off what agents can do.

## Questions

- Why was LOC universally rejected as a metric for decades, and what was the consensus?
- Who is showing off LOC now in the agent/swarm context, and in what form?
- Is the argument "it's different now" — and if so, is that actually valid?
- What does this double standard reveal about how people think about AI productivity vs. human productivity?
- Is the LOC revival actually making software worse, or is scale genuinely different at the agent layer?

## Sources & Links

**The LOC consensus — history and critique**

- [Lines of Code Are Back (And It's Worse Than Before) — The Pragmatic CTO](https://www.thepragmaticcto.com/p/lines-of-code-are-back-and-its-worse) — directly names the revival and the problem
- [Why lines of code are a bad measure of developer productivity — DX](https://getdx.com/blog/lines-of-code/)
- [Quote Investigator: "If I Had More Time, I Would Have Written a Shorter Letter" — true attribution (Pascal, 1657)](https://quoteinvestigator.com/2012/04/28/shorter-letter/)
- [Brevity — Wikiquote (Polonius, Strunk, Nietzsche, Voltaire)](https://en.wikiquote.org/wiki/Brevity)

**The agent-era LOC revival — primary examples**

- [Lessons From Building With AI Agents: 120k Lines of Code Later — Practical Engineering Management](https://www.practicalengineering.management/p/lessons-from-building-with-ai-agents)
- [Harness engineering: leveraging Codex in an agent-first world — OpenAI](https://openai.com/index/harness-engineering/)
- [Minions: Stripe's one-shot, end-to-end coding agents — Stripe Dev Blog](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)
- [Migrating millions of lines of code to TypeScript — Stripe Dev Blog](https://stripe.dev/blog/migrating-to-typescript)
- [Track Copilot code generation metrics — GitHub (LOC as official Copilot metric, Dec 2025)](https://github.blog/changelog/2025-12-05-track-copilot-code-generation-metrics-in-a-dashboard/)
- [How Uber Built AI Agents That Saved 21,000 Developer Hours — TMCnet](https://blog.tmcnet.com/blog/rich-tehrani/ai/how-uber-built-ai-agents-that-saved-21000-developer-hours.html)
- [When AI Agent Swarms Write Code Faster Than You Can Delete It — NeuEon](https://www.neueon.com/insights/ai-agent-swarms/)

**Measuring AI productivity — the broader problem**

- [AI agents and bad productivity metrics — InfoWorld](https://www.infoworld.com/article/4135492/ai-agents-and-bad-productivity-metrics.html)
- [How tech companies measure the impact of AI — Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/how-tech-companies-measure-the-impact-of-ai)
- [Beyond Lines of Code: Redefining Developer Productivity in the Agentic AI Era — Salesforce](https://www.salesforce.com/news/stories/agentic-ai-developer-productivity/)

**Taste, quality, and mass production**

- [Walter Benjamin, "The Work of Art in the Age of Mechanical Reproduction" — Wikipedia](https://en.wikipedia.org/wiki/The_Work_of_Art_in_the_Age_of_Mechanical_Reproduction)
- [The crisis in taste and why AI might make it worse — AI Ready CMO](https://aireadycmo.com/p/the-crisis-in-taste-and-why-ai-might-make-it-worse)
- [Taste Is the New Bottleneck — Designative (2026)](https://www.designative.info/2026/02/01/taste-is-the-new-bottleneck-design-strategy-and-judgment-in-the-age-of-agents-and-vibe-coding/)
- [What AI Lacks and Might Never Overcome: Taste — Medium](https://medium.com/@danielbentes/what-ai-lacks-and-might-never-overcome-taste-2054af10b9d8)

**Knowledge work and Drucker**

- [Knowledge worker — Wikipedia (Drucker, 1959)](https://en.wikipedia.org/wiki/Knowledge_worker)
- [Peter Drucker on Knowledge Workers — Ed Batista](https://edbatista.com/2008/10/drucker-1.html)
- [Peter Drucker's Memo to Elon Musk on Managing Knowledge Work — Leading Sapiens](https://www.leadingsapiens.com/peter-drucker-knowledge-work/)
- [The Rise and Fall of the Knowledge Worker — Jacobin (2025)](https://jacobin.com/2025/07/knowledge-workers-ai-globalization-deindustrialization)
- [The End of Knowledge Work — Caio Waiu](https://caio.waiu.org/p/the-end-of-knowledge-work)

**Psychology of metrics — why we reach for bad numbers**

- [Attribute substitution — Wikipedia (Kahneman & Frederick, 2002)](https://en.wikipedia.org/wiki/Attribute_substitution)
- [Why Our Minds Swap Out Hard Questions For Easy Ones — MIT Sloan Management Review](https://sloanreview.mit.edu/article/why-our-minds-swap-out-hard-questions-for-easy-ones/)
- [McNamara Fallacy — Wikipedia](https://en.wikipedia.org/wiki/McNamara_fallacy)
- [Campbell's Law: The Dark Side of Metric Fixation — Nielsen Norman Group](https://www.nngroup.com/articles/campbells-law/)
- [The Tyranny of Metrics — Jerry Z. Muller (Princeton University Press, 2018)](https://press.princeton.edu/books/hardcover/9780691174952/the-tyranny-of-metrics)
- [Illusion of Control — The Decision Lab](https://thedecisionlab.com/biases/illusion-of-control)
- [Metric Anxiety — Weird Economies](https://weirdeconomies.com/glossary/m/metric-anxiety)

## Observations

**The decades-long consensus against LOC:**

- Edsger Dijkstra: LOC is "a very costly measuring unit because it encourages the writing of insipid code"
- Bill Gates (1980s): "IBM used to measure our performance by LOC count. That is the equivalent of measuring an airplane's quality by its weight."
- By 2023, Kent Beck was calling LOC "an input metric"—the worst category. "Only use it if you have nothing else to measure success with."

**The Twitter/Musk incident (Nov 2022):**

- After acquiring Twitter, Musk asked engineers to print out their code and show "most salient lines of code" via screenshots
- Reportedly stack-ranked engineers by LOC written in the past year and fired the bottom tier (~3,250 employees affected)
- Reception was scathing — "doing LOC counts has been considered a joke in the industry for 4 decades"
- Grady Booch (software engineering legend): "more evidence that @elonmusk is profoundly incompetent when it comes to leading an organization built around a software-intensive web-centric system"
- The prevailing narrative: only someone who doesn't understand software would use LOC as a productivity signal

**The agent-era revival (2025–2026) — real examples from engineering blogs:**

LOC bragging appears mainly in two forms: (a) LOC directly in the title, and (b) LOC as a headline stat in the body/lede. Both are worth calling out.

_Title-level:_

- **"Lessons From Building With AI Agents: 120k Lines of Code Later"** — Practical Engineering Management (Substack). The LOC count is the entire hook. The framing: surviving 120k LOC generated by agents is itself the credential.
- **"Migrating millions of lines of code to TypeScript"** — Stripe Dev Blog. Pre-dates agents but sets the template: LOC as a scale flex in an engineering title.

_Body/lede-level (major company engineering blogs):_

- **OpenAI, "Harness engineering: leveraging Codex in an agent-first world"** (Feb 2026): "A repository contains on the order of a million lines of code... zero lines written by human hands." Team of 3 engineers. ~1,500 PRs merged over 5 months. The stat is presented as proof of concept.
- **Stripe, "Minions: Stripe's one-shot, end-to-end coding agents"** (Feb 2026): 1,300 PRs merged per week, zero human-written code. Stripe's 15M-line Ruby codebase as context for scale. Not LOC directly — but the framing is identical: volume as validation.
- **Uber engineering**: 70% of committed code is now machine-generated; internal agent produces ~1,800 code changes per week. Framed as engineering achievement.
- **GitHub** (Dec 2025): Added "lines of code changed with AI" as an official metric in the Copilot dashboard — institutionalizing LOC as the default success signal for AI tooling. This is the most revealing: it's not a brag post, it's a product decision, which means LOC has been quietly reinstated as a first-class engineering metric by the platform that powers most codebases.
- **MightyBot**: "304 releases, over one million lines of code, with a team of 10 engineers" — startup framing, but same pattern.

_The pattern:_ major engineering teams don't typically say "look at our LOC" — they say "look at our PRs per week" or "% of code AI-generated" or "zero lines written by humans." These are all LOC-adjacent: they measure output volume and treat it as the primary success signal. The metric has been rehabilitated, just with a thin layer of indirection.

- Cursor: reportedly produces nearly a billion lines of accepted code daily
- AI generated 256 billion lines of code in 2024 (41% of all new code written)
- Google: 25%+ of new code is AI-generated; Microsoft: ~30%

**Why it's actually worse now:**

- Code duplication increased 8× in 2024
- Code thrown away within two weeks of being written has doubled
- Amazon retail saw a surge in outages caused by its own AI agents
- One financial services firm: 10× coding output → backlog of 1 million lines needing review
- Veteran developer Kin Lane: "I don't think I have ever seen so much technical debt being created in such a short period of time during my 35-year career"
- Nobody is reviewing 10,000-line PRs — the review bottleneck is the real constraint, not generation

**The knowledge worker — what we may be losing:**

Peter Drucker coined "knowledge worker" in _The Landmarks of Tomorrow_ (1959). The core definition: a worker whose primary capital is knowledge and judgment, not physical output. What distinguishes the knowledge worker from the manual worker is specifically _not_ how much they produce — it's the quality and direction of what they produce.

Drucker was explicit: **"Productivity of the knowledge worker is not — at least not primarily — a matter of the quantity of output. Quality is at least as important."**

More precisely, the knowledge worker's distinguishing act is task _definition_, not task _execution_: "For knowledge work, the key question is: what is the task? Whereas for manual work, the only question was: how does the manual worker best do the job?" The knowledge worker decides what to build. The manual worker builds it.

LOC measures manual worker output applied to knowledge workers — that's been the criticism for 40 years. But with agents, something stranger happens: _the agent is doing the manual work_, but humans measure its output as if that's what they were hired to do. They've outsourced the execution and kept score of the execution, rather than the judgment that directed it.

Drucker also noted knowledge workers cannot be productive under external quantity targets — only self-motivation and self-direction make them productive. The moment you set a volume target for a knowledge worker, you've turned them into a manual worker chasing a number.

**The LOC connection:**
The LOC brag is a symptom of conceptual confusion about what category of work is happening. If agents do the execution, what is the human contributing? The honest answer: judgment, direction, taste, curation. But those things are hard to measure. So instead, we measure what the agent produced — with the metric of manual labor (units of output) applied to work that was supposed to be defined by its resistance to that metric.

The engineer who brags about 120k LOC from their agents has, in that moment, abandoned the knowledge worker identity. They've scored themselves on output, not judgment. Drucker would say they've asked "how did the job get done?" rather than "what was the task, and was it the right one?"

**Mass production, taste, and the cost of volume:**

The insight the user brought: the more ambitiously we use AI, the more we seem to lose taste. This connects the LOC revival to something older — what happens to aesthetic judgment when production becomes effortless.

**Walter Benjamin, "The Work of Art in the Age of Mechanical Reproduction" (1935):**
Benjamin argued that mechanical reproduction destroys the _aura_ of a work of art — its "presence in time and space, its unique existence at the place where it happens to be." The original painting has aura; the million prints don't. He wasn't lamenting this — he thought it democratized art — but he named what's lost: the sense of singularity, of something that couldn't have been otherwise. Code written by a person has something of this. You can feel the choices in it. Agent-generated code at scale is reproduction without aura. It's always "fine." It's rarely _right_.

**Fast fashion as structural analogue:**
Fast fashion industrialized clothing production and in doing so degraded the baseline. When garments cost $8 and are designed to last three wears, the very _category_ of what clothing can be shifts. Consumers lose the reference point for quality because quality becomes invisible — or a luxury. The cultural impoverishment is subtle: it's not that people stop caring about quality, it's that they stop having the vocabulary to identify it. AI-generated code at scale risks doing the same to software: not making bad code, but making "fine" code the default, until the sense of what _good_ code feels like atrophies.

**Dijkstra's "insipid code" connects directly here:**
His word choice — "insipid" — is aesthetic, not technical. Insipid means tasteless, flat, without character. He wasn't warning about bugs or inefficiency; he was warning about the degradation of quality as a felt property. You stop being able to tell. LOC as a metric incentivizes insipid code because it rewards volume with no taste premium. Agents running on LOC as a signal will produce insipid code at industrial scale.

**The fast fashion loop applies:**
Fast fashion created a feedback loop: low quality → lower expectations → lower quality becomes acceptable → quality loses meaning as a concept. AI code generation risks the same loop: high volume → volume becomes the signal → quality becomes invisible → LOC is a reasonable thing to brag about. Each step is rational given the previous one. The problem is the direction of travel.

- The metric didn't get rehabilitated. It got laundered through novelty.

**length is easy; brevity is hard.**

Volume is the default; reduction is the discipline. Every field that produces language or form — writing, philosophy, architecture, engineering — has had to actively fight the gravity toward more.

The LOC story is the software version of this eternal problem. The profession learned it. Then forgot it. Then had to relearn it. And now, with agents doing the generating, is in the process of forgetting it again — at scale.

**The abstraction layer argument — and why it makes LOC even more absurd:**

A parallel and increasingly prominent conversation: code itself may be becoming less relevant as the primary unit of software production.

- **Karpathy, Jan 2023:** "The hottest new programming language is English." — framing LLMs as a new kind of compiler that takes natural language as input.
- **Karpathy, Feb 2025 (coining "vibe coding"):** "There's a new kind of coding... where you fully give in to the vibes, embrace exponentials, and forget that the code even exists." — describing a mode where the developer stops reading or owning the generated code at all.
- **Karpathy, Software 3.0 framing:** Software 1.0 = explicit code; Software 2.0 = neural weights trained on data; Software 3.0 = LLMs prompted in natural language. Each layer makes the layer below less the thing you directly work with.
- **The broader industry echo:** "LLMs are just another layer of abstraction." New abstractions don't eliminate lower layers — but they do make them less the primary interface. Every major abstraction shift (assembly → C → object-oriented → frameworks) reduced direct engagement with the layer below.

**The contradiction this creates for LOC bragging:**

If you genuinely believe in the Karpathy thesis — that English is the programming language, that the code is almost incidental, that you're an orchestrator not a coder — then bragging about LOC is a self-defeating move. You're claiming the new paradigm with one hand and reaching for the old metric with the other.

The LOC brag implies code is the output that matters. But the abstraction thesis says code is an implementation detail — the prompt, the spec, the orchestration logic is where the value lives now. You can't hold both simultaneously: either LOC counts (and we're measuring the wrong things in the new era) or LOC doesn't count (and the brag is meaningless).

**The psychological grounding — why we reach for numbers we know are wrong:**

This isn't unique to software. There's a documented human pattern of using a flawed-but-available number when the right number doesn't exist.

**Attribute substitution (Kahneman & Frederick, 2002):**
The core mechanism. When a hard question has no easy answer, the mind automatically substitutes an easier question — without awareness that the swap happened. The target question ("are these agents actually productive?") is hard. The heuristic question ("how many lines of code did they produce?") is easy. The substitution happens automatically, in the intuitive system, not the reflective one. The LOC brag isn't dishonest — it's the result of a cognitive swap that the person doesn't notice they made.

**Illusion of control:**
Humans manufacture a sense of control in uncertain situations. When genuine progress is opaque — when it's unclear whether the agents are working well, whether the architecture is sound, whether the output is good — a concrete number restores a felt sense of agency. "We generated 120k lines" feels like knowing something. It may not _be_ knowing something, but it _feels_ like it. The number is comfort, not signal.

**The Tyranny of Metrics (Jerry Muller, 2018):**
"Nothing does more to create the appearance of certain knowledge than expressing it in numerical form." Muller documents this across medicine, education, policing, and finance. The appeal of metrics isn't just laziness — it's that numbers _look like knowledge_. They have the aesthetic of rigor even when they represent something trivially easy to produce. LOC fits: it has units, it's precise, it's comparable. It looks like a measurement. This is enough.

**"Metric anxiety" as a phenomenon:**
There's a named concept — metric anxiety — for the emotional relationship people have with metrics. It can signal reward, encouragement, and control, but it also creates compulsion: you need the number to feel okay. In a new and uncertain technological moment (agents, swarms, orchestration), LOC is the number that makes people feel like they understand what's happening. That's the function. Not accuracy — comfort.

**The measurement vacuum:**

- 60% of engineering leaders cite lack of clear metrics as their biggest AI challenge (LeadDev 2025 AI Impact Report, 880 leaders)
- Traditional metrics (commits, PRs, velocity) assume humans write code — that assumption broke in 2023
- In the absence of better signals, LOC is easy to reach for — and now we have the psychology for why

## Patterns & Emerging Thesis

The LOC revival isn't random — it fills a measurement vacuum. When Musk used LOC it was seen as proof he didn't understand software. When agents use LOC it's framed as proof the agents are working. But the metric hasn't changed; what changed is the _generator_. If LOC was wrong as a signal of human output, it's wrong as a signal of agent output — and arguably more dangerous now because agents can game it infinitely without the natural friction humans have (boredom, fatigue, judgment).

The double standard is revealing: the engineering community rejected LOC because it measures activity, not value. But in the agent context, the same community has temporarily confused activity for value again — because the activity is now impressive-sounding. "120k LOC in 48 hours" triggers the same lizard-brain reaction as a big number on a dashboard.

The taste angle adds another layer. It's not just that people are reaching for a convenient metric — it's that the ambition of the tooling may be actively eroding the taste required to know the metric is wrong. Benjamin's aura argument: mass reproduction doesn't just produce more copies, it changes what the original _means_. Fast fashion doesn't just make cheap clothes, it shifts the baseline for what clothes can be. At scale, AI code generation may do the same: not produce bad code, but gradually dissolve the felt sense of what good code is — until LOC starts to feel like a reasonable proxy because no one can quite articulate what would be better. Dijkstra called this "insipid" — an aesthetic word, not a technical one.

## Wordplay & Language

Brainstorm of resonances in the words themselves. Not all of these will be used — they're raw material.

**"Lines"**

- _Assembly line_ — the most loaded one. The assembly line is exactly the fast fashion / mass production analogy. Agents running in parallel are an assembly line for code. You don't brag about how many widgets came off the line; you brag about the widget. Except now we do brag about the line count.
- _Line of poetry / verse_ — poetry has always valued economy of lines. A 10,000-line poem is not better than a 14-line sonnet. The sonnet is a constraint that forces quality. No poet brags about LOC. The analogy makes the engineering brag absurd.
- _Party line_ — a political talking point repeated without variation. LOC from agents may be the coding equivalent: syntactically correct, semantically hollow.
- _Reading between the lines_ — what LOC cannot do. The value is often what isn't there. The deleted code. The abstraction that replaced fifty lines. LOC counts lines; it cannot read between them.
- _Flat-lining_ — a number that holds steady is a sign of death in medicine. A codebase that keeps growing its LOC indefinitely is flat-lining in a different sense: no reduction, no discipline, no sign of life.
- _Crossing the line_ — the LOC revival crosses one.
- _Draw the line_ — at some point someone has to.

**"Code"**

- _Code of conduct_ — the "code" being violated in the LOC revival isn't the software; it's a professional code of conduct, a set of norms the industry spent decades building.

**"LOC" — abbreviation resonances**

- _Line of Credit_ (finance) — borrowing against future value. Generating LOC today that someone else has to pay down in review debt and maintenance later. The metaphor works almost too well.
- _Level of Care_ (medical) — quality, not quantity. What we actually want to measure.
- _Loco_ — Spanish/slang for crazy. Phonetically adjacent. Perhaps not a coincidence.
- _Lock_ — phonetically close. The LOC metric locks thinking into a frame that's hard to escape once adopted. GitHub adding LOC to the Copilot dashboard is a kind of lock-in: it normalizes the measure.

**Productive combinations for the entry:**

- "Reading between the lines" is the cleanest closing move — what LOC cannot do is where the value lives
- "Line of credit" is underrated — the debt metaphor extends naturally
- LOC = Loss of Control is the darkest and funniest

## Sociological framing: how the LOC revival reveals how we actually view agents

The LOC revival may expose something about the gap between how we _talk_ about agents and how we actually _relate_ to them.

The public framing is "AI as colleague" — a collaborator, a force multiplier, a knowledge worker in its own right. But when it's time to justify the investment, we measure agents the way we measure machines: by throughput. Pages per hour. Units per day. LOC per sprint.

This is a deeply sociological tell. The choice of metric is never neutral — it encodes a theory of value. When we reach for LOC, we're implicitly treating the agent as production equipment, not as an intelligent collaborator. The assembly line analogy was already in the wordplay section, but it goes deeper than a pun: we may _say_ agents are like junior engineers, but we _score_ them like textile looms.

There's also a status and justification dynamic. Many engineering teams are still in the "prove agents are worth it" phase. LOC is a number that fits in a slide deck, survives a CFO meeting, and sounds unambiguously large. The audience isn't peers who know the metric is junk — it's executives and skeptics who need ROI in a language they recognize. This tells us the LOC brag is partly a negotiation about legitimacy, not a sincere attempt at measurement. We reach for the big number because the real value (faster iteration? better architecture? fewer bugs?) is harder to isolate and harder to sell.

The implicit sociology: agents are seen as tools whose worth must be demonstrated through volume, because volume is the only signal legible to non-practitioners. The people who know better (engineers who lived through the Musk controversy) are, knowingly or not, using the same signal to different audiences. The double standard lives partly in who's being spoken to.

## The Musk printing gag — potential framing device

The Musk incident had a specific physical absurdity that's worth preserving: he asked Twitter engineers to _print out their code_ and bring it in. Screenshots. Paper. The reaction was immediate and merciless — not just because LOC was the metric, but because the request revealed he thought of code the way you'd think of a report: something you hold, weigh, and stack.

Now picture the same scene with agents. An engineer runs their agent swarm for a weekend. 120,000 lines. At ~50 lines per page, that's 2,400 pages — roughly five reams of printer paper. Walk it into the meeting. The stack is the brag. The weight of the paper is the metric.

The gag: Musk was mocked for thinking you could weigh code. Now we're doing exactly that — just with digital page counts. The form of the absurdity is identical. The only thing that changed is that we're impressed by the number instead of embarrassed by the person asking for it.

Potential framing device: open with the Musk printing story (widely known, widely mocked), hold the punchline for a beat, then cut to the agent engineer presenting their 120k LOC. The reader arrives at the parallel themselves — you don't need to state it.

## Bill Gates's weight analogy — and the baggage we don't yet understand

Gates said: "IBM used to measure our performance by LOC count. That is the equivalent of measuring an airplane's quality by its weight."

The analogy was already in the research, but there's a sharper edge now: with agents generating code at scale, we genuinely don't know the structural integrity of what's being built. We know the weight. We don't yet know if the plane flies.

At least when human engineers wrote the code, they had _read_ it. They'd made choices in it. Even bad human code carries the residue of someone's judgment — there was a moment where a person decided to do it that way. Agent-generated code at scale doesn't have this. It can be structurally plausible, pattern-consistent, syntactically clean — and still be wrong in ways that only surface under load, at edge cases, or years later when no one remembers the generation context.

The data we already have is early warning:

- Code duplication increased 8× in 2024
- Code discarded within two weeks has doubled
- One financial services firm: 10× coding output → 1 million lines needing review backlog

But that's 2024–2025 data, early-adoption era. The full weight of what's being built now may not be felt for years — when the agents are gone, the engineers who ran them are gone, and someone else inherits the codebase. This is the real Bill Gates problem. We don't brag about airplane weight before the maiden flight. We're bragging about LOC before we know if the plane lands.

The Gates analogy gains a second dimension: _weight matters because it affects structural integrity_, not just aesthetics. A too-heavy plane doesn't just look bad — it falls out of the sky. A codebase bloated by unreviewable, un-owned, agent-generated LOC doesn't just look bad — it fails in production, resists change, and accumulates hidden load. The debt isn't hypothetical. The question is just how much of it we've already taken on without knowing.

## Tools as extensions of the human — the "agent as machine" defense doesn't hold

The "author has changed" argument — agents are tools, measure their output like machine throughput — rests on a sharp tool/user distinction. But there's a rich tradition of thinking about tools that collapses exactly that distinction, and it has a direct bearing on the LOC brag.

**Heidegger — "ready-to-hand" vs. "present-at-hand" (_Being and Time_, 1927):**
Heidegger's hammer: when a tool works, it becomes _transparent_. You don't experience the hammer as an object; it becomes an extension of your hand. The nail is what you're attending to. The hammer is present-at-hand (an object of attention) only when it breaks or fails. The point: a tool in use isn't separate from its user — it's incorporated into the user's body schema and intention. When an agent works well, you stop thinking about the code being generated; you think about the problem being solved. LOC is a metric that forces you to look at the hammer, not the nail.

**Marshall McLuhan — _Understanding Media: The Extensions of Man_ (1964):**
McLuhan's thesis: media and tools are literally extensions of human senses and faculties. The wheel is an extension of the foot. The book is an extension of the eye. The computer extends the central nervous system. Agents, by this frame, are extensions of the engineer's cognitive apparatus — not separate machines. "We shape our tools and thereafter our tools shape us." The LOC revival is evidence of the second half: agents are reshaping how engineers think about their own productivity, and they're borrowing a metric from manual labor to do it.

**Andy Clark & David Chalmers — "The Extended Mind" (1998):**
The extended mind thesis: cognitive processes are not confined to the skull. When you use a notebook to store information, the notebook is part of your cognitive system — not a separate external tool that you consult. The test: if you'd unhesitatingly rely on it, if it's reliably available, if it feeds back directly into your reasoning — it's part of your mind. Agents that a developer configures, prompts, and directs pass this test. The output isn't the machine's; it's the extended cognitive system's.

**The implication for the LOC argument:**

The "author has changed" defense requires agents to be clearly separate from their operators. But if tools are extensions of the mind — Heidegger, McLuhan, Clark & Chalmers all say they are — the defense collapses in two directions:

1. If agents are extensions of the engineer, then the agent's output _is_ the engineer's output in the relevant sense. LOC is still measuring the engineer. We already know that's wrong. The author didn't change; the instrument did.

2. If agents are treated as separate machines (to justify LOC as "machine throughput"), then the bragging engineer is doing something stranger: taking credit for the machine's output while distancing themselves from its authorship. "Zero lines written by human hands" as the credential, but the LOC as the metric. You can't simultaneously disclaim authorship and claim the count.

Either way, LOC is the wrong metric. The "machines get throughput metrics" defense only holds if you accept a sharp tool/user distinction that the dominant philosophy of technology has rejected for a century.

**The sociological tell sharpens:**
When we measure agents by LOC, we reveal not just metric confusion but an ambivalent relationship with what agents _are_. We call them collaborators, colleagues, force multipliers. We talk about them as extensions of our capability. Then, when it's time to justify, we treat them as looms. The tool/extension distinction, which philosophy has spent decades complicating, gets flattened by the need for a number. LOC is what you reach for when you stop believing your own framing.

**Sources:**

- [Heidegger, _Being and Time_ (1927) — "ready-to-hand" / "present-at-hand" — Wikipedia](https://en.wikipedia.org/wiki/Being_and_Time)
- [McLuhan, _Understanding Media: The Extensions of Man_ (1964) — Wikipedia](https://en.wikipedia.org/wiki/Understanding_Media)
- [Andy Clark & David Chalmers, "The Extended Mind" (1998) — Wikipedia](<https://en.wikipedia.org/wiki/The_Extended_Mind_(paper)>)
- [Extended mind thesis — Wikipedia](https://en.wikipedia.org/wiki/Extended_mind_thesis)
- [Andy Clark, _Natural-Born Cyborgs_ (2003) — Oxford University Press](https://global.oup.com/academic/product/natural-born-cyborgs-9780195177510)

## The naming of machines — industrial metaphors in AI software production

The engineering community didn't just revive LOC. It named its tools like factories.

**Loom — Geoffrey Huntley (Jan 2026)**

An AI coding agent infrastructure built in Rust. Agents push directly to master with no branches; Huntley describes it as "infrastructure for evolutionary software." Named deliberately after the weaving loom — a textile machine from the Industrial Revolution. He used the phrase "the weaving loom" explicitly in his announcement. The industrial metaphor is conscious: Huntley has a companion post titled "From Luddites to AI: the Overton Window of disruption." The name is the argument.

Sources: [GitHub](https://github.com/ghuntley/loom), [X announcement](https://x.com/GeoffreyHuntley/status/2011788568742797565)

**Gas Town — Steve Yegge (Jan 1, 2026)**

A multi-agent orchestration framework managing colonies of 20–30 parallel Claude Code agents, built on a custom issue-tracker called Beads. Yegge explicitly frames the developer's role as "factory operator managing agent swarms." Named after Gastown, a historic Vancouver district — but the factory framing dominates the announcement. A follow-up introduced "the Wasteland: A Thousand Gas Towns." The scale is the vision.

Sources: [Medium announcement](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04), [GitHub](https://github.com/gastownhall/gastown)

**StrongDM Software Factory (Feb 2026)**

An actual named internal system. Two founding rules: "Code must not be written by humans" and "Code must not be reviewed by humans." Humans write specs; agents do everything else. They built a standalone website at factory.strongdm.ai.

Source: [StrongDM blog](https://www.strongdm.com/blog/the-strongdm-software-factory-building-software-with-ai)

**8090 Software Factory — Chamath Palihapitiya (Sep 2025)**

"Software Factory" is the product name, not a metaphor. An AI-native development platform covering the full SDLC. EY partnership announced March 2026 used "factory line approach" in press releases. Palihapitiya explicitly positioned it against vibe coding.

Sources: [Chamath X post](https://x.com/chamath/status/1940442776396566670), [EY announcement](https://www.ey.com/en_us/newsroom/2026/03/ernst-young-llp-and-8090-launch-ey-ai-pdlc)

**Notion — "Software Factory Future" (Apr 2026)**

Simon Last, co-founder and head of AI, framed the vision as a "software factory" on the Latent Space podcast (episode: "Notion's Token Town: 5 Rebuilds, 100+ Tools, MCP vs CLIs and the Software Factory Future," Apr 14, 2026). Not a shipped product name — a vision statement. But the phrase made the episode title.

Source: [Latent Space](https://www.latent.space/p/notion)

**Ona (formerly Gitpod) — "from craft to mass production" (Jan 2026)**

Rebranded from Gitpod to Ona in September 2025. Published "From craft to mass production: Software as an industrial system" (Jan 24, 2026). The post draws a direct analogy to Henry Maudslay's precision lathes in early-19th-century London: "accuracy moves into the tooling." They don't call their product a software factory — the industrial logic is the company's entire thesis.

Sources: [The Register rebrand](https://www.theregister.com/2025/09/03/gitpod_rebrands_as_ona/), [Ona industrial post](https://ona.com/stories/industrializing-software-development)

**Factory.ai — "Droids" (founded 2023, Series B Sep 2025)**

Company named Factory. Agents named Droids. Self-describes as "Agent-Native Software Development." The Series B press release headline: "Factory Unleashes the Droids." Droids are factory workers in Star Wars lore — the naming is knowing.

Source: [Business Wire](https://www.businesswire.com/news/home/20250925993478/en/Factory-Unleashes-the-Droids-Raises-$50-Million-Series-B-from-NEA-Sequoia-Capital-NVIDIA-and-J.P.-Morgan)

**Microsoft Azure AI Foundry (Nov 2024 → Nov 2025)**

Azure AI Studio rebranded to Azure AI Foundry at Ignite 2024, then to Microsoft Foundry at Ignite 2025. Studio (artisan workspace) → Foundry (industrial smelting). Microsoft's own blog called it "your AI app and agent factory."

Source: [Azure blog](https://azure.microsoft.com/en-us/blog/azure-ai-foundry-your-ai-app-and-agent-factory/)

**Mistral Forge (Mar 2026)**

A platform for building proprietary enterprise models. Named after a forge — a smithing/casting metaphor. Announced at NVIDIA GTC, March 17, 2026.

Source: [Mistral announcement](https://mistral.ai/news/forge)

**"Dark Factory" — an emerging term (2026)**

Not a product — a descriptive term for fully autonomous, lights-out AI software production. Analogous to "dark factories" in physical manufacturing (no human workers, no lights needed). BCG Platinion published "The Dark Software Factory." HackerNoon covered "The Dark Factory Pattern" as an architectural approach.

Sources: [BCG Platinion](https://www.bcgplatinion.com/insights/the-dark-software-factory), [HackerNoon](https://hackernoon.com/the-dark-factory-pattern-moving-from-ai-assisted-to-fully-autonomous-coding)

**The pattern:**

Looms. Forges. Foundries. Factories. Droids. Dark factories. The profession that built its identity on craft — on the idea that software is closer to writing than manufacturing — is naming its most ambitious tools after industrial production. The naming isn't incidental. It's the revealed theory of what's happening: code is now a manufactured good, and the metaphors have caught up.

## Refined Direction

The entry should call out the double standard explicitly without being preachy — the goal is to make the reader laugh (or wince) at the recognition. The strongest version probably: (1) recalls the Musk incident as a shared cultural memory (with the printing-the-code detail as the physical gag), (2) pivots to the identical behavior now, (3) names what's actually happening (measurement vacuum + novelty bias + sociological tell about how we actually view agents), and (4) poses the honest question: if the metric was wrong then, why is it right now? With the Gates weight analogy as the sobering close — we know the weight, we don't yet know if the plane lands.
