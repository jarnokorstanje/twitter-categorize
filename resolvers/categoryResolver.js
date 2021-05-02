import Category from '../models/category.js';
import Account from '../models/account.js';
import mongoose from 'mongoose'

export default {
    Query: {
        categories: async (parent, args) => {
            try {
                let res;
                if (args.userId) {
                    const userId = String(args.userId);
                    res = await Category.find({ userId: userId });
                } else {
                    res = await Category.find();
                }
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
        addCategory: async (parent, args, context) => {
            if (!context.user) {
                throw new Error('Authentication failed');
            }        
            try {
                const categoryData = { ...args };

                const accounts = args.accounts;
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
                    accounts: accountIds,
                });

                newCategory.save();
                return newCategory;
            } catch (e) {
                console.log(`Error while creating category ${e.message}`);
            }
        },
        modifyCategory: async (parents, args, context) => {
            if (!context.user) {
                throw new Error('Authentication failed');
            }
            try {
                args.accounts = await Promise.all(args.accounts.map(async account => {
                    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
                    // if id is provided update, else generate new id
                    let accountId = account.id || mongoose.Types.ObjectId();
                    return Account.findOneAndUpdate(
                        { _id: accountId }, 
                        { handle: account.handle }, 
                        options
                    );
                }));
                return Category.findOneAndUpdate(args.id, args, {new: true});
            } catch (e) {
                console.log(`Error while updating category ${e.message}`);
            }
        },
        deleteCategory: async (parent, args, context) => {
            if (!context.user) {
                throw new Error('Authentication failed');
            }
            try {
                await Category.findOneAndDelete(args.id);
                return `Category deleted with ID: ${args.id}`;
            } catch (e) {
                console.log(`Error while deleting category: ${e.message}`);
            }
        },
    },
};