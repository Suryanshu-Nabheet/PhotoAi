"use client";

import React from "react";
import { Carousel, Card } from "@/components/landing/carousel";

export default function GalleryCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        AI-Generated Masterpieces
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(2).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                Transform your vision into reality with PhotoAI.
              </span>{" "}
              Our advanced AI technology creates stunning, professional-quality
              images in seconds. From portraits to creative art, experience the
              future of image generation.
            </p>
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "AI Portrait",
    title: "Professional Headshot",
    src: "/Images/Image1.jpg",
    content: <DummyContent />,
  },
  {
    category: "Creative Art",
    title: "Artistic Portrait",
    src: "/Images/Image2.jpg",
    content: <DummyContent />,
  },
  {
    category: "Professional",
    title: "Business Photography",
    src: "/Images/Image3.jpg",
    content: <DummyContent />,
  },
  {
    category: "AI Generated",
    title: "Stunning Visual",
    src: "/Images/Image4.jpg",
    content: <DummyContent />,
  },
  {
    category: "Portrait",
    title: "Natural Beauty",
    src: "/Images/Image5.jpg",
    content: <DummyContent />,
  },
  {
    category: "Creative",
    title: "Artistic Expression",
    src: "/Images/Image6.jpg",
    content: <DummyContent />,
  },
  {
    category: "Professional",
    title: "Corporate Style",
    src: "/Images/Image7.jpg",
    content: <DummyContent />,
  },
  {
    category: "AI Art",
    title: "Digital Masterpiece",
    src: "/Images/Image8.jpg",
    content: <DummyContent />,
  },
  {
    category: "Portrait",
    title: "Elegant Style",
    src: "/Images/Image9.jpg",
    content: <DummyContent />,
  },
  {
    category: "Creative",
    title: "Modern Art",
    src: "/Images/Image10.jpg",
    content: <DummyContent />,
  },
  {
    category: "Professional",
    title: "Executive Portrait",
    src: "/Images/Image11.jpg",
    content: <DummyContent />,
  },
  {
    category: "AI Generated",
    title: "Premium Quality",
    src: "/Images/Image12.jpg",
    content: <DummyContent />,
  },
  {
    category: "Portrait",
    title: "Classic Style",
    src: "/Images/Image13.jpg",
    content: <DummyContent />,
  },
  {
    category: "Creative",
    title: "Unique Vision",
    src: "/Images/Image15.jpg",
    content: <DummyContent />,
  },
  {
    category: "Professional",
    title: "Business Portrait",
    src: "/Images/Image16.jpg",
    content: <DummyContent />,
  },
  {
    category: "AI Art",
    title: "Creative Excellence",
    src: "/Images/Image17.jpg",
    content: <DummyContent />,
  },
];
