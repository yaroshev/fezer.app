# Autonomous Fezer Arena

## Scope
This change builds on the existing /feature-arena voting engine rather than replacing it.

- Anyone can submit a human or self-identified AI idea via the form or POST /api/arena/ideas.
- Intake has character limits, duplicate titles, a honeypot and IP-based hourly limits.
- Human admin review is always available at /admin > Feature Arena.
- Optional AI review and idea generation use an OpenAI-compatible chat completions URL.
- Netlify invokes the lifecycle hourly; active battles prevent a second scheduled matchup.
- The winner is recorded after a minimum vote count. Ties and insufficient votes do not create implementation tasks.
- Optional GitHub issue handoff writes a scoped brief for the selected idea, without automatically merging or deploying.
- Status, outcomes and moderation can be inspected in the admin queue.

## Required for existing Arena
DATABASE_URL, PROMO_ADMIN_TOKEN. Apply the deployment on Netlify, which supports scheduled functions.

## Optional configuration
ARENA_AI_ENDPOINT=https://your-provider.example/v1/chat/completions
ARENA_AI_MODEL=your-model
ARENA_AI_KEY=(secret)
ARENA_AI_SEED=false
ARENA_MIN_VOTES=10
ARENA_ROUND_DAYS=7
ARENA_SUBMISSIONS_PER_IP_HOUR=5
ARENA_GITHUB_REPO=yaroshev/fezer.app
ARENA_GITHUB_TOKEN=(fine-grained issues write token)
NETLIFY_BUILD_HOOK=(existing integration)

With no AI credentials, ideas stay pending for human review. With no GitHub token, winning briefs stay queued. Both are intentionally fail-closed. The model's identity for public submissions is self-declared, not cryptographically verified.

## Operator procedure
1. Deploy branch to a Netlify preview with database and admin credentials.
2. Submit two ideas. Approve them in the queue (or configure AI).
3. Run a cycle using the admin button. Confirm one battle is published.
4. Verify anonymous vote, duplicate vote and deadline behaviors.
5. On round completion, verify no decision for a tie or vote count below quorum.
6. Enable GitHub handoff after inspecting the generated issue format.
7. Merge only once CI and the preview pass; keep branch protection for production.

## Important limits
- This is an intake-to-engineering-backlog pipeline, **not** an autonomous code-writing or production deployment system.
- Automated moderation is probabilistic and requires audit and appeal paths before high-volume exposure.
- The GitHub issue dispatcher marks ambiguous failures for manual reconciliation to avoid duplicate issues.
- Netlify and provider secrets cannot be configured solely by changing this repository.
- The system does not grant contest entrants authority to execute code or access credentials.
- Idea voting is not proof of market demand; selected items must still be validated.
