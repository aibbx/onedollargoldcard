
import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface ConfirmationCheckboxProps {
  isConfirmed: boolean;
  setIsConfirmed: (confirmed: boolean) => void;
  error: string;
  confirmationText: string;
}

const ConfirmationCheckbox: React.FC<ConfirmationCheckboxProps> = ({
  isConfirmed,
  setIsConfirmed,
  error,
  confirmationText
}) => {
  // Set isConfirmed to true by default when component mounts
  useEffect(() => {
    if (!isConfirmed) {
      setIsConfirmed(true);
    }
  }, []);

  return (
    <>
      <div className="flex items-start space-x-2">
        <Checkbox
          id="confirmation"
          checked={isConfirmed}
          onCheckedChange={(checked) => setIsConfirmed(!!checked)}
          className="data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500 mt-1"
        />
        <label htmlFor="confirmation" className="text-sm text-gray-600">
          {confirmationText}
        </label>
      </div>
      
      {error && (
        <div className="text-red-500 flex items-center text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </>
  );
};

export default ConfirmationCheckbox;
