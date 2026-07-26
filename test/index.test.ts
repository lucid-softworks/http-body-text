import { describe, expect, it } from "vitest";

import {
  HttpTextBodyTooLargeError,
  readTextBody,
  textResponse,
} from "../src/index.js";

const makeRequest = (): Request =>
  new Request("https://example.com", { body: "💡", method: "POST" });

describe("text HTTP bodies", () => {
  it("reads text with and without a size limit", async () => {
    await expect(readTextBody(makeRequest())).resolves.toBe("💡");
    await expect(readTextBody(makeRequest(), 4)).resolves.toBe("💡");
    await expect(readTextBody(makeRequest(), 3)).rejects.toEqual(
      new HttpTextBodyTooLargeError(3),
    );
  });

  it("creates default and customized text responses", async () => {
    const response = textResponse("hello", { status: 202 });
    expect(await response.text()).toBe("hello");
    expect(response.headers.get("content-type")).toBe(
      "text/plain; charset=utf-8",
    );
    expect(response.status).toBe(202);
    const custom = textResponse("x", {
      headers: { "content-type": "text/markdown" },
    });
    expect(custom.headers.get("content-type")).toBe("text/markdown");
  });
});
