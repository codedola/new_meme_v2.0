function useCheckImageUrl(url) {
    if (url) {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    } else {
        return false;
    }
}

export default useCheckImageUrl;
