import { UserRepository } from "../user/UserRepository";
import { closeConnections } from "./KnexInstance";

describe("BaseModel", () => {
  const userRepository: UserRepository = new UserRepository();

  const user1 = {
    username: "testuser1",
    password: "testpass",
    isActive: true,
  };

  const user2 = {
    username: "testuser2",
    password: "testpass",
    isActive: true,
  };

  const user3 = {
    username: "testuser3",
    password: "testpass",
    isActive: false,
  };

  beforeAll(async () => {
    await userRepository.saveAll([user1, user2]);
  });

  afterAll(async () => {
    await userRepository.deleteAllWhere({ username: user1.username });
    await userRepository.deleteAllWhere({ username: user2.username });
    closeConnections(); // ensures jest doesn't hang
  });

  describe("saveAll", () => {
    it("should save all entries", async () => {
      const user1Retrieved = await userRepository.findOneWhere({
        username: user1.username,
      });
      const user2Retrieved = await userRepository.findOneWhere({
        username: user2.username,
      });

      expect(user1Retrieved).toBeDefined();
      expect(user2Retrieved).toBeDefined();
    });
  });

  describe("saveOne", () => {
    it("should save one entry", async () => {
      await userRepository.saveOne(user3);

      const user3Retrieved = await userRepository.findOneWhere({
        username: user3.username,
      });
      expect(user3Retrieved).toBeDefined();
    });
  });

  describe("deleteAllWhere", () => {
    it("should delete all entries where", async () => {
      await userRepository.deleteAllWhere({ isActive: false });

      const inactiveUsers = await userRepository.findAllWhere({
        isActive: false,
      });
      expect(inactiveUsers).toEqual([]);
    });
  });

  describe("findOneWhere", () => {
    it("should return undefined if no matching entry exists", async () => {
      const entry = await userRepository.findOneWhere({ username: "nonuser" });
      expect(entry).toBeUndefined;
    });

    it("should return 1 entry when multiple exist", async () => {
      const entry = await userRepository.findOneWhere({ isActive: true });
      expect(entry).toBeDefined;
    });
  });

  describe("findAllWhere", () => {
    it("should return empty array if no matching entry exists", async () => {
      const entries = await userRepository.findAllWhere({
        username: "nonuser",
      });
      expect(entries).toEqual([]);
    });

    it("should return array of all entries meeting criteria", async () => {
      const entries = await userRepository.findAllWhere({ isActive: true });
      expect(entries.length).toBeGreaterThanOrEqual(2);
    });

    it("should return array of all entries meeting criteria with a limit", async () => {
      const entries = await userRepository.findAllWhere({ isActive: true }, 1);
      expect(entries.length).toBeGreaterThanOrEqual(1);
    });

    it("should return array of all entries meeting criteria with an offset", async () => {
      const entries = await userRepository.findAllWhere(
        { isActive: true },
        undefined,
        1,
      );
      expect(entries).toContainEqual(expect.objectContaining(user2));
      expect(entries).not.toContainEqual(expect.objectContaining(user1));
    });
  });

  describe("updateWhere", () => {
    it("should update all entries where", async () => {
      await userRepository.updateWhere({ isActive: true }, { isActive: false });

      const activeUsers = await userRepository.findAllWhere({
        isActive: true,
      });
      expect(activeUsers).toEqual([]);
    });
  });
});
