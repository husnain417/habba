import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { PlayCircle, PauseCircle, Volume2, VolumeX } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


const videos = [
  "/assets/review.mp4",
  "/assets/review.mp4",
  "/assets/review.mp4",
  "/assets/review.mp4",
  "/assets/review.mp4",
];

function VideoSwiper() {
  const swiperRef = useRef(null);
  const containerRef = useRef(null); // Ref for animation

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 100 }, // Start position (hidden and lower)
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Start animation when 80% of element is in view
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  const playActiveVideo = async () => {
    const videos = document.querySelectorAll('video');
    const activeVideo = videos[activeVideoIndex];
    if (activeVideo && isPlaying) {
      try {
        await activeVideo.play();
      } catch (error) {
        console.log("Video play error:", error);
      }
    }
  };

  useEffect(() => {
    playActiveVideo();
  }, [activeVideoIndex]);

  const handleSlideChange = (swiper) => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
    });
    setActiveVideoIndex(swiper.activeIndex);
  };

  const togglePlayPause = () => {
    const videos = document.querySelectorAll('video');
    const activeVideo = videos[activeVideoIndex];

    if (activeVideo) {
      if (isPlaying) {
        activeVideo.pause();
      } else {
        activeVideo.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const videos = document.querySelectorAll('video');
    const activeVideo = videos[activeVideoIndex];

    if (activeVideo) {
      activeVideo.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div ref={containerRef} className="wrapper">
      <div className="outer-container">
        <div className="inner-container">
          <div className="swiper-section">
            <Swiper
              ref={swiperRef}
              effect={'coverflow'}
              grabCursor={false}
              centeredSlides={true}
              slidesPerView={'auto'}
              initialSlide={1}
              spaceBetween={60}
              speed={800}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ 
                el: '.swiper-pagination', 
                clickable: true,
                dynamicBullets: true
              }}
              modules={[EffectCoverflow, Pagination]}
              className="swiper_container"
              onSlideChange={handleSlideChange}
            >
              {videos.map((video, index) => (
                <SwiperSlide key={index}>
                  <div className="video-container">
                    <video
                      className="video-slide"
                      src={video}
                      muted={isMuted}
                      playsInline
                      loop
                    />
                    {index === activeVideoIndex && (
                      <div className="video-controls">
                        <button onClick={togglePlayPause} className="control-button">
                          {isPlaying ? (
                            <PauseCircle className="control-icon" />
                          ) : (
                            <PlayCircle className="control-icon" />
                          )}
                        </button>
                        <button onClick={toggleMute} className="control-button">
                          {isMuted ? (
                            <VolumeX className="control-icon" />
                          ) : (
                            <Volume2 className="control-icon" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="swiper-pagination"></div>

      <style jsx global>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          position: relative;
          max-width: 70%;
          margin: 0 auto;
        }

        .outer-container {
          width: 100%;
          display: flex;
          justify-content: center;
          padding-top: 2rem;
          border-radius: 1.5rem;
        }

        .inner-container {
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 1.5rem;
        }

        .swiper-section {
          position: relative;
          border-radius: 1.5rem;
        }

        .video-container {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
        }

        .video-controls {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 10;
          padding: 0.5rem;
          border-radius: 2rem;
          backdrop-filter: blur(4px);
        }

        .control-button {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          border-radius: 50%;
        }

        .control-button:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.2);
        }

        .control-icon {
          width: 2rem;
          height: 2rem;
          color: white;
        }

        .swiper_container {
          padding: 2rem 0;
          padding-bottom: 0px;
          position: relative;
        }

        .swiper-slide {
          width: 28rem;
          height: 32rem;
          position: relative;
          transition: transform 0.8s ease;
          border-radius: 1.5rem;
          overflow: hidden;
          pointer-events: none;
        }

        .swiper-slide-active {
          pointer-events: auto;
        }

        .video-slide {
          width: 28rem;
          height: 32rem;
          border-radius: 1.5rem;
          object-fit: cover;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Updated pagination styles */
        .swiper-pagination {
          position: relative !important;
          bottom: 0 !important;
          display: flex !important;
          justify-content: center;
          gap: 0.75rem !important;  /* Reduced gap between dots */
          margin-top: 1rem;
          width: 100% !important;
        }

        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: #666666 !important;
          opacity: 0.6;
          transition: all 0.3s ease;
          margin: 0 !important;
        }

        .swiper-pagination-bullet-active {
          background: #000000 !important;
          opacity: 1;
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .wrapper {
            max-width: 100%;
          }

          .swiper-slide {
            width: 20rem !important;
            height: 28rem !important;
          }

          .video-slide {
            width: 20rem !important;
            height: 28rem !important;
          }

          .control-icon {
            width: 1.5rem;
            height: 1.5rem;
          }

          .swiper-pagination-bullet {
            width: 10px !important;
            height: 10px !important;
          }

          .swiper-pagination {
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default VideoSwiper;