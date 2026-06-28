# TODO - VaultMetaPanel for VaultDetail

## Steps

1. Create `src/components/VaultMetaPanel.tsx` implementing the labeled address metadata panel. ✅
2. Refactor `src/pages/VaultDetail.tsx` to use `<VaultMetaPanel />` instead of inline address card/row logic. ✅
3. Add `src/components/__tests__/VaultMetaPanel.test.tsx` covering:
   - missing verifier row hidden
   - all rows render when present
   - copy buttons render
   - explorer links render when network provided
     ✅ (existing tests present)
4. Update `src/pages/__tests__/VaultDetail.test.tsx` to keep existing assertions passing with the refactor, and add minimal assertions for explorer links if needed. ⏳ (ongoing via test failures)
5. Run `npm test` to ensure coverage thresholds and tests pass. ⏳
6. Commit-ready: ensure no regressions and address rows are accessible and token-styled. ⏳

---

## Current status (test stability work)

### Tooltip / jsdom compatibility

- Updated `src/components/Tooltip.tsx` to guard `window.matchMedia` usage when undefined (fixes crash in tests).
- Tooltip unit tests are still failing due to accessibility/role expectations for the hidden tooltip element.

### Test failures to resolve before completion

- `src/components/__tests__/Tooltip.test.tsx` (role/hidden behavior)
- Downstream tests currently failing because Tooltip behavior is not yet aligned with the suite expectations.
