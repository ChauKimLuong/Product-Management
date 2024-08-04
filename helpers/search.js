module.exports = (query) => {
    let objectSearch = {
        keyword: query.keyword,
    };
    
    if (objectSearch.keyword) {
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }
    return objectSearch;
};