interface WelcomeProps {
  name: string;
}

const Welcome = ({ name }: WelcomeProps) => {
  return <h1>hello, {name}</h1>
};

export default Welcome