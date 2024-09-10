let count = 0;
const createTree = (arr, parentId = "") => {
    const tree = [];

    arr.forEach(item => {
        if (item.parent_id === parentId) {
            count++;
            const newItem = item;
            newItem.index = count;
            let children = createTree(arr, newItem.id);

            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem)
        }
    });
    return tree;
}

module.exports = (arr, parentId = "") => {
    count = 0;
    return createTree(arr, parentid = "");
}