import { useFinalCountdown } from "@lib/useCountdown";

export default function CountDown({ deadline }: { deadline: Date }) {
  const [days, hours, minutes, seconds] = useFinalCountdown(deadline);

  // todo: optimize create an array (dedupe code)

  const daysStyle = {
    "--value": days,
  } as React.CSSProperties;

  const hoursStyle = {
    "--value": hours,
  } as React.CSSProperties;

  const minutesStyle = {
    "--value": minutes,
  } as React.CSSProperties;

  const secondsStyle = {
    "--value": seconds,
  } as React.CSSProperties;

  console.log(days, hours);

  if (days + hours + minutes + seconds < 0) {
    return (
      <div className="mx-auto my-4 w-fit text-6xl text-red-600">EXPIRED</div>
    );
  }

  return (
    <div>
      <div className="mx-auto mb-2 max-w-fit">Expires in:</div>

      <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
        <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={daysStyle}></span>
          </span>
          days
        </div>
        <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={hoursStyle}></span>
          </span>
          hours
        </div>
        <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={minutesStyle}></span>
          </span>
          min
        </div>
        <div className="rounded-box flex flex-col bg-neutral p-2 text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={secondsStyle}></span>
          </span>
          sec
        </div>
      </div>

      <div className="mx-auto mb-8 max-w-fit">
        (this is supposed to be scary)
      </div>
    </div>
  );
}
