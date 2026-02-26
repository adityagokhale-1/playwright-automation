import { test as base } from '@playwright/test';

type User = {
    username: string;
    password: string;
};

export const test = base.extend<{ user: User }>({

    user: async ({ }, use, workerInfo) => {

        const workerIndex = workerInfo.workerIndex + 1;

        const username =
            process.env[`USER_${workerIndex}_USERNAME`];

        const password =
            process.env[`USER_${workerIndex}_PASSWORD`];

        if (!username || !password) {
            throw new Error(
                `Missing credentials for worker ${workerIndex}`
            );
        }

        console.log(
            `Worker ${workerIndex} using ${username}`
        );

        await use({
            username,
            password
        });
    },

});

export const expect = test.expect;