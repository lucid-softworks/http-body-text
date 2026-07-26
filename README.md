# `@lucid-softworks/http-body-text`

UTF-8 text request reading and response creation.

```ts
import { readTextBody, textResponse } from "@lucid-softworks/http-body-text";

const text = await readTextBody(request, 16_384);
return textResponse(text);
```

Limits apply to encoded bytes rather than JavaScript string length. Caller
content-type headers are retained.
