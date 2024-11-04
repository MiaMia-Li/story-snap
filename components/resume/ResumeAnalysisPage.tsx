// import { FEATURES } from "@/config/page";
import { Feature } from "@/types";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import {
  RiAtLine,
  RiFileTextLine,
  RiQuestionAnswerLine,
  RiRobot2Line,
} from "react-icons/ri";

// export const FEATURES: Feature[] = [
//   {
//     icon: FileSearch,
//     title: "Smart Analysis",
//     description: "Advanced AI algorithms analyze your resume content",
//   },
//   {
//     icon: ChartLine,
//     title: "Detailed Insights",
//     description: "Get comprehensive feedback on your professional profile",
//   },
//   {
//     icon: Sparkles,
//     title: "Recommendations",
//     description: "Receive personalized suggestions for improvement",
//   },
// ];

const features = [
  {
    icon: <RiAtLine className="w-6 h-6" />,
    title: "Smart Analysis",
    description: "Advanced AI algorithms analyze your resume content",
  },
  {
    icon: <RiFileTextLine className="w-6 h-6" />,
    title: "Detailed Insights",
    description: "Get comprehensive feedback on your professional profile",
  },
  {
    icon: <RiQuestionAnswerLine className="w-6 h-6" />,
    title: "Recommendations",
    description: "Receive personalized suggestions for improvement",
  },
  // {
  //   icon: <RiRobot2Line className="w-6 h-6" />,
  //   title: "AI Interview Coach",
  //   description: "Simulate real interview scenarios with instant feedback",
  // },
];

const PageHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center space-y-4 mb-12">
    <BrainIcon />
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
      AI Resume Analysis
    </h1>
    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      Upload your resume and let our AI analyze your professional profile,
      providing detailed insights and personalized recommendations.
    </p>
  </motion.div>
);

const BrainIcon = () => (
  <div className="flex justify-center">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative inline-block">
      <Brain className="h-16 w-16 text-blue-500" />
      <div className="absolute inset-0 blur-2xl bg-blue-200/50 dark:bg-blue-900/30 rounded-full" />
    </motion.div>
  </div>
);

const FeatureGrid = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
    {features.map((feature, index) => (
      <FeatureCard key={index} feature={feature} index={index} />
    ))}
  </motion.div>
);

interface AnalysisSectionProps {
  isAnalyzing: boolean;
  onAnalyze: (e: React.FormEvent) => void;
  isLoading: boolean;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 + index * 0.1 }}
    className="relative group">
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity" />
      <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
        {feature.icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {feature.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {feature.description}
      </p>
    </div>
  </motion.div>
);

const ParticleEffects = () => (
  <div className="absolute -inset-1 pointer-events-none">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
          x: [0, Math.random() * 20 - 10],
          y: [0, Math.random() * 20 - 10],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.2,
        }}
        className="absolute h-2 w-2 bg-blue-300 rounded-full blur-sm"
        style={{
          left: `${30 * i}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

export { PageHeader, FeatureGrid, FeatureCard, ParticleEffects };
