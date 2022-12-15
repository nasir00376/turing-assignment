function to_decimal(base, base_number) {
    return parseInt(base_number.toString(), base);
}
function from_decimal(base, decimal_number) {
    var string = decimal_number.toString(base);
    console.log({ base: base, decimal_number: decimal_number, string: string });
    var sequenceInt = string.split("").map(function (el) { return Number(el); });
    return sequenceInt;
}
function main() {
    var base = 7;
    var base_number = [5, 1, 6, 0, 3, 6, 2];
    console.log("Given number in base:".concat(base, " is ").concat(base_number));
    var decimal_number = to_decimal(base, base_number);
    console.log("Converted decimal number is ".concat(decimal_number));
    var base_number_recover = from_decimal(base, decimal_number);
    console.log("Recover number in base ".concat(base, " is ").concat(base_number_recover));
    var correct = base_number == base_number_recover;
    console.log("Is the code working correctly?", correct, base_number, base_number_recover);
}
main();
