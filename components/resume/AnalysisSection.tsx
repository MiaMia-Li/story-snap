import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { ParticleEffects } from "./ResumeAnalysisPage";

interface AnalysisSectionProps {
  isAnalyzing: boolean;
  onAnalyze: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({
  isAnalyzing,
  onAnalyze,
  isLoading,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mt-8 text-center">
    <motion.div
      whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
      whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
      className="relative inline-block">
      <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-xl" />
      <Button
        onClick={onAnalyze}
        size="lg"
        disabled={isAnalyzing || isLoading}
        className="relative bg-gradient-to-r from-blue-500 to-blue-600 
            hover:from-blue-600 hover:to-blue-700 
            text-white shadow-lg hover:shadow-xl 
            transition-all duration-300 px-8 py-6 rounded-full">
        <motion.span
          animate={{
            scale: isAnalyzing ? 1 : [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center gap-2 text-lg font-medium">
          {isAnalyzing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Start AI Analysis
            </>
          )}
        </motion.span>
      </Button>
      {!isAnalyzing && <ParticleEffects />}
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 text-sm text-gray-500 dark:text-gray-400">
      {isAnalyzing
        ? "This may take a few moments..."
        : "Click to start analyzing your resume with our advanced AI"}
    </motion.p>
  </motion.div>
);

export default AnalysisSection;
