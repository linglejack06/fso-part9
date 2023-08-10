import Contents from './components/Contents';
import Total from './components/Total';
import Welcome from './components/welcome'
import { CoursePart } from './types';

function App() {
  const courseName = 'Half Stack Application Development';
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basic of type narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend Development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    }
  ]
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)
  return (
    <>
      <Welcome name='Jack' courseName={courseName}/>
      <Contents contents={courseParts} />
      <Total total={total} />
    </>
  )
}

export default App
