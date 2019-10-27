//total function
export const totalTransaction = array => {
    return array.reduce((total, transaction) => {
        console.log(transaction.type);

        if (transaction.type === 'Deposit') {
            return total + parseFloat(transaction.amount);
        } else {
            return total - parseFloat(transaction.amount);
        }


    }, 0)
}

export const totalAccount = array => {
    return array.reduce((total, account) => {
        return total + parseFloat(account.balance)
    }, 0)
}