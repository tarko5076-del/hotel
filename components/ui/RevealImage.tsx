"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  objectPosition?: string;
  imageClassName?: string;
  priority?: boolean;
  quality?: 80 | 82 | 84 | 88 | 90;
  delay?: number;
  parallax?: boolean;
  overlayClassName?: string;
  /** Animation pattern: "reveal" = scale settle (default), "parallax" = parallax scroll + scale, "scale" = scale only, "none" = no animation */
  animation?: "reveal" | "parallax" | "scale" | "none";
};

export function RevealImage({
  src,
  alt,
  className = "",
  sizes,
  objectPosition,
  imageClassName = "",
  priority = false,
  quality = 82,
  delay = 0,
  parallax: parallaxProp = false,
  overlayClassName,
  animation = "reveal",
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [desktopMotion, setDesktopMotion] = useState(false);
  const [failed, setFailed] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktopMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const isParallax = animation === "parallax" || parallaxProp;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isParallax && desktopMotion && !reduceMotion ? ["-4%", "4%"] : ["0%", "0%"]
  );

  const shouldAnimate = animation !== "none" && !reduceMotion;

  const innerInitial = shouldAnimate && (isParallax || animation === "scale" || animation === "reveal")
    ? { scale: 1.045 }
    : false;

  const innerAnimate = shouldAnimate && (isParallax || animation === "scale" || animation === "reveal")
    ? { scale: 1 }
    : {};

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-x-0 -top-[5%] h-[110%]"
        style={isParallax && desktopMotion && !reduceMotion ? { y } : undefined}
        initial={innerInitial}
        // The image is always fully visible. This animation is deliberately
        // independent of IntersectionObserver, hydration timing, and input.
        animate={innerAnimate}
        transition={{ duration: reduceMotion ? 0 : 1.05, delay: reduceMotion ? 0 : delay, ease }}
      >
        {failed ? (
          <div role="img" aria-label={alt} className="h-full w-full bg-[#c9c3b7]" />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            quality={quality}
            sizes={sizes}
            className={`object-cover ${imageClassName}`}
            style={objectPosition ? {objectPosition} : undefined}
            onError={() => setFailed(true)}
          />
        )}
      </motion.div>
      {overlayClassName && <div className={`absolute inset-0 ${overlayClassName}`} />}
    </motion.div>
  );
}
