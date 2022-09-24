import { useEffect, useRef, useState } from 'react';

const useAnimationFrame = (callback: (dt: number) => void) => {
  const requestRef = useRef<ReturnType<typeof requestAnimationFrame>>();
  const previousTimeRef = useRef<DOMHighResTimeStamp>();

  const animate = (time: DOMHighResTimeStamp) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);
};

const p = (px: number, py: number, vx = 0, vy = 0) => ({ px, py, vx, vy });

const ThreeBodyPage = () => {
  const [positions, setPositions] = useState([
    p(-128, 128),
    p(-128, -128),
    p(128, -128),
  ]);

  useAnimationFrame(() =>
    setPositions(([...positions]) => {
      for (const i in positions) {
        let { px: ax, py: ay } = positions[i]!;
        for (const j in positions) {
          if (i === j) continue;
          const { px: bx, py: by } = positions[j]!;
          let [fx, fy] = [bx - ax, by - ay];
          const mag = Math.sqrt(fx * fx + fy * fy);
          const forceMag = (70 * 70) / ((bx - ax) ** 2 + (by - ay) ** 2);
          fx = (fx / mag) * forceMag;
          fy = (fy / mag) * forceMag;
          ax += fx;
          ay += fy;
        }
        positions[i] = { ...positions[i]!, px: ax, py: ay };
      }
      return positions;
    })
  );

  return (
    <div className="flex h-[100vh] bg-black">
      <div className="relative h-full w-full overflow-hidden bg-black">
        {positions.map(({ px, py }, i) => (
          <div
            key={i}
            className="absolute left-[50%] top-[50%] h-10 w-10 rounded-full opacity-60"
            style={{
              transform: `translate(${px}px, ${-py}px)`,
              backgroundColor: `hsl(${
                (i / (positions.length - 1)) * 270
              }deg, 100%, 50%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThreeBodyPage;
