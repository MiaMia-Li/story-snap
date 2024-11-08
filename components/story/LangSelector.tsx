import { LANGUAGES } from "@/config/lang";
import { Language } from "@/types";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const LanguageSelector = ({
  language,
  handleLanguageChange,
}: {
  language: Language;
  handleLanguageChange: (language: Language) => void;
}) => (
  <div className="space-y-2">
    <h3 className="text-lg font-semibold text-gray-900">Story Language</h3>
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
