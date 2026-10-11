# TaxResolve AI — GST Notice Resolution Prototype

A React + Vite front-end prototype with the agreed five-step workflow:

1. Upload a GST notice (or load the fictional sample)
2. Review extracted notice facts
3. Upload supporting evidence (or load a fictional evidence bundle)
4. Review evidence assessment and potential official research sources
5. Edit and review a response draft

## Run locally

```bash
npm install
npm run dev
```

## Prototype limitations

This is a UX/workflow demo using synthetic sample data. Notice extraction, file parsing, evidence matching, tax research synthesis and draft generation are simulated with prepared demo outputs. Uploaded evidence filenames are shown, but arbitrary uploaded files are not parsed. The demo does not connect to an LLM, GST portal, ERP or filing system, and it never submits a response.

## Potential production integrations

- Document extraction: Azure AI Document Intelligence or a comparable OCR/document parser
- LLM: OpenAI or Azure OpenAI using structured outputs and source-grounding instructions
- Retrieval: Azure AI Search or pgvector over curated, versioned authoritative tax sources and approved internal documents
- Tax/accounting records: secure GST and ERP connectors, after permissions and data governance are defined
- Analytics: PostHog / Amplitude for workflow funnel, time-to-draft, edits and reviews
- Experimentation: feature flags and A/B testing after establishing a safety/evaluation baseline

All figures, entities, document names, issue descriptions and dates are fictional and illustrative. A tax professional must verify the law and facts before using any response.
