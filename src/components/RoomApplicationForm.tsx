import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

import { allRooms } from '@/data/rooms';

// Room options for the dropdown - using the actual room data
const roomOptions = allRooms.map(room => ({
  id: room.id.toString(),
  name: room.location,
  price: `$${room.price}/month`
}));

// Characteristics options
const characteristicsOptions = [
  'WiFi included',
  'Gym access',
  'Swimming pool',
  'Parking space',
  'Balcony',
  'Rooftop terrace',
  '24/7 security',
  'Cleaning service',
  'Laundry facilities',
  'Air conditioning',
  'Co-working space',
  'Social areas',
  'Kitchen facilities',
  'Near public transport',
  'Quiet environment',
  'Pet-friendly',
  'Furnished room',
  'Private bathroom',
  'Good lighting',
  'Storage space',
  'Outdoor space',
  'Events and community',
  'Professional residents',
  'Student-friendly',
  'Short-term stays',
  'Flexible lease terms',
  'Bills included',
  'Weekly cleaning',
  'Reception service',
  'Package handling'
];

interface ApplicationFormProps {
  onClose: () => void;
}

interface FormData {
  // Step 1
  selectedRoom: string;
  moveInDate: Date | undefined;
  nairobiPurpose: string;
  selectedCharacteristics: string[];
  
  // Step 2
  name: string;
  email: string;
  phone: string;
  nationality: string;
  occupation: string;
  emergencyContact: string;
  emergencyPhone: string;
  additionalMessage: string;
}

export const RoomApplicationForm = ({ onClose }: ApplicationFormProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    selectedRoom: '',
    moveInDate: undefined,
    nairobiPurpose: '',
    selectedCharacteristics: [],
    name: '',
    email: '',
    phone: '',
    nationality: '',
    occupation: '',
    emergencyContact: '',
    emergencyPhone: '',
    additionalMessage: ''
  });

  const handleInputChange = (field: keyof FormData, value: string | Date | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCharacteristicToggle = (characteristic: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCharacteristics: prev.selectedCharacteristics.includes(characteristic)
        ? prev.selectedCharacteristics.filter(c => c !== characteristic)
        : [...prev.selectedCharacteristics, characteristic]
    }));
  };

  const validateStep1 = () => {
    if (!formData.selectedRoom || !formData.moveInDate || !formData.nairobiPurpose.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
      return false;
    }
    if (formData.selectedCharacteristics.length < 3) {
      toast({
        title: "Select Characteristics",
        description: "Please select at least 3 characteristics that are important to you.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required contact details.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      console.log('Application submitted:', formData);
      toast({
        title: "Application Submitted!",
        description: "Thank you for your application. We'll contact you within 24 hours.",
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Room Application</CardTitle>
            <p className="text-muted-foreground">Step {currentStep} of 2</p>
          </div>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </CardHeader>
        
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="room">Which room are you applying for? *</Label>
                <Select value={formData.selectedRoom} onValueChange={(value) => handleInputChange('selectedRoom', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    {roomOptions.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name} - {room.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>From when onwards are you looking for a room? *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.moveInDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.moveInDate ? format(formData.moveInDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background border border-border z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.moveInDate}
                      onSelect={(date) => handleInputChange('moveInDate', date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Tell us in one sentence what you are doing in Nairobi *</Label>
                <Input
                  id="purpose"
                  value={formData.nairobiPurpose}
                  onChange={(e) => handleInputChange('nairobiPurpose', e.target.value)}
                  placeholder="e.g., I'm working as a software developer at a tech company"
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">{formData.nairobiPurpose.length}/200 characters</p>
              </div>

              <div className="space-y-4">
                <Label>Select 3 or more characteristics that are important to you in a shared flat *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto border rounded-lg p-4">
                  {characteristicsOptions.map((characteristic) => (
                    <div key={characteristic} className="flex items-center space-x-2">
                      <Checkbox
                        id={characteristic}
                        checked={formData.selectedCharacteristics.includes(characteristic)}
                        onCheckedChange={() => handleCharacteristicToggle(characteristic)}
                      />
                      <Label htmlFor={characteristic} className="text-sm cursor-pointer">
                        {characteristic}
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Selected: {formData.selectedCharacteristics.length} (minimum 3 required)
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext} className="btn-primary">
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+254 700 000 000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    placeholder="Your nationality"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  placeholder="Your current occupation"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="Emergency contact person"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    placeholder="+254 700 000 000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Additional Questions or Message</Label>
                <Textarea
                  id="message"
                  value={formData.additionalMessage}
                  onChange={(e) => handleInputChange('additionalMessage', e.target.value)}
                  placeholder="Any questions or additional information you'd like to share..."
                  rows={4}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous Step
                </Button>
                <Button onClick={handleSubmit} className="btn-primary">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};