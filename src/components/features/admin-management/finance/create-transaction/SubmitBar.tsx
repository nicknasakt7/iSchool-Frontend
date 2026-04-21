import { Button } from '@/components/ui/button';

type SubmitBarProps = {
  onSubmit: () => void;
};

export default function SubmitBar({ onSubmit }: SubmitBarProps) {
  return (
    <div className="flex justify-end">
      <Button onClick={onSubmit} className="h-10 w-136">
        Create & Apply Payment →
      </Button>
    </div>
  );
}
