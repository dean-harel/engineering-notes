# How to add an entry

1. Create a `.md` file in this folder with your entry title as an H1 (`# Your title here`) and your content below it. No frontmatter, no folder structure — just write.
2. Open a PR. The pipeline runs spellcheck and AI grammar review, then posts a summary.
3. When the text is ready, add the `ready` label. The pipeline numbers the entry, formats it, generates speech text and audio, and updates the index.
4. Review the generated entry — both the formatted text and the audio version.
5. To iterate, edit `body.md` or `speech.md` and remove and re-add the `ready` label to retrigger.
