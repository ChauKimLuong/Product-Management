module.exports = (query) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    const currentStatus = query.status
    if (currentStatus){
        const index = filterStatus.findIndex(item => item.status == currentStatus)
        filterStatus[index].class = "active"
    }
    else filterStatus[0].class = "active"

    return filterStatus;
}