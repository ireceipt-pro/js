"use strict";
require("mocha");
const { IReceiptPRO } = require("../lib/index");

describe("Testing errors.", function () {
  const irp = new IReceiptPRO("test");
  const testTemplateId = "check";
  const testTemplateArgs = { ping: "pong" };
  const testTemplateSize = { width: 100, height: 210 };

  this.timeout(60000);

  it("Token invalid", async function () {
    let error;
    try {
      await irp.createWebpFromPublicTemplate(
        testTemplateId,
        testTemplateArgs,
        testTemplateSize
      );
    } catch (err) {
      error = err;
    }
    expect(error).to.be.instanceof(Error);
    expect(error.message).to.be.an("string");
    expect(error.message).to.be.eql("Token invalid");
  });
});
