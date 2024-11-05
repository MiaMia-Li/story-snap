import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { FadeIn } from "../animations/FadeIn";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="show"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      <Card className="h-full group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-6 space-y-4">
          <motion.div
            className="rounded-full p-3 w-fit bg-primary/10"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}>
            <div className="text-primary">{icon}</div>
          </motion.div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProcessStep({
  number,
  title,
  description,
  icon,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <FadeIn>
      <Card className="relative h-full group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">{icon}</div>
            <span className="text-4xl font-bold text-primary/20">{number}</span>
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </FadeIn>
  );
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
}: {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}) {
  return (
    <FadeIn>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Card className="h-full group hover:border-primary/50 transition-all duration-300">
          <CardContent className="p-6 space-y-4">
            <div className="text-primary">
              <Star className="h-6 w-6 fill-current" />
            </div>
            <p className="text-lg">{quote}</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  width={50}
                  height={50}
                  src={avatar}
                  alt={author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">{author}</p>
                <p className="text-muted-foreground text-sm">{role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </FadeIn>
  );
}
