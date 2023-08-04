interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
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

console.log(exerciseCalculator([2, 2, 2, 0], 8));