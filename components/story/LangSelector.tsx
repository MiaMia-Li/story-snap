import { LANGUAGES_PROMPT } from "@/config/lang";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale } from "@/i18n/config";

export const LanguageSelector = ({
  language,
  handleLanguageChange,
}: {
  language: Locale;
  handleLanguageChange: (language: Locale) => void;
}) => (
  <Select value={language} onValueChange={handleLanguageChange}>
    <SelectTrigger>
      <SelectValue placeholder="Select a language" defaultValue={language} />
    </SelectTrigger>
    <SelectContent>
      {LANGUAGES_PROMPT.map(({ value, label }) => (
        <SelectItem key={value} value={value}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
