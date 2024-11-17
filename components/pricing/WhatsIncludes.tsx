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

export function WhatsIncludes({ t }: { t: any }) {
  const features = [
    {
      icon: Wand2,
      title: t.pricing.whatsIncluded.lable1,
      description: t.pricing.whatsIncluded.item1,
    },
    {
      icon: Palette,
      title: t.pricing.whatsIncluded.lable2,
      description: t.pricing.whatsIncluded.item2,
    },
    {
      icon: BookOpen,
      title: t.pricing.whatsIncluded.lable3,
      description: t.pricing.whatsIncluded.item3,
    },
    {
      icon: Settings,
      title: t.pricing.whatsIncluded.lable4,
      description: t.pricing.whatsIncluded.item4,
    },
    {
      icon: Clock,
      title: t.pricing.whatsIncluded.lable5,
      description: t.pricing.whatsIncluded.item5,
    },
    {
      icon: Download,
      title: t.pricing.whatsIncluded.lable6,
      description: t.pricing.whatsIncluded.item6,
    },
    {
      icon: Share2,
      title: t.pricing.whatsIncluded.lable7,
      description: t.pricing.whatsIncluded.item7,
    },
    {
      icon: MessageSquare,
      title: t.pricing.whatsIncluded.lable8,
      description: t.pricing.whatsIncluded.item8,
    },
    {
      icon: Sparkles,
      title: t.pricing.whatsIncluded.lable9,
      description: t.pricing.whatsIncluded.item9,
    },
  ];
  return (
    <div className="container max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-3">
          {t.pricing.whatsIncluded.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t.pricing.whatsIncluded.description}
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
            <p className="text-sm">{t.pricing.whatsIncluded.needHelp}</p>
          </div>
          <Link
            href={`mailto:${EMAIL_ADDRESS}`}
            className="px-4 py-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors duration-200 text-sm font-medium">
            {t.pricing.whatsIncluded.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}
