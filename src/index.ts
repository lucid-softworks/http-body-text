export class HttpTextBodyTooLargeError extends Error {
  override readonly name = "HttpTextBodyTooLargeError";

  constructor(readonly maxBytes: number) {
    super(`Text body exceeds the ${maxBytes} byte limit`);
  }
}

/** Reads a text body and optionally enforces its encoded byte length. */
export async function readTextBody(
  request: Request,
  maxBytes?: number,
): Promise<string> {
  const text = await request.text();
  if (
    maxBytes !== undefined &&
    new TextEncoder().encode(text).byteLength > maxBytes
  ) {
    throw new HttpTextBodyTooLargeError(maxBytes);
  }
  return text;
}

export function textResponse(text: string, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "text/plain; charset=utf-8");
  }
  return new Response(text, { ...init, headers });
}
