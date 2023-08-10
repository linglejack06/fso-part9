import { CoursePart } from "../types";

interface ContentsProps {
  contents: CoursePart[]
}
interface PartProps {
  part: CoursePart;
}
const Part = ({ part }: PartProps) => {
  switch(part.kind) {
    case "basic":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>Exercises: {part.exerciseCount}</p>
          <p>{part.description}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h2>{part.name} <a href={part.backgroundMaterial}>Click for more</a></h2>
          <p>Exercises: {part.exerciseCount}</p>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>Individual Exercises: {part.exerciseCount}</p>
          <p>Group Projects: {part.groupProjectCount}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Requirements: {part.requirements.join(", ")}</p>
          <p>{part.description}</p>
        </div>
      )
    default:
      throw new Error('Unhandled kind');
  }
}
const Contents = ({ contents }: ContentsProps) => (
  <>
    {contents.map((part) => (
      <Part part={part} key={part.name}/>
    ))}
  </>
);

export default Contents;