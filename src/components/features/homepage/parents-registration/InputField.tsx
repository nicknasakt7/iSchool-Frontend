type InputFieldProps = {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  error?: string;
};

export default function InputField({
  label,
  required,
  placeholder,
  value,
  onChange,
  hint,
  error,
}: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg p-3 bg-gray-50 focus:outline-none focus:ring-2 ${
          error
            ? "border border-red-500 focus:ring-red-500"
            : "border focus:ring-blue-500"
        }`}
      />

      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : (
        hint && <p className="text-xs text-gray-400">{hint}</p>
      )}
    </div>
  );
}
