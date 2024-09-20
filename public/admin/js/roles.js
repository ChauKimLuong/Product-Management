// Permissions
const tablePermissions = document.querySelector("[table-permissions]");

if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");

    buttonSubmit.addEventListener("click", () => {
        let roles = [];
        const rows = tablePermissions.querySelectorAll("[data-name]");

        rows.forEach((row) => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if (name === "id") {
                inputs.forEach((input) => {
                    roles.push({
                        id: input.value,
                        permissions: [],
                    });
                });
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked;
                    if (checked) {
                        roles[index].permissions.push(name);
                    }
                });
            }
        });
        if (roles.length > 0) {
            const formChangePermissions = document.querySelector("#form-change-permissions");
            const inputPermissions = formChangePermissions.querySelector("input[name='permissions']");

            inputPermissions.value = JSON.stringify(roles);

            formChangePermissions.submit();
        }
    });
}

// End Permissions


// Permissions Data Default

const dataRecords = document.querySelector("[data-records]")
if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"))

    const tablePermissions = document.querySelector("[table-permissions]");
    
    records.forEach((record, index) => {
        permissions = record.permissions
        
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name=${permission}]`);
            const inputs = row.querySelectorAll("input");
            const input = inputs[index]

            input.checked = true;
        });
    });
    
}
// End Permissions Data Default