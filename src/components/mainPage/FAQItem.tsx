
'use client';

import { useState } from 'react';

type FAQItemProps = {
  question: string;
  children: React.ReactNode; 
};

export default function FAQItem({ question, children }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item">
      <button
        className={`faq-question ${isOpen ? 'open' : ''}`}
        onClick={toggle}
        aria-expanded={isOpen}
      >
        {question}
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
}