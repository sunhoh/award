import { useRef, useEffect } from 'react';
import Loading from '../components/Loading';
import DrawCard from '../components/DrawCard';
import useDrawData from '../hook/useDrawData';
import useCheckHome from '../hook/useCheckHome';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';

const Draw = () => {
  useCheckHome();
  const { data, isLoading } = useDrawData();
  const swiperRef = useRef<SwiperClass | any>(null);

  useEffect(() => {
    const syncSlide = () => {
      const slice = localStorage.getItem('slice');
      if (swiperRef.current && swiperRef.current.swiper && slice !== null) {
        swiperRef.current.swiper.slideTo(parseInt(slice, 10));
      }
    };
    syncSlide();

    window.addEventListener('storage', syncSlide);
    return () => {
      window.removeEventListener('storage', syncSlide);
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="absolute inset-0 -z-10">
        <video className="w-full h-full object-cover" src="/bg.mp4" autoPlay loop muted></video>
      </div>

      <div className={`${isLoading && 'blur-sm'}  text-center`}>
        <h1 className="text-[2rem] font-bold mb-6 text-[#fff]">
          서울영상광고제 후원해 주신 분들께 감사드립니다.
        </h1>
        <div className="w-[1000px]">
          <Swiper className="mySwiper" ref={swiperRef}>
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <DrawCard key={index} {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Draw;
