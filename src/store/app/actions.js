const nameSpace = "app:";
export const SHOW_LOADING = `${nameSpace}SHOW_LOADING`;
export const HIDE_LOADING = `${nameSpace}HIDE_LOADING`;

export const actShowLoading = () => {
    return {
        type: SHOW_LOADING,
    };
};

export const actHideLoading = () => {
    return {
        type: HIDE_LOADING,
    };
};
