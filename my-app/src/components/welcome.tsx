interface WelcomeProps {
  name: string;
  courseName: string;
}

const Welcome = ({ name, courseName }: WelcomeProps) => {
  return (
    <div>
      <h1>hello, {name}</h1>
      <h1>{courseName}</h1>
    </div>
  )
};

export default Welcome