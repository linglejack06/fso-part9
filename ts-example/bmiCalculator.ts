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
console.log(calculateBmi(100, 184));