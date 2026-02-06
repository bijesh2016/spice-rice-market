import { useState, useMemo } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { Calendar, Clock, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface DeliverySlot {
  date: Date;
  timeSlot: string;
  timeRange: string;
}

interface DeliverySlotPickerProps {
  selectedSlot: DeliverySlot | null;
  onSelect: (slot: DeliverySlot) => void;
}

const timeSlots = [
  { id: "morning", label: "Morning", range: "8:00 AM - 11:00 AM", icon: "🌅" },
  { id: "afternoon", label: "Afternoon", range: "12:00 PM - 3:00 PM", icon: "☀️" },
  { id: "evening", label: "Evening", range: "4:00 PM - 7:00 PM", icon: "🌆" },
];

export function DeliverySlotPicker({ selectedSlot, onSelect }: DeliverySlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    selectedSlot?.date || null
  );

  // Generate next 7 days for delivery
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    // Start from tomorrow for fresh grocery delivery
    for (let i = 1; i <= 7; i++) {
      dates.push(addDays(today, i));
    }
    return dates;
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Clear time slot when date changes
    if (selectedSlot && !isSameDay(selectedSlot.date, date)) {
      onSelect({ date, timeSlot: "", timeRange: "" });
    }
  };

  const handleTimeSelect = (slot: typeof timeSlots[0]) => {
    if (selectedDate) {
      onSelect({
        date: selectedDate,
        timeSlot: slot.id,
        timeRange: slot.range,
      });
    }
  };

  const isDateSelected = (date: Date) => {
    return selectedDate && isSameDay(date, selectedDate);
  };

  const isTimeSelected = (slotId: string) => {
    return selectedSlot?.timeSlot === slotId;
  };

  return (
    <div className="space-y-6">
      {/* Delivery Promise */}
      <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <Truck className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium text-primary">Fresh Delivery Guaranteed</p>
          <p className="text-sm text-muted-foreground">
            7-day fresh delivery for all produce and meat
          </p>
        </div>
      </div>

      {/* Date Selection */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-medium">Select Delivery Date</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {availableDates.map((date) => {
            const isToday = isSameDay(date, addDays(new Date(), 1));
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelect(date)}
                className={cn(
                  "flex flex-col items-center p-3 rounded-lg border-2 transition-all",
                  isDateSelected(date)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <span className="text-xs text-muted-foreground uppercase">
                  {format(date, "EEE")}
                </span>
                <span className="text-lg font-bold">{format(date, "d")}</span>
                <span className="text-xs text-muted-foreground">
                  {format(date, "MMM")}
                </span>
                {isToday && (
                  <Badge variant="secondary" className="mt-1 text-[10px] px-1">
                    Tomorrow
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Selection */}
      {selectedDate && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Select Time Slot</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleTimeSelect(slot)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left",
                  isTimeSelected(slot.id)
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <span className="text-2xl">{slot.icon}</span>
                <div>
                  <p className="font-medium">{slot.label}</p>
                  <p className="text-sm text-muted-foreground">{slot.range}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Slot Summary */}
      {selectedSlot?.timeSlot && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  Delivery on {format(selectedSlot.date, "EEEE, MMMM d")}
                </p>
                <p className="text-sm text-muted-foreground">
                  Between {selectedSlot.timeRange}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
