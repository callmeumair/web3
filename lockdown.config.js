// Lockdown configuration for Secure EcmaScript
export default {
  errorTaming: 'unsafe',
  consoleTaming: 'unsafe',
  overrideTaming: 'severe',
  stackFiltering: 'verbose',
  requireTaming: false,
  frozenIntrinsics: false,
  domainTaming: 'unsafe',
}; 