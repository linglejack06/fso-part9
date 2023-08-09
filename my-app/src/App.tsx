import Contents from './components/Contents';
import Total from './components/Total';
import Welcome from './components/welcome'

function App() {
  const courseName = 'Half Stack Application Development';
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    },
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
