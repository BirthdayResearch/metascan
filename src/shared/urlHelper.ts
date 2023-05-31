/**
 * Only considers the first slash of the query
 * E.g. /tx/[txId]?q=123 -> /tx
 * The second slash onwards is omitted entirely
 */
export function getTopLevelRoute(url: string): string {
  const match = url.match(/(\/[^/]*)/);
  const baseRoute = match ? match[0] : url;
  return removeQueryParams(baseRoute);
}

export function removeQueryParams(url) {
  return url.split("?")[0];
}
