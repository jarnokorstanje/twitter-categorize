import Accounts from '../models/account.js';

export default {
    Category: {
        Accounts: (parent, args) => {
            return parent.Accounts.map((id) => Accounts.findById(id));
        },
    },
};