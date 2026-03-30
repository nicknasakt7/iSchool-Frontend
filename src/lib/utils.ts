import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const simulateLoading = (second: number = 3) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, second * 1000);
  });
};
