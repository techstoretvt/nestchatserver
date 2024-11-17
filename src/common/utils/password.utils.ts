/** @format */

import PasswordValidator from "password-validator";
import * as bcrypt from "bcrypt";

export const PasswordUtils = {
    validatePassword: (password: string) => {
        var schema = new PasswordValidator();
        // Add properties to it
        schema
            .is()
            .min(8) // Minimum length 8
            .is()
            .max(100) // Maximum length 100
            .has()
            .uppercase() // Must have uppercase letters
            .has()
            .lowercase() // Must have lowercase letters
            .has()
            .digits(1) // Must have at least 2 digits
            .has()
            .not()
            .spaces() // Should not have spaces
            .is()
            .not()
            .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

        return schema.validate(password, { details: true }) as any;
    },

    hashPassword: async (password: string) => {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    },

    comparePassword: async (password: string, hash: string) => {
        return await bcrypt.compare(password, hash);
    },
};
