(function main() {
    const staff = {
        "Вася": 23,
        "Петя": 27,
        "Даша": 22
    };
    console.log(getTheOlderestNameStaff(staff));
})();

function getTheOlderestNameStaff(group) {
    let maxAge = Number.NEGATIVE_INFINITY;
    let oldMan;
    for (const name in group) {
        if (group[name] > maxAge) {
            maxAge = group[name];
            oldMan = name
        }
    }
    return [oldMan, maxAge];
}
