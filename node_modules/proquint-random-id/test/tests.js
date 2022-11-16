var proquintRandomId = require("../"),
    assert = require("chai").assert;

describe("proquint-random-id", function() {
  describe("without a length specified", function() {
    it("should generate an id", function() {
      var id = proquintRandomId();

      assert.ok(id);
    });

    describe("the id", function() {
      var id = proquintRandomId();

      it("should be a string", function() {
        assert.isString(id);
      });

      it("should be 17 characters in length", function() {
        assert.lengthOf(id, 17);
      });

      it("should only be letters and dashes", function() {
        assert.match(id, /^[a-z-]+$/);
      });

      it("shouldn't have any repeating characters", function() {
        assert.notMatch(id, /(.)\1/);
      });
    });
  });

  describe("with a length of 4 specified", function() {
    it("should generate an id 11 characters in length", function() {
      var id = proquintRandomId(4);

      assert.lengthOf(id, 11);
    });
  });
});
