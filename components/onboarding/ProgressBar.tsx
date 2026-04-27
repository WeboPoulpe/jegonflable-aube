interface Props {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, idx) => {
        const stepN = idx + 1;
        const isDone = stepN < current;
        const isCurrent = stepN === current;

        return (
          <div
            key={stepN}
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              isDone
                ? "bg-success"
                : isCurrent
                  ? "bg-primary"
                  : "bg-gray-200"
            }`}
          />
        );
      })}
    </div>
  );
}
