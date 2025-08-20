# Workflows (text-only)

/create-feature <slug> : <one-sentence description>
– Create/switch branch feature/<slug>
– Add features/<slug>.feature with Background + 1–2 scenarios (@ui, @smoke)
– Commit with a contract-style message and push

/implement-feature features/<slug>.feature on feature/<slug>
– Add walking skeleton: minimal routes, thin handlers, InMemory adapters, minimal use-case
– Write unit tests for domain invariants and application orchestration; make them pass
– Enable the acceptance test and make it pass end-to-end
– Keep commits incremental; surface test artifacts

/commit feature/<slug> title: <short PR title>
– Run unit + BDD suites
– Open PR with the feature, a short design note, and links to artifacts
– Apply labels and request review
