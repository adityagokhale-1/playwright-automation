import { test as base } from '@playwright/test';

type User = {
    username: string;
    password: string;
};

export const test = base.extend<{ user: User }>({

    user: async ({ }, use, testInfo) => {

        const userIndex = testInfo.project.metadata.userIndex;

        const username =
            process.env[`USER_${userIndex}_USERNAME`];

        const password =
            process.env[`USER_${userIndex}_PASSWORD`];

        if (!username || !password) {
            throw new Error(
                `Missing credentials for worker ${userIndex}`
            );
        }

        console.log(
            `Worker ${userIndex} using ${username}`
        );

        await use({
            username,
            password
        });
    },

});

export const expect = test.expect;