import isNotNumber from "./utils";

interface funcValues {
  mass: number;
  height: number;
}
const processArguments = (args: string[]): funcValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if(!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      mass: Number(args[2]),
      height: Number(args[3]),
    }
  } else {
    throw new Error('Arguments are not numbers')
  }
}
const calculateBmi = (a: number, b: number): string => {
  const meters: number = b / 100;
  const squaredMeters: number = meters * meters;
  const result: number = a / squaredMeters;
  if (result < 18.5) {
    return 'Underweight'
  } if (result < 25) {
    return 'Normal weight'
  } if (result < 30) {
    return 'Overweight'
  } 
  return 'obese';
}
const { mass, height } = processArguments(process.argv);
console.log(calculateBmi(mass, height));