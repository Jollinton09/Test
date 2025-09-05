function simulateContractReview(contract) {
  const text = (contract.text || '') + ' ' + (contract.title || '');
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const issues = [];
  if (wordCount < 50) issues.push({ code: 'SHORT_DOC', message: 'Contract is unusually short' });
  if (/liabilit/i.test(text)) issues.push({ code: 'LIABILITY_NOTICE', message: 'Liability clause found — check limits' });
  if (/termination/i.test(text)) issues.push({ code: 'TERMINATION', message: 'Termination clause present — review notice period' });

  const riskScore = Math.min(100, Math.round((issues.length * 40) + (wordCount / 10)));

  return {
    contractId: contract.id,
    reviewedAt: new Date().toISOString(),
    summary: `Simulated review: ${issues.length} flagged issue(s). Word count: ${wordCount}.`,
    issues,
    riskScore
  };
}

module.exports = { simulateContractReview };
