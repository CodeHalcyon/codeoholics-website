import { JSX, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { useConfetti } from "@/hooks/use-confetti";
import { Globe } from "@/components/Globe";
import { ContainerTextFlip } from "./ui/container-text-flip";

const Hero = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { triggerConfetti } = useConfetti();

  const handleJoinClick = () => {
    triggerConfetti();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(0,0,0)" 
        gradientBackgroundEnd="rgb(36, 36, 37)" 
        className="absolute inset-0"
      >
        {/* Added a div wrapper to control the background gradient */}
        <div className="relative z-10 container px-4 md:px-6 py-10 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Section */}
            <div className="flex flex-col space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block text-sm font-semibold tracking-wider text-primary uppercase mb-2">
                  Welcome to Codeoholics
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                  Where{" "}
                  <ContainerTextFlip
                    words={["code", "creativity", "innovation"]}
                    className="inline-block"
                    textClassName="text-primary"
                  />{" "}
                  meets community
                </h1>
                <p className="mt-4 text-lg text-foreground/80 max-w-lg mx-auto lg:mx-0">
                  Join our community of passionate programmers, designers, and innovators building the future together.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-medium"
                  onClick={handleJoinClick}
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: -4 }}
                    className="flex items-center gap-2"
                  >
                    Join Our Community
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </motion.span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary/50 hover:border-primary"
                >
                  Learn More
                </Button>
              </motion.div>
            </div>

            {/* Right Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:flex items-end justify-center w-full max-w-[600px] h-full max-h-[600px]"
            >
              <Globe />
            </motion.div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </section>
  );
};

export default Hero;
