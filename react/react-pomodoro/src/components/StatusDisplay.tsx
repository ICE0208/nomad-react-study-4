interface StatusDisplayProps {
  statusType: string;
  statusValue: number;
  statusMaxValue: number;
}

export default function StatusDisplay({
  statusType,
  statusValue,
  statusMaxValue,
}: StatusDisplayProps) {
  return (
    <div className="flex w-[100px] flex-col items-center font-semibold">
      <span className="font-light">{`${statusValue}/${statusMaxValue}`}</span>
      <span>{statusType}</span>
    </div>
  );
}
