

export const isValidEmail = (email) => {

    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(email)) {
        return email
    }
}