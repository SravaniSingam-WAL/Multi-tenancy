export const getToken = () => {
    const { token } =  JSON.parse(localStorage.getItem('user') || '{}');
    return token || '';
};
export const getEmail = () => {
    const { email } =  JSON.parse(localStorage.getItem('user') || '{}');
    return email || '';
};

export const setToken = (userDetails) => {
    localStorage.setItem('user', JSON.stringify(userDetails));
    
};

export const getBrandName = () => {
    const { brandName } =  JSON.parse(localStorage.getItem('user') || '{}');
    return brandName || '';
};
export const getName = () => {
    const { name } =  JSON.parse(localStorage.getItem('user') || '{}');
    return name || '';
};
