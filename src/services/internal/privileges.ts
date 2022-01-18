import { privileges } from "../../config/constants";
import { database } from "../../helpers";

export const getAccountPrivileges = async (id: number) => {
  const leges = await database.privilege.findMany({
    where: {
      accountId: id,
    },
    select: {
      privilege: true,
    },
  });

  return leges.map((x) => x.privilege);
};

export const addPrivilegeToAccount = async (
  privilege: number,
  accountId: number
) => {
  const exists = await database.privilege.findUnique({
    where: {
      accountId_privilege: {
        accountId,
        privilege,
      },
    },
  });
  if (exists) return;

  await database.privilege.create({
    data: {
      accountId,
      privilege,
    },
  });
};
export const removePrivilegeFromAccount = async (
  privilege: number,
  accountId: number
) => {
  const exists = await database.privilege.findUnique({
    where: {
      accountId_privilege: {
        accountId,
        privilege,
      },
    },
  });
  if (!exists) return;

  await database.privilege.delete({
    where: {
      accountId_privilege: {
        accountId,
        privilege,
      },
    },
  });
};

export const hasNecessaryPrivileges = async (
  privilege: number,
  accountId: number
) => {
  const leges = await getAccountPrivileges(accountId);
  const hasPrivilege = (element: number) =>
    [privileges.SUPERUSER, privilege].includes(element);
  return leges.some(hasPrivilege);
};
