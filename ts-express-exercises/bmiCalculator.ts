const calculateBmi = (mass: number, height: number): string => {
  const meters: number = height / 100;
  const squaredMeters: number = meters * meters;
  const result: number = mass / squaredMeters;
  if (result < 18.5) {
    return 'Underweight';
  } if (result < 25) {
    return 'Normal weight';
  } if (result < 30) {
    return 'Overweight';
  } 
  return 'obese';
};

export default calculateBmi;