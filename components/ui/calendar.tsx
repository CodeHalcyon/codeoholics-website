'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

// Define proper types for your component
type CalendarProps = Omit<React.ComponentProps<typeof DayPicker>, 'classNames'> & {
  className?: string;
  classNames?: Record<string, string>;
};

function Calendar({
  className,
  classNames,
  ...props
}: CalendarProps) {
  // Use a type assertion to work around strict typing issues
  const customClassNames = {
    caption: 'flex justify-center pt-1 relative items-center',
    captionLabel: 'text-sm font-medium',
    nav: 'space-x-1 flex items-center',
    navButton: cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
    ),
    navButtonPrevious: 'absolute left-1',
    navButtonNext: 'absolute right-1',
    table: 'w-full border-collapse space-y-1',
    headRow: 'flex',
    headCell:
      'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
    row: 'flex w-full mt-2',
    cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
    day: cn(
      buttonVariants({ variant: 'ghost' }),
      'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
    ),
    dayRangeEnd: 'day-range-end',
    daySelected:
      'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
    dayToday: 'bg-accent text-accent-foreground',
    dayOutside:
      'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
    dayDisabled: 'text-muted-foreground opacity-50',
    dayRangeMiddle:
      'aria-selected:bg-accent aria-selected:text-accent-foreground',
    dayHidden: 'invisible',
    ...classNames,
  };

  return (
    <DayPicker
      className={cn('p-3', className)}
      classNames={customClassNames as any}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };