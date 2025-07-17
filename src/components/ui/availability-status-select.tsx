import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStatusConfig } from '@/utils/statusBadge';

export interface AvailabilityStatusSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// Available status options based on the enum
export const AVAILABILITY_STATUS_OPTIONS = [
  'available',
  'becoming_available',
  'unavailable',
  'reserved',
  'under_maintenance'
] as const;

export type AvailabilityStatus = typeof AVAILABILITY_STATUS_OPTIONS[number];

export const AvailabilityStatusSelect = ({ 
  value, 
  onValueChange, 
  placeholder = "Select availability status",
  className = ""
}: AvailabilityStatusSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {AVAILABILITY_STATUS_OPTIONS.map((status) => {
          const config = getStatusConfig(status);
          return (
            <SelectItem key={status} value={status}>
              <div className="flex items-center gap-2">
                <div 
                  className={`w-3 h-3 rounded-full ${config.className.split(' ')[0]}`} 
                />
                {config.label}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};