import bcrypt from "bcrypt";

// Hash
export const hashPassword = async (password: string): Promise<string> => {
  const hashedPw = await bcrypt.hash(password, generateNumber());
  return hashedPw;
};

export const verifyPassword = async (
  input: string,
  hashed: string
): Promise<boolean> => {
  return await bcrypt.compare(input, hashed);
};

// Logic
const generateNumber = (): number => {
  const minimum = 5;
  const maximum = 15;
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};
