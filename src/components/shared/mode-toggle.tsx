'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const themes = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'Default', Icon: Monitor },
] as const;

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const triggerClass = cn(
    'flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
    className,
  );

  // ก่อน mount ใช้ Monitor icon เป็น placeholder (server + client ตรงกัน)
  if (!mounted) {
    return (
      <button className={triggerClass} aria-label="Toggle theme">
        <Monitor className="size-4" />
      </button>
    );
  }

  const current = themes.find((t) => t.value === theme) ?? themes[2];
  const CurrentIcon = current.Icon;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={triggerClass} aria-label="Toggle theme">
          <CurrentIcon className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-36 gap-1 p-1">
        {themes.map(({ value, label, Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
              theme === value && 'bg-accent text-accent-foreground font-medium',
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
