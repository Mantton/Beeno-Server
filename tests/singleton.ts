import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import database from "../src/helpers/prisma";

/**
 * The singleton file tells Jest to mock a default export (the Prisma client instantiated in ../src/helpers/prisma),
 *  and uses the mockDeep method from jest-mock-extended to enable access to the objects and methods available on the Prisma client.
 *  It then resets the mocked instance before each test is run.
 * @link https://www.prisma.io/docs/guides/testing/unit-testing
 */
jest.mock("../helpers/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(mockDatabase);
});

export const mockDatabase = database as unknown as DeepMockProxy<PrismaClient>;
