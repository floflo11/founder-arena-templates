export function parseShopifyDomain(domain: string) {
  const normalized = domain
    .trim()
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")

  // Handle cases like "admin.shopify.com/store/storename"
  const adminMatch = normalized.match(/admin\.shopify\.com\/store\/([^/]+)/)
  if (adminMatch) {
    const storeName = adminMatch[1].replace(".myshopify.com", "")
    return `${storeName}.myshopify.com`
  }

  // If it's already a .myshopify.com domain, return it
  if (normalized.endsWith(".myshopify.com")) {
    return normalized
  }

  // Remove any .myshopify.com if it exists and re-add it
  const storeName = normalized.split(".")[0]
  return `${storeName}.myshopify.com`
}
