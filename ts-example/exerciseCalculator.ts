import isNotNumber from "./utils";

interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface exerciseFuncValues {
  days: number[],
  target: number
}

const processArguments = (args: string[]): exerciseFuncValues => {
  if(args.length < 4) {
    throw new Error('Not enough arguments');
  }
  const numArgs = args.slice(2);
  const adjArgs = numArgs.map((num) => {
    if (isNotNumber(num)) throw new Error('All args must be a number');
    return Number(num);
  });

  return {
    days: adjArgs.slice(1),
    target: adjArgs[0]
  }
}
type ratingDescription = 'Poor' | 'Average' | 'Great';
const exerciseCalculator = (days: number[], target: number): exerciseResult => {
  const periodLength: number = days.length;
  const trainingDays: number = days.filter((day) => day !== 0).length;
  const totalHours: number = days.reduce((prev, curr) => prev += curr, 0);
  const success: boolean = totalHours >= target ? true : false;
  let rating: number;
  let ratingDescription: ratingDescription;
  const diff = success ? 0 : target - totalHours;
  if (diff > 5) {
    rating = 1
    ratingDescription = 'Poor'
  } else if (diff >= 1) {
    rating = 2
    ratingDescription = 'Average'
  } else if ( diff === 0) {
    rating = 3
    ratingDescription = 'Great'
  }
  const average: number = totalHours / periodLength;
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}
try {
  const { days, target } = processArguments(process.argv);
  console.log(exerciseCalculator(days, target));
} catch (error: unknown) {
  let errorMessage = 'An Error Ocurred:';
  if (error instanceof Error) {
    errorMessage += error.message;
  } console.error(errorMessage);
}