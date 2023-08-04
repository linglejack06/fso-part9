type Operation = 'multiply' | 'add' | 'divide';

interface calculatorValues {
  value1: number;
  value2: number;
}
const parseArguments = (args: String[]): calculatorValues => {
  if (args.length < 4) throw new Error('not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers');
  }
}
const calculator = (a: number, b: number, op: Operation): number => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Cannot divide by zero');
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add, or divide')
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);

  console.log(calculator(value1, value2, 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went Wrong: ';
  if ( error instanceof Error) {
    errorMessage += error.message
  }
  console.error(errorMessage)
}