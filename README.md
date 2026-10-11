# @ireceipt.pro/js

Create PDF files and images (JPG, PNG, WEBP) from hosted templates and JSON.

[![npm](https://img.shields.io/npm/v/@ireceipt.pro/js.svg)](https://www.npmjs.com/package/@ireceipt.pro/js)
[![npm](https://img.shields.io/npm/dy/@ireceipt.pro/js.svg)](https://www.npmjs.com/package/@ireceipt.pro/js)
[![NpmLicense](https://img.shields.io/npm/l/@ireceipt.pro/js.svg)](https://www.npmjs.com/package/@ireceipt.pro/js)
![GitHub last commit](https://img.shields.io/github/last-commit/ireceipt-pro/js.svg)
![GitHub release](https://img.shields.io/github/release/ireceipt-pro/js.svg)

```bash
npm i @ireceipt.pro/js
```

Note the dot in the scope: `@ireceipt.pro/js`, not `@ireceipt-pro/js`.

## Your first file

You need an API key and a template id, both from <https://dashboard.ireceipt.pro>.
The template ids below are public, so you can run this before creating anything
of your own.

```ts
import { IReceiptPRO } from '@ireceipt.pro/js';

const irp = new IReceiptPRO(process.env.IRECEIPTPRO_API_KEY);

const pdf = await irp.createPdfFromPublicTemplate(
  'invoice_universal_vzrt6k1s',
  { invoice: { number: '13' } }
);
```

`pdf` is a `Buffer` (or `ArrayBuffer`, depending on your runtime). Write it to
disk, stream it, attach it to an email — it is just the file's bytes.

CommonJS works the same way:

```js
const { IReceiptPRO } = require('@ireceipt.pro/js');
const irp = new IReceiptPRO(process.env.IRECEIPTPRO_API_KEY);
```

## How it works

**There is no raw HTML → PDF endpoint.** Every call names a template that
already lives on our side, either one of the public ones or one you author in
the dashboard, and you supply the data as JSON. Nothing about your page markup
is sent at request time.

## Behaviour worth knowing before you wire it up

**Success is `201`, not `200`.** The file's bytes are the response body. This
catches people who wrap the call in something that treats anything but 200 as a
failure.

**Not everything is retried.** `createFile` makes up to five attempts, but only
for failures a later attempt could plausibly fix: transport errors where no
response arrived at all, 5xx, 408 and 429. Any other error, a `400`, `401`,
`403` or `404`, throws on the first attempt.

The sleeps between attempts are `(attempt + 1) × 1000ms`, so a fully retried
failure spends `2 + 3 + 4 + 5 = 14s` across four sleeps. Budget your timeout for
that number, and only for those statuses. A bad API key does not take 14
seconds; it throws almost immediately.

**What the errors mean.** The SDK throws an `Error` whose `message` is the
server's message; the HTTP status is not attached to it, so match on the text.

| status | `message` | cause |
| --- | --- | --- |
| `400` | `Invalid template name` | no template with that id in that scope (public vs your own) |
| `400` | `A size larger than …` / `A size smaller than …` | `size` outside the allowed range, see below |
| `401` | `Unauthorized` | no `Authorization` header. Raw HTTP only: the SDK always sends one, so an unset key (say, a missing env var) goes out as `Bearer undefined` and comes back as `Token invalid` |
| `403` | `Token invalid` / `Token expired` | the key is unknown, revoked or expired |
| `403` | `Limit exceeded` | your plan's monthly request limit is used up |
| `403` | `A size larger than 1200x1200 requires a paid subscription.` | free-plan size cap |
| `500` | varies | rendering failed on our side; the SDK retries it |

None of the `4xx` in this table are retried, so `Limit exceeded` fails fast
instead of burning another 14 seconds.

## Methods

Four formats × two scopes:

| method | output | template |
| --- | --- | --- |
| `createPdfFromPublicTemplate` | PDF | public |
| `createJpgFromPublicTemplate` | JPG | public |
| `createPngFromPublicTemplate` | PNG | public |
| `createWebpFromPublicTemplate` | WEBP | public |
| `createPdfFromPrivateTemplate` | PDF | yours |
| `createJpgFromPrivateTemplate` | JPG | yours |
| `createPngFromPrivateTemplate` | PNG | yours |
| `createWebpFromPrivateTemplate` | WEBP | yours |

All eight take the same arguments:

```ts
const buffer: Buffer | ArrayBuffer = await irp.createPdfFromPublicTemplate(
  templateId,
  args,
  size
);
```

| argument | required | what it is |
| --- | --- | --- |
| `templateId` | yes | from <https://dashboard.ireceipt.pro>. Ids are stable; template *names* are not, so key off the id |
| `args` | yes | the data substituted into the template. On the wire this field is called `variables` |
| `size` | no | `{ width, height }` in pixels. Default A4 portrait, `796 × 1126`. Up to `1200 × 1200` on the free plan; on a paid plan up to `5000 × 5000` for PDF and `3200 × 3200` for images. A PDF must be at least `100 × 210` |

There is also `IReceiptPRO.useApiKey(apiKey)`, a static factory equivalent to
`new IReceiptPRO(apiKey)`.

## Calling it without the SDK

There is no package for us on PyPI, RubyGems or Packagist, so from anything that
is not Node it is a plain HTTP call:

```
POST https://api.ireceipt.pro/v1/pdf/public/invoice_universal_vzrt6k1s
Authorization: Bearer <your api key>
Content-Type: application/json

{"variables": {"invoice": {"number": "13"}}}
```

The path is `/v1/{pdf|jpg|png|webp}/{public|private}/{templateId}`; an unknown
format segment is a `404`, an unknown scope a `400 Invalid template type`. Besides
`variables` and `size`, the body accepts `format` (`a4-portrait`, `a5-landscape`,
… `a1` to `a7`), which takes precedence over `size`; the SDK does not send it.

`201`, with the PDF bytes as the response body. The full OpenAPI specification is
published at <https://api.ireceipt.pro/openapi.yml>, with a browsable reference
at <https://api.ireceipt.pro/>.

## Runtime

Node ≥ 16. Dual ESM/CJS with type declarations for both. One dependency
(`axios`). MIT.

## Templates

Public templates you can call today. Each image links to a live sandbox where you
can change the data and re-render it in the browser.

| | |  |
| --- | --- | --- |
| [![invoice_for_services_h2lmu9s2](https://raw.githubusercontent.com/ireceipt-pro/js/refs/heads/main/assets/images/public_images_invoice_for_services_h2lmu9s2.png "invoice_for_services_h2lmu9s2")](https://dashboard.ireceipt.pro/sandbox/public/invoice_for_services_h2lmu9s2) | [![invoice_universal_e2wa2qvy](https://raw.githubusercontent.com/ireceipt-pro/js/refs/heads/main/assets/images/public_images_invoice_universal_e2wa2qvy.png "invoice_universal_e2wa2qvy")](https://dashboard.ireceipt.pro/sandbox/public/invoice_universal_e2wa2qvy) | [![invoice_universal_k5gizy86](https://raw.githubusercontent.com/ireceipt-pro/js/refs/heads/main/assets/images/public_images_invoice_universal_k5gizy86.png "invoice_universal_k5gizy86")](https://dashboard.ireceipt.pro/sandbox/public/invoice_universal_k5gizy86) |

|  |  |
| --- | --- |
| [![invoice_universal_qg1oiing](https://raw.githubusercontent.com/ireceipt-pro/js/refs/heads/main/assets/images/public_images_invoice_universal_qg1oiing.png "invoice_universal_qg1oiing")](https://dashboard.ireceipt.pro/sandbox/public/invoice_universal_qg1oiing) | [![invoice_universal_vzrt6k1s](https://raw.githubusercontent.com/ireceipt-pro/js/refs/heads/main/assets/images/public_images_invoice_universal_vzrt6k1s.png "invoice_universal_vzrt6k1s")](https://dashboard.ireceipt.pro/sandbox/public/invoice_universal_vzrt6k1s) |

To author your own, or to find more ids, sign in at
<https://dashboard.ireceipt.pro>.

## A fuller example

The four-line call at the top is the whole API. This is what a real invoice
payload looks like once the template is actually being filled:

```ts
import { IReceiptPRO } from '@ireceipt.pro/js';

const irp = new IReceiptPRO(process.env.IRECEIPTPRO_API_KEY);

await irp.createJpgFromPublicTemplate("invoice_universal_vzrt6k1s", {
  "invoice": {
    "number": "13",
    "date": "2023-10-03",
    "table": {
      "headers": ["NAME", "PRICE", "QTY", "AMOUNT"],
      "rows": [
        { "values": ["Gorgeous Fresh Car", "$100.99", "6", "$605.94"] },
        { "values": ["Incredible Rubber Bike", "$356.00", "1", "$356.00"] },
        { "values": ["UX Services", "$100.00", "2", "$200.00"] },
        { "values": ["Development Service", "$2000.00", "1", "$2000.00"] }
      ]
    },
    "total": "$3161.94",
    "terms": [
      "Payment is due within 5 days",
      "Payment method CARD"
    ]
  },
  "from": {
    "companyName": "IReceipt PRO",
    "lines": ["Identification Number: 55891434", "support@ireceipt.pro"]
  },
  "to": {
    "companyName": "Morissette - Bogisich",
    "lines": ["969 Harber Expressway", "South Aishaton", "GB"]
  },
  "localization": {
    "invoice": "INVOICE",
    "bill_to": "BILL TO",
    "date": "DATE",
    "total": "Total",
    "terms_and_conditions": "TERMS & CONDITIONS"
  }
}, {
  "width": 796,
  "height": 1126
})
```

Which keys a template expects is a property of that template — open its sandbox
to see the shape it wants.

## How it fits together

![IReceipt PRO Flow](https://ireceipt.pro/assets/images/main-flow-landscape.drawio.svg)

## Licence

MIT.
