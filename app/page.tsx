"use client";

import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const slides = [
  { type: "image", src: "/memories/1.jpg" },
  { type: "image", src: "/memories/2.jpg" },
  { type: "image", src: "/memories/3.jpg" },
  { type: "image", src: "/memories/4.jpg" },
  { type: "image", src: "/memories/5.jpg" },
  { type: "image", src: "/memories/6.jpg" },
  { type: "image", src: "/memories/7.jpg" },
  { type: "image", src: "/memories/8.jpg" },
  { type: "image", src: "/memories/9.jpg" },
  { type: "image", src: "/memories/10.jpg" },
  { type: "image", src: "/memories/11.jpg" },
  { type: "image", src: "/memories/12.jpg" },
  { type: "image", src: "/memories/13.jpg" },
  { type: "image", src: "/memories/14.jpg" },
  { type: "image", src: "/memories/15.jpg" },
  { type: "image", src: "/memories/16.jpg" },
  { type: "image", src: "/memories/17.jpg" },
  { type: "image", src: "/memories/18.jpg" },
  { type: "image", src: "/memories/19.jpg" },
  { type: "image", src: "/memories/20.jpg" },
  { type: "image", src: "/memories/21.jpg" },
  { type: "image", src: "/memories/22.jpg" },
  { type: "image", src: "/memories/23.jpg" },
  { type: "image", src: "/memories/24.jpg" },
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playMusic = () => {
    audioRef.current?.play();
  };

  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    })
  );

  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const [started, setStarted] = useState(false);

  const startExperience = async () => {
    await audioRef.current?.play();
    setStarted(true);
  };

  return (
    <main className="h-screen w-screen bg-black p-8">

      {!started && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <button
            onClick={startExperience}
            className="rounded-full bg-white px-10 py-5 text-xl font-semibold text-black hover:scale-105 transition"
          >
            ▶
          </button>
        </div>
      )}

      <audio
        ref={audioRef}
        src="/music/song.mp3"
        loop
        muted={isMuted}
      />

      {started && (
        <div className="h-full w-full overflow-hidden rounded-3xl">
          <Carousel
            plugins={[plugin.current]}
            className="h-full w-full"
          >
            <CarouselContent className="h-screen">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="h-screen">
                  {slide.type === "image" ? (
                    <img
                      src={slide.src}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <video
                      src={slide.src}
                      autoPlay
                      muted
                      playsInline
                      loop
                      className="h-full w-full object-contain"
                    />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="fixed bottom-6 right-6 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      )}
    </main>
  );
}