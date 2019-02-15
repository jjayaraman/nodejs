var assert = require('assert');

describe("retrieve user", () => {
  let user;

  before(async () => {
  });

  after(async () => {
  });

  describe("valid request", () => {
    it("should return 200 and the user resource, including the email field, when retrieving the authenticated user", async () => {
      const response = await withLogin(
        request(api).get(`/country`)
      );

      expect(response).to.have.status(200);
      // expect(response.body._id).to.equal(user._id.toString());
      // expect(response.body).to.not.have.an("email")
    });

  });

  // describe("invalid requests", () => {
  //   it("should return 404 if requested user does not exist", async () => {
  //     const nonExistingId = "5b10e1c601e9b8702ccfb974";
  //     expect(await User.findOne({ _id: nonExistingId })).to.be.null;

  //     const response = await withLogin(
  //       request(api).get(`/users/${nonExistingId}`),
  //       authUser
  //     );
  //     expect(response).to.have.status(404);
  //   });
  // });
});
