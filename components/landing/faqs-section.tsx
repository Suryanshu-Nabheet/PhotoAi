import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQsSection() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl lg:border-x">
      <div className="mx-4 grid h-[calc(100vh-3.5rem)] grid-cols-1 border-x md:mx-0 md:grid-cols-2 md:border-x-0">
        <div className="space-y-4 px-4 pt-12 pb-4 md:border-r">
          <h2 className="font-black text-3xl md:text-4xl text-white">FAQs</h2>
          <p className="text-gray-400">
            Here are some common questions and answers about PhotoAI and our AI
            image generation platform.
          </p>
        </div>
        <div className="place-content-center">
          <Accordion collapsible defaultValue="item-1" type="single">
            {questions.map((item) => (
              <AccordionItem
                className="first:border-t last:border-b data-[state=open]:bg-card"
                key={item.id}
                value={item.id}
              >
                <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline text-white">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-400">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className="flex h-14 items-center justify-center border-t">
        <p className="text-gray-400">
          Can't find what you're looking for?{" "}
          <a className="text-primary hover:underline" href="#contact">
            Contact Us
          </a>
        </p>
      </div>
    </div>
  );
}

const questions = [
  {
    id: "item-1",
    title: "What is PhotoAI?",
    content:
      "PhotoAI is an advanced AI-powered image generation platform that creates stunning, professional-quality images in seconds. From portraits to creative art, we help you transform your vision into reality.",
  },
  {
    id: "item-2",
    title: "Who can use PhotoAI?",
    content:
      "PhotoAI is perfect for content creators, marketers, designers, and anyone who needs high-quality AI-generated images. Whether you're a professional or just getting started, our platform is easy to use.",
  },
  {
    id: "item-3",
    title: "What types of images can I create?",
    content:
      "You can create a wide variety of images including professional headshots, artistic portraits, business photography, creative visuals, and more. Our AI models are trained on diverse datasets to handle various styles and subjects.",
  },
  {
    id: "item-4",
    title: "How does the image generation work?",
    content:
      "Simply describe what you want to create using text prompts, select your preferred AI model, and our advanced algorithms will generate your image in seconds. You can refine and regenerate until you get the perfect result.",
  },
  {
    id: "item-5",
    title: "Can I use the generated images commercially?",
    content:
      "Yes! All images generated through PhotoAI can be used for commercial purposes. You retain full rights to the images you create on our platform.",
  },
  {
    id: "item-6",
    title: "What are Packs?",
    content:
      "Packs are pre-configured collections of AI models and settings optimized for specific use cases like portraits, landscapes, or product photography. They make it easy to get professional results without tweaking settings.",
  },
  {
    id: "item-7",
    title: "How do I get started?",
    content:
      "Simply sign up for a free account, choose your preferred generation method (Camera, Generate, or Packs), and start creating amazing AI images right away. No credit card required to get started!",
  },
];
