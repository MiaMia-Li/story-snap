// components/whats-includes.tsx
import { EMAIL_ADDRESS } from "@/config/site";
import {
  Sparkles,
  Palette,
  Download,
  Clock,
  MessageSquare,
  Settings,
  Wand2,
  BookOpen,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
export function WhatsIncludes() {
  const t = useTranslations("pricing");
  const features = [
    {
      icon: Wand2,
      title: t("whatsIncluded.lable1"),
      description: t("whatsIncluded.item1"),
    },
    {
      icon: Palette,
      title: t("whatsIncluded.lable2"),
      description: t("whatsIncluded.item2"),
    },
    {
      icon: BookOpen,
      title: t("whatsIncluded.lable3"),
      description: t("whatsIncluded.item3"),
    },
    {
      icon: Settings,
      title: t("whatsIncluded.lable4"),
      description: t("whatsIncluded.item4"),
    },
    {
      icon: Clock,
      title: t("whatsIncluded.lable5"),
      description: t("whatsIncluded.item5"),
    },
    {
      icon: Download,
      title: t("whatsIncluded.lable6"),
      description: t("whatsIncluded.item6"),
    },
    {
      icon: Share2,
      title: t("whatsIncluded.lable7"),
      description: t("whatsIncluded.item7"),
    },
    {
      icon: MessageSquare,
      title: t("whatsIncluded.lable8"),
      description: t("whatsIncluded.item8"),
    },
    {
      icon: Sparkles,
      title: t("whatsIncluded.lable9"),
      description: t("whatsIncluded.item9"),
    },
  ];
  return (
    <div className="container max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-3">{t("whatsIncluded.title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("whatsIncluded.description")}
        </p>
      </div>

      <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="flex items-start group">
            <div className="mr-4 p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors duration-200">
              <feature.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/5">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm">{t("whatsIncluded.needHelp")}</p>
          </div>
          <Link
            href={`mailto:${EMAIL_ADDRESS}`}
            className="px-4 py-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors duration-200 text-sm font-medium">
            {t("whatsIncluded.contact")}
          </Link>
        </div>
      </div>
    </div>
  );
}
