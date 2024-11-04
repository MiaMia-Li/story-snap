import { motion, HTMLMotionProps } from "framer-motion";

interface FloatingElementProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className={className}
      {...props}>
      {children}
    </motion.div>
  );
};
