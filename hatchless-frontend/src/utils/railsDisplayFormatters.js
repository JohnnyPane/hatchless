const formatPriceInCents = (cents) => {
  if (cents === 0 || cents === null || cents === undefined || isNaN(cents)) {
    return 'Free';
  }

  return `$${(cents / 100).toFixed(2)}`;
};

export { formatPriceInCents };