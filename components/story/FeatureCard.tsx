import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";

export default function FeatureCard({
  icon,
  title,
  description,
  gradient,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}>
      <Card className="group hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-background/50 border-2">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div
              className={cn(
                "rounded-full p-4 shadow-lg bg-gradient-to-br",
                gradient
              )}>
              <div className="text-white">{icon}</div>
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
