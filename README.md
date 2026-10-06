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

Note the dot in the scope. `@ireceipt.pro/js`, not `@ireceipt-pro/js`. And the
unscoped names on npm are not us: `ireceipt` is an unrelated Taiwanese e-receipt
library, `ireceipt-angular-client` an abandoned Angular CLI scaffold at 0.0.0.

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

## Is this the right tool for you?

**There is no raw HTML → PDF endpoint.** Every call names a template that
already lives on our side, either one of the public ones or one you author in
the dashboard, and you supply the data as JSON. Nothing about your page markup
is sent at request time.

So if your layouts have to be versioned inside your own repository, next to the
code that fills them, this is the wrong shape and something like Puppeteer,
WeasyPrint or Gotenberg will serve you better. That is a real architectural
difference rather than a missing feature, and it is worth knowing in the first
minute rather than the first week.

If you would rather not operate a browser binary to produce an invoice, it is
the right shape.

## Behaviour worth knowing before you wire it up

**Success is `201`, not `200`.** The file's bytes are the response body. This
catches people who wrap the call in something that treats anything but 200 as a
failure.

**Not everything is retried.** `createFile` makes up to five attempts, but only
for failures a later attempt could plausibly fix: transport errors where no
response arrived at all, 5xx, 408 and 429. A `401`, `403`, `404` or `422` throws
on the first attempt.

The sleeps between attempts are `(attempt + 1) × 1000ms`, so a fully retried
failure spends `2 + 3 + 4 + 5 = 14s` across four sleeps. Budget your timeout for
that number, and only for those statuses. A bad API key does not take 14
seconds; it throws almost immediately.

**A `403` may be a URL typo rather than a key problem.** The wire endpoint is:

```
POST https://api.ireceipt.pro/v1/{format}/{scope}/{templateId}
```

with `format` one of `pdf | jpg | png | webp` and `scope` one of
`public | private`. A wrong **format** segment returns a clean `404`. A wrong
**scope** segment returns `403 {"message":"Token invalid"}` — which is byte for
byte what a genuinely invalid key returns. If you are getting `Token invalid`
with a key you are confident in, check the scope segment before you rotate
anything.

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
| `size` | no | `{ width, height }` in pixels, e.g. `{ width: 796, height: 1126 }` |

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
