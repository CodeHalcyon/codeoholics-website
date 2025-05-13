"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode; // Handle children prop as ReactNode, making it optional
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(24, 22, 24)", // Default start gradient color
  gradientBackgroundEnd = "rgb(40, 41, 43)", // Default end gradient color
  firstColor = "0,0,0", // Default first gradient color
  secondColor = "0,0,0", // Default second gradient color
  thirdColor = "0,0,0", // Default third gradient color
  fourthColor = "0,0,0", // Default fourth gradient color
  fifthColor = "0,0,0", // Default fifth gradient color
  pointerColor = "0,0,0", // Default pointer color
  size = "80%",
  blendingValue = "hard-light",
  children = null, // Default to null if no children are passed
  className = "",
  interactive = true,
  containerClassName = "",
}: BackgroundGradientAnimationProps) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    // Set dynamic CSS properties on document body
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      if (interactiveRef.current) {
        (interactiveRef.current as HTMLDivElement).style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
    }

    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (interactiveRef.current) {
      const rect = (interactiveRef.current as HTMLDivElement).getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className={cn(
        "h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
        )}
      >
        {/* Gradient elements with improved color application */}
        {[{ color: firstColor, transformOrigin: "center", animation: "animate-first", opacity: 100 },
          { color: secondColor, transformOrigin: "calc(50%-400px)", animation: "animate-second", opacity: 100 },
          { color: thirdColor, transformOrigin: "calc(50%+400px)", animation: "animate-third", opacity: 100 },
          { color: fourthColor, transformOrigin: "calc(50%-200px)", animation: "animate-fourth", opacity: 70 },
          { color: fifthColor, transformOrigin: "calc(50%-800px)_calc(50%+800px)", animation: "animate-fifth", opacity: 100 }]
          .map((item, index) => (
            <div
              key={index}
              className={cn(
                `absolute [background:radial-gradient(circle_at_center,_rgba(var(--${item.color}),_0.8)_0,_rgba(var(--${item.color}),_0)_50%)_no-repeat]`,
                `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                `[transform-origin:${item.transformOrigin}]`,
                `${item.animation}`,
                `opacity-[${item.opacity}]`
              )}
            ></div>
          ))}
        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};
