(function main() {
    const user = {};
    user.name = "Вася";
    user.surname = "Петров";
    console.log(user);

    user.name = "Сергей";
    console.log(user);

    delete user.name;
    console.log(user);
})();