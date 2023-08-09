interface Part {
  exerciseCount: number;
  name: string;
}

interface ContentsProps {
  contents: Part[]
}

const Contents = ({ contents }: ContentsProps) => (
  <>
    {contents.map((part) => (
        <p>
          {part.name} {part.exerciseCount}
        </p>
      ))}
  </>
);

export default Contents;