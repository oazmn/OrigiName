const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidGameId(id: unknown): id is string {
  return typeof id === "string" && UUID.test(id);
}
