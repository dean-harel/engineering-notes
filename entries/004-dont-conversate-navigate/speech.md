The agent says something off. You correct it. It tries again. You correct it again. Three turns later you're negotiating with a version of yourself from an hour ago, and the apparent way out is to keep talking.

Conversation analysts named this a long time ago. Schegloff, Jefferson and Sacks called it the preference for self-correction in repair, and later sharpened next-turn repair as the last structurally provided defense of intersubjectivity. The medium of talk only gives you forward-directed tools for fixing issues. You don't un-say the last turn. You say the next one, hopefully better.

LLM chat inherited the entire stance.

The lineage is continuous and turn-based at every step. ELIZA, Weizenbaum's 1966 keyword-matching therapist simulator, decomposes a sentence by rule and reassembles a response, one exchange at a time. PARRY, Colby's 1972 simulation of paranoid affect at Stanford, adds internal state and keeps the loop. SmarterChild, the early-2000s ActiveBuddy bot living inside AIM and MSN, embedded the turn-bubble grammar in ambient IM where users already knew the moves. By the time GPT-3 shipped in 2020, "chat with bubbles" wasn't a design decision. It was a default nobody had to make.

Worth noticing that GPT-3's first surface wasn't chat. The Playground, OpenAI's web interface for the API, was a text completion box. You wrote text, the model continued it. The conversational shape came later and on purpose. InstructGPT, OpenAI's 2022 reinforcement-learning-from-human-feedback-tuned successor to GPT-3, trained the assistant role into the weights and taught the model to follow instructions in dialogue. ChatGPT productized it. The Chat Completions API baked the turn structure into the wire format itself as a messages array of role/content pairs, indexed by position, with no slot for a branch.

Three layers converged on the same shape, and each one keeps pushing in the same direction: The UX renders the conversation as a linear scroll. Training optimizes for a helpful next turn, never for revisiting a prior one. The wire format is a flat, ordered array going in one direction - forward.

---

Backtracking is, of course, not a new ask. Undo, history, branching. Interactive computing has been working the problem of stepping back for half a century, and harnesses sit squarely inside that lineage.

Engelbart introduced undo in the 1968 NLS demo as a recovery move on a linear edit stream, the simple "if I make some mistakes, I can back up a little bit." Emacs undo-tree exposed the branching, drew the tree, and let you browse it. Git treated every commit as a node and every branch as a peer of every other. The capability has been there forever. What varies is the affordances the software builds around it: how visible prior states are, how cheap the move back is to invoke, and the fate of any path you leave behind. And on exactly these aspects, harnesses sit on the fence. The conversational framing they inherit pushes hard against the tradition, and the affordances a harness ships can either lean into it or work against it.

Pi, an open-source coding harness, takes the navigable line: the slash tree command exposes the session as a tree you can step through, hop between siblings, summarize the abandoned branch forward instead of losing it. Claude Code and Codex CLI, both vendor products, ship the same underlying capability — Claude Code's slash rewind command, Codex CLI's double escape key combination — but route it through indirection: rewind is destructive to the active conversation, and any sibling branch requires forking off into a separate session. Going back exists, but framed as recovery rather than navigation. I'd argue the indirection on the vendor side isn't innocent. It's a position with revenue attached. Forward-correction burns tokens, every retry billed at full rate. Sessions belong to the platform, resumption funnels through it, and the framing keeps tooling sticky and harder to leave. The engineering is small. The reluctance isn't accidental.

<break time="0.5s" />

Set the vendor question aside, though, and the open-source story isn't the ceiling either. Pie's slash tree command is a starting point, not a destination, and the affordances around it have plenty of room to grow. The most basic is naming turns, so the user can point at where they want to go back to instead of guessing or going one-by-one. A reactive one would be a glanceable indicator of session depth and shape, so the user can see how far down a branch they are without invoking anything. A proactive one could detect lightweight patterns on the user's recent turns, surfacing a quiet "you might want to rewind" nudge when they're forward-correcting in circles. These are three of probably many. Pi can already support that kind of grafting through its extension system, but whether a harness is open enough to invite it is itself a stance, and the choice dictates how much the user is allowed to take into their own hands.

---

Speaking of taking things into our own hands. Dex Horthy, founder of HumanLayer, on what makes agents work, lands on a principle that transfers cleanly: you cannot outsource the thinking. The agent amplifies the quality of thinking already done. The human stays in the driver's seat for architectural decisions. Tool choice matters, but so does the posture brought to the session.

Treating the transcript as addressable state is part of that posture. Pruning, branching, stepping back, summarizing the abandoned branch forward. It's not a power-user feature waiting on a vendor to ship it. It's a stance the user takes about whose conversation this is, and whose thinking it carries.

And the stakes here are higher than in the editor-focused days. A user in an IDE didn't need a reminder that the past exists, the file wasn't pretending to be a conversation. A chat-shaped session is, and every cue inside it tells you to type the next thing. Non-determinism compounds it: the path not taken would have been different, not just unchosen, so abandoning a branch costs information that can't be reconstructed by re-doing the same thing. And the cost stacks. Failed attempts stay in context as distractors, biasing what comes next and inflating attention cost. Lost-in-the-middle and context rot are well-documented at this point. Every forward-correction degrades what follows, and the spiral of half-fixes feels like progress until you find yourself asking, with Neo, how deep the rabbit hole goes. The way out isn't another turn. It's a step back.

What's missing isn't the technology. If Attention is all the model needs, then attention to where you've been in the session, and to the affordances you're given to get there, is what we owe ourselves.

xoxo,
escape escape.
