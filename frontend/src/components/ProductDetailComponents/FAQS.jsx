import React from 'react';

const FAQs = () => {
  const faqData = [
    {
      question: 'What is the return policy?',
      answer: 'You can return any unopened items within 30 days for a full refund.',
    },
    {
      question: 'How do I track my order?',
      answer: 'You will receive a tracking number via email once your order has shipped.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship internationally to select countries.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and Apple Pay.',
    },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold">{faq.question}</h3>
          <p className="text-gray-700">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQs;
