import z from "zod";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const getFirstError = (error: z.ZodError) => {
    const flatErrors = error.flatten();

    if (flatErrors.formErrors.length > 0) {
        return flatErrors.formErrors[0];
    }

    const fieldKeys = Object.keys(flatErrors.fieldErrors);
    if (fieldKeys.length > 0) {
        const fieldErrors = flatErrors.fieldErrors as Record<string, string[]>;
        const firstKey = fieldKeys[0];
        return fieldErrors[firstKey]?.[0];
    }

    return "Invalid input";
}

export const passwordHasher = async (pswrd: string): Promise<string> => {
    const result = await bcrypt.hash(pswrd, SALT_ROUNDS);
    return result;
};

export const checkPasswordMatch = async (
    password: string,
    hashedPassword: string,
): Promise<boolean> => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
};