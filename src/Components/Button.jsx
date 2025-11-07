import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Button = ({ text = "Get Started", onClick, className = "" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#C47A28] px-6 py-3 text-white font-semibold shadow-md transition-all duration-300 ease-out hover:bg-[#a9651f] ${className}`}
    >
      <span className="relative z-10">{text}</span>
      <ArrowRight className="relative z-10 h-5 w-5 translate-x-[-8px] opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
      <span className="absolute inset-0 scale-0 rounded- transition-all duration-500 group-hover:scale-100"></span>
    </motion.button>
  );
};
