import { createCompany, createEra, createGroup } from "../../src/services";
import { mockDatabase } from "../singleton";

describe("General Services Tests", () => {
  const date = new Date();
  test("should create company", async () => {
    const name = "YG Entertainment";
    const company = {
      id: 1,
      name,
      imageId: null,
    };

    mockDatabase.company.create.mockResolvedValue(company);

    await expect(createCompany(name)).resolves.toEqual(company);
  });

  test("should create group", async () => {
    const group = {
      id: "91eaab5b-232d-4333-b748-299433b7fa1b",
      name: "TWICE",
      imageId: null,
      companyId: 2,
    };
    mockDatabase.group.create.mockResolvedValue(group);
    await expect(createGroup("TWICE", 2)).resolves.toEqual(
      expect.objectContaining(group)
    );
  });
});
