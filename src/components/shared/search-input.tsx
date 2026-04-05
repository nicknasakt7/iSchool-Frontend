'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '@/lib/api/student/hooks/useDebounce';
import { useEffect, useState } from 'react';

type SearchInputProps = {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
};

export default function SearchInput({
  placeholder = 'Search...',
  onSearch,
  className,
}: SearchInputProps) {
  const [value, setValue] = useState('');

  const debounced = useDebounce(value, 500);

  // ยิงตอน debounce เปลี่ยน
  useEffect(() => {
    onSearch?.(debounced);
  }, [debounced, onSearch]);

  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 text-muted-foreground" />

      <Input
        value={value}
        placeholder={placeholder}
        className="pl-10 bg-card rounded-full h-9"
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
}
