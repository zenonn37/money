//total function
export const totalTransaction = array => {
    return array.reduce((total, transaction) => {
        console.log(transaction.type);

        if (transaction.type === 'Deposit') {
            return total + parseInt(transaction.amount);
        } else {
            return total - parseInt(transaction.amount);
        }


    }, 0)
}

export const totalAccount = array => {
    return array.reduce((total, account) => {
        return total + parseInt(account.balance)
    }, 0)
}