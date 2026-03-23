/**
 * AI Panel Mixin/Helpers
 * 
 * Centralizes rendering logic for all AI suggestion panels so they stay in sync.
 * This eliminates the repetition of:
 * - Panel headers
 * - Loading states
 * - Error states
 * - Action buttons
 * - Suggestion item rendering
 */

// Canonical metadata for all AI panels
const AI_PANEL_META = {
  title: {
    heading: '✨ AI TITLE SUGGESTIONS',
    loadingLabel: 'Generating suggestions…',
    errorMsg: 'Could not parse title suggestions.',
    type: 'simple-list',
    hasAcceptAll: false,
    dismissOnAccept: true,
  },
  describe: {
    heading: '✨ AI DESCRIPTION SUGGESTIONS',
    loadingLabel: 'Generating suggestions…',
    errorMsg: 'Could not parse description suggestions.',
    type: 'simple-list',
    hasAcceptAll: false,
    dismissOnAccept: true,
  },
  falsepositives: {
    heading: '✨ AI FALSE POSITIVE SUGGESTIONS',
    loadingLabel: 'Generating suggestions…',
    errorMsg: 'Could not parse false positive suggestions.',
    type: 'simple-list',
    hasAcceptAll: true,
    dismissOnAccept: false,
    itemActionLabel: 'Add',
  },
  tags: {
    heading: '✨ AI TAG SUGGESTIONS',
    loadingLabel: 'Generating suggestions…',
    errorMsg: 'Could not parse tag suggestions.',
    type: 'chip-list',  // toggle-able chips instead of list
    hasAcceptAll: true,
    dismissOnAccept: false,
  },
  detection: {
    heading: '✨ AI DETECTION SUGGESTIONS',
    loadingLabel: 'Generating suggestions…',
    errorMsg: 'Could not parse detection suggestions.',
    type: 'complex-object',  // nested groups/filters
    hasAcceptAll: true,
    dismissOnAccept: false,
  },
  explain: {
    heading: '✨ RULE EXPLANATION',
    loadingLabel: 'Generating explanation…',
    errorMsg: 'Could not generate explanation.',
    type: 'markdown',  // just text, no suggestions array
    hasAcceptAll: false,
    dismissOnAccept: false,
  },
  review: {
    heading: '✨ RULE REVIEW',
    loadingLabel: 'Reviewing rule…',
    errorMsg: 'Could not review rule.',
    type: 'complex-object',  // annotated YAML + annotations
    hasAcceptAll: false,
    dismissOnAccept: false,
    hasScore: true,
  },
};

/**
 * Get canonical metadata for a feature
 */
function getAiPanelMeta(feature) {
  return AI_PANEL_META[feature] || {};
}

/**
 * Get heading for panel header
 */
function getAiPanelHeading(feature) {
  return getAiPanelMeta(feature).heading || '✨ AI SUGGESTIONS';
}

/**
 * Get loading label for loading state
 */
function getAiLoadingLabel(feature) {
  return getAiPanelMeta(feature).loadingLabel || 'Generating…';
}

/**
 * Get error message template
 */
function getAiErrorMsg(feature) {
  return getAiPanelMeta(feature).errorMsg || 'Could not parse suggestions.';
}

/**
 * Check if feature should show "Accept all" button
 */
function hasAcceptAllButton(feature) {
  return getAiPanelMeta(feature).hasAcceptAll === true;
}

/**
 * Check if panel should close after accepting a single item
 */
function dismissesOnAccept(feature) {
  return getAiPanelMeta(feature).dismissOnAccept === true;
}

/**
 * Get item action button label (Use vs Add)
 */
function getItemActionLabel(feature) {
  const meta = getAiPanelMeta(feature);
  if (meta.itemActionLabel) return meta.itemActionLabel;
  return dismissesOnAccept(feature) ? 'Use' : 'Add';
}

/**
 * Check if panel type is simple list
 */
function isSimpleList(feature) {
  return getAiPanelMeta(feature).type === 'simple-list';
}

/**
 * Check if panel type is chip-list (toggle-able)
 */
function isChipList(feature) {
  return getAiPanelMeta(feature).type === 'chip-list';
}

/**
 * Check if panel type is complex object
 */
function isComplexObject(feature) {
  return getAiPanelMeta(feature).type === 'complex-object';
}

/**
 * Check if panel type is markdown
 */
function isMarkdown(feature) {
  return getAiPanelMeta(feature).type === 'markdown';
}

/**
 * Check if panel displays a score badge (review)
 */
function hasScoreBadge(feature) {
  return getAiPanelMeta(feature).hasScore === true;
}

// Export all helpers for use in Vue setup()
window.AiPanelHelpers = {
  AI_PANEL_META,
  getAiPanelMeta,
  getAiPanelHeading,
  getAiLoadingLabel,
  getAiErrorMsg,
  hasAcceptAllButton,
  dismissesOnAccept,
  getItemActionLabel,
  isSimpleList,
  isChipList,
  isComplexObject,
  isMarkdown,
  hasScoreBadge,
};
