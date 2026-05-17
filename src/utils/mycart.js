export const getMycartSearchUrl = (query) => {
  return `https://www.mycart.pk/catalogsearch/result/?q=${encodeURIComponent(query)}`
}

