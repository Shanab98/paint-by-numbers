import { UserRepository } from "../user/UserRepository";


// TODO: why did jest not exit after running test?
describe("BaseModel", () => {
  let userRepository: UserRepository;

  userRepository = new UserRepository()
  
  const username1 = "testuser1"
  describe("findOneWhere", () => {
    it("should return undefined if no matching entry exists", async () => {
      const entry = await userRepository.findOneWhere({ username: "nonuser" })
      expect(entry).toBeUndefined

    })
    it("should return 1 entry when multiple exist", async () => {
      const entry = await userRepository.findOneWhere({ username: username1 })
      expect(entry).toBeDefined
    })
  })

})
