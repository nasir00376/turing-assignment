type int = number;
type SequenceInt = number[];

function to_decimal(base: int, base_number: SequenceInt): int {
  return parseInt(base_number.toString(), base);
}

function from_decimal(base: int, decimal_number: int): SequenceInt {
  const string = decimal_number.toString(base);

  console.log({ base, decimal_number, string });
  const sequenceInt = string.split("").map((el) => Number(el));

  return sequenceInt;
}

function main() {
  const base = 7;
  const base_number: SequenceInt = [5, 1, 6, 0, 3, 6, 2];

  console.log(`Given number in base:${base} is ${base_number}`);
  const decimal_number = to_decimal(base, base_number);
  console.log(`Converted decimal number is ${decimal_number}`);

  const base_number_recover = from_decimal(base, decimal_number);
  console.log(`Recover number in base ${base} is ${base_number_recover}`);

  const correct = base_number == base_number_recover;

  console.log(
    "Is the code working correctly?",
    correct,
    base_number,
    base_number_recover
  );
}

main();
