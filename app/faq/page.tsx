'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How much does Lumen cost?',
      answer: 'Totally free. Lumen\'s solar report, research, and recommendations cost you nothing. You\'ll never be charged for anything.',
    },
    {
      question: 'Will I get sales calls after requesting a report?',
      answer: 'Yes — but not to sell you anything. After you request your report, Lumen reaches out personally to confirm your details, walk you through your results, and answer any questions you might have. Think of it as a welcome call from your concierge, not a sales pitch. Beyond that, your contact information is never sold or shared with any other company.',
    },
    {
      question: 'How is Lumen different from sites like EnergySage?',
      answer: 'Those sites sell your info the second you hit submit — sometimes to half a dozen companies at once. Lumen does the opposite. It keeps your info private, does all the research for you, and only introduces you to one recommended installer when you decide you\'re ready.',
    },
    {
      question: 'How does Lumen make money?',
      answer: 'Installers in Lumen\'s network pay a fee when a homeowner chooses to move forward. This never affects what you pay for solar — and it\'s what keeps Lumen completely free for you.',
    },
    {
      question: 'How accurate are the savings estimates?',
      answer: 'Lumen uses real satellite imagery, local utility rates, and current incentive programs to build your estimate. It\'s a strong starting point — your installer will refine it with a detailed site visit.',
    },
    {
      question: 'What if I\'m not ready to move forward yet?',
      answer: 'No rush. Your report is yours to keep. Lumen doesn\'t pressure, follow up aggressively, or expire your information. Whenever you\'re ready, Lumen\'s here.',
    },
    {
      question: 'What states does Lumen serve?',
      answer: 'Lumen is currently helping homeowners in Illinois, with more states coming soon.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-[140px] pb-20 bg-gradient-to-br from-warm-white via-cream to-warm-bg relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.08] pointer-events-none bg-[radial-gradient(circle,rgba(245,158,11,1)_0%,transparent_70%)]" />

        <div className="container mx-auto px-6 max-w-[900px] relative z-10 text-center">
          <div className="text-[0.8rem] font-bold text-gold uppercase tracking-[2px] mb-4">
            Questions & Answers
          </div>
          <h1 className="font-serif text-[3.5rem] leading-[1.1] mb-6">
            Frequently asked questions
          </h1>
          <p className="text-[1.15rem] text-text-light max-w-[640px] mx-auto">
            Everything you need to know about Lumen Solar Concierge.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-[800px]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-warm-bg rounded-[16px] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-all duration-300 hover:bg-gold-pale"
              >
                <span className="font-serif text-[1.3rem] text-navy pr-4">
                  {faq.question}
                </span>
                <span className="text-[2rem] text-gold flex-shrink-0 transition-transform duration-300"
                      style={{ transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0">
                  <p className="text-[1.05rem] text-text-light leading-[1.8]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
