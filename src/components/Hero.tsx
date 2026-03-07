import { useEffect, useState } from "react";
import { close, heroImg, heroVideo } from "../assets";
import HeroCta from "./HeroCta";
import { motion } from "motion/react";
import { revealFromRight, revealFromTop } from "../motion/hero";
import { buildStats } from "../lib/utils";
import { figures } from "../lib/constants";

const Hero = () => {
  const stats = buildStats(figures);
  const [videoOpen, setVideoOpen] = useState(false);
  const [canPlayVideo, setCanPlayVideo] = useState(true);

  useEffect(() => {
    const video = document.createElement("video");
    const canPlayMp4 = video.canPlayType(
      'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
    );

    setCanPlayVideo(canPlayMp4 !== "");
  }, []);

  useEffect(() => {
    if (!videoOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [videoOpen]);

  return (
    <section className={`relative overflow-hidden py-8 lg:py-10 xl:py-12`}>
      <div className="absolute left-0 h-full w-40 -translate-x-1/2 rounded-full bg-secondaryVar3 blur-[120px] md:w-55 md:blur-[180px] lg:w-65 lg:blur-[250px]" />
      <div className="absolute right-0 h-full w-40 translate-x-1/2 rounded-full bg-primaryVar4 blur-[120px] md:w-55 md:blur-[180px] lg:w-65 lg:blur-[250px]" />
      <div className="container space-y-4 ">
        <div className="flex shrink-0 items-center justify-between gap-1 md:gap-4 lg:gap-8">
          <div className="flex flex-col items-center gap-6 xl:gap-9">
            <motion.div
              variants={revealFromTop}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-4 lg:gap-6 xl:gap-8"
            >
              <div className="titlu-pagina">Atingem împreună</div>
              <div className="font-gagalin text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                <span className="titlu-pagina bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Obiectivele de Fitness
                </span>
              </div>
              <div className="titlu-pagina">Cu Eduard Bălăiță</div>
            </motion.div>
            <div className="max-md:hidden">
              <HeroCta />
            </div>
          </div>
          <motion.div
            variants={revealFromRight}
            initial="hidden"
            animate="visible"
            className="relative w-fit shrink-0 lg:row-span-2"
          >
            <div className="absolute size-17.5 rounded-full bg-secondary blur-xl drop-shadow-md max-lg:hidden" />
            <div className="absolute bottom-0 right-0 size-17.5 rounded-full bg-primary blur-xl drop-shadow-md max-lg:hidden" />
            {stats.map((item, i) => {
              const hasVideo = item.desc.toLowerCase().includes("video");

              return (
                <motion.div
                  key={item.id}
                  style={item.style}
                  whileInView={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + 0.2 * i }}
                  className={`absolute w-fit rounded-[20px] bg-linear-to-b from-primary to-secondary p-0.5 max-lg:hidden ${item.positionClass}`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (hasVideo && canPlayVideo) setVideoOpen(true);
                    }}
                    className={`flex flex-col gap-2 rounded-[20px] bg-grey px-6 py-2 text-left xl:px-9 ${
                      hasVideo && canPlayVideo
                        ? "cursor-pointer"
                        : "cursor-default"
                    }`}
                  >
                    <h3 className="font-medium">{item.figures}</h3>
                    <p className="text-xs">{item.desc}</p>
                  </button>
                </motion.div>
              );
            })}
            <div className="absolute bottom-0 -z-10 flex aspect-square w-full items-center justify-center rounded-full bg-linear-to-l from-primary to-secondary blur-lg drop-shadow-sm lg:-left-2 lg:h-105.5 lg:w-[420.33px] lg:-translate-y-3 lg:translate-x-8 xl:-left-3 xl:h-133.25 xl:w-[569.71px]" />
            <img
              src={heroImg}
              alt=""
              width={169}
              height={181}
              className="sm:h-75 sm:w-75 lg:h-122.5 lg:w-122.5 xl:h-152.25 xl:w-152.25"
            />
          </motion.div>
        </div>
        <div className="md:hidden">
          <HeroCta />
        </div>
      </div>

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-fit max-w-[calc(100vw-2rem)] rounded-2xl bg-primaryVar3/60 px-[15px] py-3 sm:max-w-[calc(100vw-3rem)] sm:py-4"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-2"
              aria-label="Închide video"
            >
              <img src={close} alt="" className="size-4 sm:size-5" />
            </button>

            {canPlayVideo && (
              <video
                src={heroVideo}
                controls
                autoPlay
                className="max-h-[80vh] max-w-full rounded-xl"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
