import type { Metadata } from "next";
import {
  TestimonialMarquee,
  type Testimonial,
} from "@/components/testimonials/TestimonialMarquee";

export const metadata: Metadata = {
  title: "Testimonials — AMIPI",
  description:
    "Jewelers love No Bull! But don't take our word for it - read what AMIPI's customers say.",
  alternates: { canonical: "/testimonials" },
};


/** Verbatim from amipi.com/testimonials, in the same order. */
const TESTIMONIALS: Testimonial[] = [
  {
    title: "Highly recommend.",
    body: "Great customer service. They were patient and showed a true interest in finding exactly what I needed. Highly recommend.",
    name: "Billy Pisa, Westchester, NY",
    stars: 5,
  },
  {
    body: "Excellent service and professional experience.",
    name: "Jason Simmons, Long Island, NY",
    stars: 5,
  },
  {
    title: "Great",
    body: "Great company and the people are easy to work with.",
    name: "Bob, Auburn, NY",
    stars: 5,
  },
  {
    title: "Owner",
    body: "I am in jewelry business since 1989. I did deal with several company but I am so happy to find your company. The main reason is your customer service and have an excellent employee like Mrs Jytie. She is excellent, I thought she is a owner of the company the way she caring about the customer. Congratulation to you to have an employee like her in your business. Warm Regards, Suzie M",
    name: "Mrs. Suzie M, Houston TX",
    stars: 5,
  },
  {
    title: "Outstanding!",
    body: "I have been doing business with Amipi for about 15 years. They have been an outstanding partner for my business. Karan and Amish have gone above and beyond the call of duty so many times for me. Believe me when I say, after 40 years in the industry, you will not regret doing business with these people. Five stars!",
    name: "Michael K",
    stars: 5,
  },
  {
    body: "Headline: High Quality and wide range of products/diamonds, Competitive/reasonable pricing, Excellent Subject Matter Expertise and guidance, Superior Customer Service, Tailored solution based on customer needs, Quick turnaround time on delivery Details: Note: I performed extensive research on jewelry providers both online and in-store retailers and also engaged with them before I decided to proceed with Amipi. I have had an incredible end-to-end experience with Amipi Inc. They came highly recommended by multiple family friends and did not disappoint. I reached out to them for an engagement ring. Shreya, who leads Amipi's individual clientele portfolio personally worked with me along with her team on a daily basis to help me find the right ring. The ring was customized and I had the opportunity to choose the diamond per my liking from the extensive range of diamonds Amipi houses. Shreya and her team of experts (Dixit Shah and co.) physically inspected every diamond on my shortlist to make sure they met my requirements. She also provided her expert guidance during the selection process which made it not only easier for me but also gave me comfort with my decision making process. Furthermore, Shreya always worked within my pricing requirements and never once tried to upsell me. Once ordered, the turnaround time for delivery was excellent. The entire process was very pleasant and professional. The proposal was a surprise and Shreya worked around my schedule for this. My Fiancé absolutely loves the ring and she gets a lot of positive compliments from people on it. We will definitely continue our relationship with Amipi in the future.",
    name: "Viresh",
    stars: 5,
  },
  {
    body: 'For my 49th birthday, I wanted to buy myself a diamond ring. I work hard and wanted a daily reminder of how far I have come on my hands as I type. I also know nothing about diamonds, so I entrusted my decision to Amipi. Their VP knows that I have high standards. I came with an idea of what I wanted. She suggested a ring that matched. It was the perfect fit. I look at my ring each day just as I am right now at the airport as I"m working and smile. Thank you Amipi!',
    name: "JOYA",
    stars: 5,
  },
  {
    body: "I have had the pleasure of working with Vasu on several diamond transactions. Very good customer service!",
    name: "Be",
    stars: 5,
  },
  {
    body: "Great customer service since day one. Extremely well run family business. Jyoti is excellent.",
    name: "Gary",
    stars: 5,
  },
  {
    body: "This is a great company, they bend over backwards to assist you. Please give them an opportunity to help with your next request I'm sure you will be more than satisfied.",
    name: "Simmons",
    stars: 5,
  },
  { body: "Wonderful experience every time!", name: "Emily", stars: 5 },
  {
    body: "They really mean no bull. Amazing customer service each time to see them or call them. Great team work. Highly recommended to all my friends and family in the retail business. You always get the best prices compare to any other Wholseler in the business. Amish & Karan you rock.",
    name: "Malani",
    stars: 5,
  },
  { body: "Wonderful Company to work with!", name: "Rachael", stars: 5 },
  {
    body: "I have been doing business with Amipi for about 15 years. They have been an outstanding partner for my business. Karan and Amish have gone above and beyond the call of duty so many times for me. Believe me when I say, after 40 years in the industry, you will not regret doing business with these people. Five stars!",
    name: "Michael",
    stars: 5,
  },
  { body: "Great customer service, prices and quality product.", name: "Seth", stars: 5 },
  {
    body: "Amipi inc is my only go to place for diamonds and jewelry ❤️💎💎💎",
    name: "Shreya",
    stars: 5,
  },
  { body: "Only rating provided.", name: "Naveen", stars: 4 },
  { body: "Very good company to buy diamond's.", name: "Uday", stars: 5 },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-background px-4 pt-24 pb-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <TestimonialMarquee
          testimonials={TESTIMONIALS}
          headline="Jewelers love No Bull!!!"
          subhead="But don’t take our word for it."
        />
      </div>
    </div>
  );
}
