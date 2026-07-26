# `@lucid-softworks/http-body-text`

UTF-8 text request reading and response creation.

```ts
import { readTextBody, textResponse } from "@lucid-softworks/http-body-text";

const request = new Request("https://example.com/messages", {
  body: "Hello",
  method: "POST",
});
const text = await readTextBody(request, 16_384);
const response = textResponse(text);
```

Limits apply to encoded bytes rather than JavaScript string length. Caller
content-type headers are retained.
