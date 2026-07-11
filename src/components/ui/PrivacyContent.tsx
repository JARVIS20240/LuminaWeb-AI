"use client";

import { motion } from "framer-motion";

export default function PrivacyContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.7,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-8 md:pt-40 md:pb-12 flex-grow">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-8 lg:mb-12 tracking-tighter text-foreground"
        >
          Privacy Policy
        </motion.h1>

        <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
          <div>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              At LuminaWeb AI, we take your privacy as seriously as our engineering. This Privacy Policy outlines how we collect, use, and protect your information when you engage with our website and services. Given our specialization in secure, local AI deployments, data protection is foundational to our work.
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">1. Information We Collect</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80 mb-6">
              We collect information to provide and improve our services.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg leading-relaxed text-foreground/80">
              <li><strong>Information you provide directly:</strong> When you contact us via our 'Get in Touch' form, subscribe to our newsletter, or contract us for services, we collect your name, email address, and project details.</li>
              <li><strong>Information collected automatically:</strong> We may use standard analytics tools to collect non-identifying data regarding website traffic, browser types, and user interactions to optimize our digital presence.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">2. How We Use Your Information</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80 mb-6">
              The data we collect is strictly utilized for professional purposes:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg leading-relaxed text-foreground/80">
              <li>To respond promptly to your project inquiries and provide accurate consultations.</li>
              <li>To deliver the branding, web development, and AI integration services you request.</li>
              <li>To send occasional, relevant updates regarding our services (only if you have opted in).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">3. Data Security & AI Processing</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              We maintain a strict commitment to data privacy. We implement industry-standard security measures to protect your personal information. Furthermore, our specialized AI solutions—such as our Enterprise Meeting Summarizer and local RAG pipelines—are specifically engineered to run locally on designated hardware, ensuring that your sensitive enterprise data is never unnecessarily exposed to third-party cloud processing.
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">4. Sharing Your Information</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              We do not sell, rent, or trade your personal data. We only share information with trusted third-party service providers (e.g., secure hosting platforms, payment processors) necessary to operate our business and deliver your project, under strict confidentiality agreements.
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">5. Your Rights</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              You retain full control over your personal data. You have the right to request access to the information we hold about you, request corrections, or request deletion of your data at any time by contacting us directly.
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">6. Changes to This Policy</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              As our AI capabilities and services evolve, we may update this policy. All changes will be posted on this page with an updated effective date.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
