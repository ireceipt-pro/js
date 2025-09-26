"use strict";
const { describe, it } = require("node:test");
const assert = require("node:assert");
const { IReceiptPRO } = require("../dist/cjs/index");

describe("Testing lib.", function () {
  it("constructor", async function () {
    const key = "test";
    const irp = new IReceiptPRO(key);
    assert.equal(irp instanceof IReceiptPRO, true);
    assert.equal(irp.apiKey, key);
  });

  it("useApiKey", async function () {
    const key = "test";
    const irp = IReceiptPRO.useApiKey(key);
    assert.equal(irp instanceof IReceiptPRO, true);
    assert.equal(irp.apiKey, key);
  });
});
