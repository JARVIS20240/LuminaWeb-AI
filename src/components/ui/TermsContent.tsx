"use client";

import { motion } from "framer-motion";

export default function TermsContent() {
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
          Terms & Conditions
        </motion.h1>

        <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
          <div>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              By accessing the LuminaWeb AI website or contracting our services, you agree to be bound by these terms. If you do not agree with any part of these terms, please refrain from using our site.
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">1. Our Services</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              LuminaWeb AI provides professional digital services, including branding, website development, SEO marketing, and advanced AI integration (e.g., custom local RAG pipelines and automation systems). Specific project scopes, timelines, deliverables, and hardware requirements will be detailed and agreed upon separately via a formal project proposal or contract.
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">2. Payments & Milestones</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              Project pricing and payment schedules will be clearly defined before development begins. We typically structure payments around project milestones to ensure alignment and momentum. Prompt payment is required to maintain the project timeline; late payments may result in paused development.
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">3. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg leading-relaxed text-foreground/80">
              <li><strong>Final Deliverables:</strong> Upon full payment, you own the final deliverables (designs, deployed code, and integrated systems) created specifically for your project.</li>
              <li><strong>Portfolio Rights:</strong> Unless otherwise agreed under a Non-Disclosure Agreement (NDA), LuminaWeb AI reserves the right to showcase the completed work in our portfolio, case studies, and marketing materials to demonstrate our engineering capabilities.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">4. Client Responsibilities</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80 mb-6">
              To ensure the timely and successful deployment of your project, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-base md:text-lg leading-relaxed text-foreground/80">
              <li>Provide all necessary assets, copy, API keys, or enterprise data sets required for development in a timely manner.</li>
              <li>Respond to feedback requests and milestone approvals within a reasonable timeframe.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">5. Cancellations & Refunds</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              Either party may terminate a project with written notice. In the event of cancellation mid-project, the client is responsible for payment proportional to the engineering and design work already completed up to the date of cancellation.
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">6. Limitation of Liability</h2>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">
              LuminaWeb AI strives for excellence in all deployments. However, we are not liable for any indirect, incidental, or consequential damages resulting from the use of our website or the services provided, beyond the scope of the specific project agreement.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
