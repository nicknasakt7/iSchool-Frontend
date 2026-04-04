'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Option = {
  label: string;
  value: string;
};

export type FilterDropdownProps = {
  label: string;
  value?: string;
  options?: Option[] | null;
  onChange?: (value: string) => void;
};

export default function FilterDropdown({
  value,
  label,
  options,
  onChange,
}: FilterDropdownProps) {
  //  ไม่มี data = ไม่ render
  if (!options?.length) return null;

  return (
    <Select value={value ?? ''} onValueChange={onChange}>
      <SelectTrigger className="w-45 bg-card rounded-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent>
        {options
          ?.filter(opt => opt.label && opt.value)
          .map(opt => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
