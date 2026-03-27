'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 text-muted-foreground" />

      <Input
        placeholder={placeholder}
        className="pl-10 bg-card rounded-full h-10 "
        onChange={e => onSearch?.(e.target.value)}
      />
    </div>
  );
}
