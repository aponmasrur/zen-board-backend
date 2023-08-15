function update_object(target_object, update_info) {
    for (const key in update_info) {
        target_object[key] = update_info[key];
    }
}

module.exports = {update_object};