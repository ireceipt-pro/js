"use strict";
require("mocha");
const { IReceiptPRO } = require("../lib/index");

describe("Testing lib.", function () {
  it("constructor", async function () {
    const key = "test";
    const irp = new IReceiptPRO(key);
    expect(irp).to.be.instanceof(IReceiptPRO);
    expect(irp.apiKey).to.be.eql(key);
  });

  it("useApiKey", async function () {
    const key = "test";
    const irp = IReceiptPRO.useApiKey(key);
    expect(irp).to.be.instanceof(IReceiptPRO);
    expect(irp.apiKey).to.be.eql(key);
  });
});
