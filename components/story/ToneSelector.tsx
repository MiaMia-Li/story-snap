"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ToneSelector({
  tone,
  toneOptions,
  handleToneChange,
}: {
  toneOptions: { value: string; label: string }[];
  tone: string;
  handleToneChange: (tone: string) => void;
}) {
  return (
    <Select value={tone} onValueChange={handleToneChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a tone" />
      </SelectTrigger>
      <SelectContent>
        {toneOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
