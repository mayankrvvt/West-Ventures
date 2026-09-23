/**
 * Joins truthy class names together, ignoring falsy values.
 * Usage: classNames("btn", isActive && "btn-active")
 */
export function classNames(...values) {
  return values.filter(Boolean).join(" ");
}
