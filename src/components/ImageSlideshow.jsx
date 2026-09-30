import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { classNames } from "../utils/classNames";
import "./ImageSlideshow.css";

/**
 * Full-bleed autoplaying image slideshow with crossfade, a slow "Ken Burns"
 * zoom on the active slide, click-through dots, and prev/next arrows.
 * Pauses on hover/focus so it doesn't fight someone trying to read.
 */
export default function ImageSlideshow({ images, interval = 6000 }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (nextIndex) => {
      setIndex((nextIndex + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [isPaused, interval, images.length]);

  return (
    <div
      className="slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {images.map((image, i) => (
        <img
          key={`${image.src}-${i === index}`}
          src={image.src}
          alt={image.alt || ""}
          className={classNames("slideshow-slide", i === index && "is-active")}
          aria-hidden={i !== index}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="slideshow-arrow slideshow-arrow--prev"
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="slideshow-arrow slideshow-arrow--next"
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          <div className="slideshow-dots" role="tablist" aria-label="Slide navigation">
            {images.map((image, i) => (
              <button
                type="button"
                key={image.src}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                className={classNames("slideshow-dot", i === index && "is-active")}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
