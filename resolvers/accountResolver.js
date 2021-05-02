import Accounts from '../models/account.js';

export default {
    Category: {
        accounts: (parent, args) => {
            return parent.accounts.map((id) => Accounts.findById(id));
        },
    },
};