// var assert = require('assert');

// describe("retrieve user", () => {
//   let user;

//   before(async () => {
//     await loadFixture("user");
//     user = await User.findOne({ email: authUser.email });
//     expect(user).to.not.be.null;
//   });

//   after(async () => {
//     await User.remove().exec();
//   });

//   describe("valid request", () => {
//     it("should return 200 and the user resource, including the email field, when retrieving the authenticated user", async () => {
//       const response = await withLogin(
//         request(api).get(`/country/${user._id}`),
//         authUser
//       );

//       expect(response).to.have.status(200);
//       expect(response.body._id).to.equal(user._id.toString());
//     });

//     it("should return 200 and the user resource, excluding the email field, when retrieving another user", async () => {
//       const anotherUser = await User.findOne({
//         email: "another_user@email.com"
//       });

//       const response = await withLogin(
//         request(api).get(`/users/${anotherUser.id}`),
//         authUser
//       );

//       expect(response).to.have.status(200);
//       expect(response.body._id).to.equal(anotherUser._id.toString());
//       expect(response.body).to.not.have.an("email");
//     });
//   });

//   describe("invalid requests", () => {
//     it("should return 404 if requested user does not exist", async () => {
//       const nonExistingId = "5b10e1c601e9b8702ccfb974";
//       expect(await User.findOne({ _id: nonExistingId })).to.be.null;

//       const response = await withLogin(
//         request(api).get(`/users/${nonExistingId}`),
//         authUser
//       );
//       expect(response).to.have.status(404);
//     });
//   });
// });
