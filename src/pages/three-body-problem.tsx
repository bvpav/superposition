import { useState } from 'react';

const ThreeBodyPage = () => {
  const [positions, setPositions] = useState<[number, number][]>([
    [0, 128],
    [-128, -128],
    [128, -128],
  ]);
  return (
    <div className="flex h-[100vh] bg-black">
      <div className="h-full w-full bg-black">
        {positions.map(([x, y]) => (
          <div
            className="absolute left-[50%] top-[50%] h-10 w-10 rounded-full bg-red-500"
            style={{ transform: `translate(${x}px, ${-y}px)` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThreeBodyPage;
