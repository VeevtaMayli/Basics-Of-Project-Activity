(function main() {
    const calculator = new Calculator();
    calculator.read();

    alert("Сумма = " + calculator.sum());
    alert("Произведение = " + calculator.mul());
})();

function Calculator() {
    this.firstArgument = 0;
    this.secondArgument = 0;
    this.read = function() {
        this.firstArgument = +prompt("Введите первое число: ") || 0;
        this.secondArgument = +prompt("Введите второе число: ") || 0;
    }

    this.sum = function() {
        return this.firstArgument + this.secondArgument;
    }

    this.mul = function() {
        return this.firstArgument * this.secondArgument;
    }
}