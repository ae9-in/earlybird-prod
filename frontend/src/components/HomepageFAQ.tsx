'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './HomepageFAQ.css';

interface FAQItem {
  q: string;
  a: string;
}

interface HomepageFAQProps {
  faqs: FAQItem[];
}

export default function HomepageFAQ({ faqs }: HomepageFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section section-padding" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="faq-header">
          <div className="tag">Got Questions?</div>
          <h2 id="faq-heading">Frequently Asked Questions</h2>
          <p>Everything you need to know about brand promotion and influencer marketing in India.</p>
        </div>

        <div className="faq-list" role="list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                role="listitem"
              >
                <button
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-btn-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`faq-chevron ${isOpen ? 'faq-chevron--open' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {/* Answer is always in the DOM for crawlers — only visually hidden */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={`faq-answer ${isOpen ? 'faq-answer--open' : ''}`}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-cta">
          <p>Still have questions?</p>
          <a href="#partner" className="btn-secondary">Talk to our team</a>
        </div>
      </div>
    </section>
  );
}
