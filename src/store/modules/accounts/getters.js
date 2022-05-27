const getAccount = (state) => {
    if (state.account) {
        return state.account;
    }

    return null;
}

export default {
    getAccount,
}