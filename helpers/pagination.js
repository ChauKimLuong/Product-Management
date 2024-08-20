module.exports = (objectPagination, query, countProduct) => {
    objectPagination.totalPage = Math.ceil(countProduct / objectPagination.limitItems)

    if (query.page) {
        objectPagination.currentPage = parseInt(query.page)
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    }

    return objectPagination
}