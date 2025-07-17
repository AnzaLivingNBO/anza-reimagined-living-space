import { Badge } from '@/components/ui/badge';

export interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const getStatusConfig = (status: string) => {
  switch (status) {
    case 'available':
      return {
        label: 'Available',
        variant: 'default' as const,
        className: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
      };
    case 'becoming_available':
      return {
        label: 'Becoming Available',
        variant: 'secondary' as const,
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200'
      };
    case 'unavailable':
      return {
        label: 'Unavailable',
        variant: 'destructive' as const,
        className: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
      };
    case 'reserved':
      return {
        label: 'Reserved',
        variant: 'secondary' as const,
        className: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
      };
    case 'under_maintenance':
      return {
        label: 'Under Maintenance',
        variant: 'secondary' as const,
        className: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'
      };
    default:
      return {
        label: 'Unknown',
        variant: 'secondary' as const,
        className: 'bg-gray-100 text-gray-800 border-gray-200'
      };
  }
};

export const StatusBadge = ({ status, className = '' }: StatusBadgeProps) => {
  const config = getStatusConfig(status);
  
  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} ${className}`}
    >
      {config.label}
    </Badge>
  );
};