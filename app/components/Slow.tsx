interface SlowProps {
  time: number;
  text: string;
}

export default async function Slow({ time, text }: SlowProps) {
  await new Promise((resolve) => setTimeout(resolve, time));
  return <div className={`w-1/2 rounded-md p-10 m-1 bg-red-300`}>{text}</div>;
}
