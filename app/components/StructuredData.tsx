export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Urhoghide Justin Uyioghosa",
    jobTitle: "Frontend Developer",
    url: "https://justindavid.vercel.app",
    email: "uyijustindavid@vercel.app",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Benin City",
      addressCountry: "Nigeria",
    },
    sameAs: [
      "https://github.com/uyimolo",
      "https://www.linkedin.com/in/uyijustindavid/",
      "https://twitter.com/codefrontline",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Figma",
      "Fastify",
      "Prisma",
      "Node.js",
      "PostgreSQL",
      "Redux Toolkit",
      "Frontend Development",
      "Web Development",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "HNG 12 Internship",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
