import Category from '../models/category.js';
import Account from '../models/account.js';

export default {
    Query: {
        categories: async (parent, args) => {
            try {
                const start = args.start ? parseInt(args.start) : 0;
                const limit = args.limit ? parseInt(args.limit) : 10;

                let res = await Category.find().skip(start).limit(limit);
                return res;
            } catch (e) {
                console.log(`Error while getting categories: ${e.message}`);
            }
        },
        category: async (parent, args) => {
            return Category.findById(args.id);
        },
    },
    Mutation: {
        addCategory: async (parent, args) => {
            try {
                const categoryData = { ...args };

                const accounts = args.Accounts;
                const accountIds = await Promise.all(
                    accounts.map(async (con) => {
                        try {
                            const newAccount = new Account(con);
                            await newAccount.save();
                            return newAccount._id;
                        } catch (e) {
                            console.log(
                                `Error while creating account ${e.message}`
                            );
                        }
                    })
                );

                const newCategory = new Category({
                    ...categoryData,
                    Accounts: accountIds,
                });

                newCategory.save();
                return newCategory;
            } catch (e) {
                console.log(`Error while creating category ${e.message}`);
            }
        },
        modifyCategory: async (parents, args) => {
            try {
                const categoryId = args.id;
                const accounts = args.Accounts;
                const categoryData = {
                    Title: args.Title,
                };

                const categoryUpdateData = await Category.findByIdAndUpdate(
                    categoryId,
                    categoryData,
                    {
                        new: true,
                    }
                );

                if (accounts) {
                    const accountID = accounts[0].id;
                    const accountData = {
                        Title: accounts[0].Title,
                    };
                    try {
                        await Account.findByIdAndUpdate(accountID, accountData, {
                            new: true,
                        });
                    } catch (e) {
                        console.log(
                            `Error while updating account ${e.message}`
                        );
                    }
                }

                return categoryUpdateData.save();
            } catch (e) {
                console.log(`Error while updating category ${e.message}`);
            }
        },
        deleteCategory: async (parent, args) => {
            try {
                const id = args.id;
                await Category.findByIdAndDelete(id);
                return id;
            } catch (e) {
                console.log(`Error while deleting category ${e.message}`);
            }
        },
    },
};