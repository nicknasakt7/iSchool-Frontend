type Props = {
  label: string;
  onRemove: () => void;
  disabled?: boolean;
};

export default function GradeChip({ label, onRemove, disabled }: Props) {
  return (
    <div className="px-4 py-2 bg-blue-100 rounded-full flex items-center gap-2">
      {label}
      <button disabled={disabled} onClick={onRemove}>
        ✕
      </button>
    </div>
  );
}
