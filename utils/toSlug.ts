export function toSlug(str: string) {
  return decodeURIComponent(str).toLowerCase().trim().replace(/\s+/g, "-");
}
