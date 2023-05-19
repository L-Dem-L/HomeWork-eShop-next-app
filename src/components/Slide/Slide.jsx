import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import s from "./Slide.module.scss";
import Image from "next/image";
import slideImg from "./Screenshot.png"

const Slide = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className={s.heroslide}
    >
      <SwiperSlide className={s.hero_slide}>
        <div className={s.heroslide__item}>
            <div className={s.heroslide__item_circle}>
                <p>
                  SHOP <br />
                  CLOTHING <br />
                  <span>HERE</span>
                </p>
            </div>
            <Image src={slideImg} alt="slide1" />    
        </div>
      </SwiperSlide>
      <SwiperSlide className={s.hero_slide}>
        <div className={s.heroslide__item}>
            <div className={s.heroslide__item_circle}>
                <p>
                  SHOP <br />
                  CLOTHING <br />
                  <span>HERE</span>
                </p>
            </div>
            <Image src={slideImg} alt="slide1" />    
        </div>
      </SwiperSlide>
      <SwiperSlide className={s.hero_slide}>
        <div className={s.heroslide__item}>
            <div className={s.heroslide__item_circle}>
                <p>
                  SHOP <br />
                  CLOTHING <br />
                  <span>HERE</span>
                </p>
            </div>
            <Image src={slideImg} alt="slide1" />    
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slide;
