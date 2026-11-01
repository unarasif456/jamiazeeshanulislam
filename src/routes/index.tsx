import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { academyContact } from "@/components/academy-shared";
import { AcademyHeader } from "@/components/academy-header";
import { AcademyHero } from "@/components/academy-hero";
import { AcademyTrust } from "@/components/academy-trust";
import { AcademyCourses, courses } from "@/components/academy-courses";
import { AcademyTeachers, teachers } from "@/components/academy-teachers";
import { AcademyReviews, reviews } from "@/components/academy-reviews";
import { AcademyCTA } from "@/components/academy-cta";
import { AcademyFooter } from "@/components/academy-footer";
export const Route = createFileRoute("/")({ head: () => ({ meta: [{ title: "Jamia Zeeshan ul Islam | Online Quran Academy" }, { name: "description", content: "Learn Quran online with proper Tajweed. One-on-one classes for kids and adults. Book your free trial with Jamia Zeeshan ul Islam." }, { property: "og:title", content: "Jamia Zeeshan ul Islam — Online Quran Academy" }, { property: "og:description", content: "Personal Quran, Tajweed and Hifz classes for kids and adults. Start with a free trial on WhatsApp." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: Index });
function Index() {
 useEffect(() => { const elements = document.querySelectorAll("main section:not(:first-child)"); const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); }, { threshold: 0.06 }); elements.forEach(element => { element.classList.add("scroll-reveal"); observer.observe(element); }); return () => observer.disconnect(); }, []);
 return <div className="min-h-screen bg-background text-foreground"><AcademyHeader {...academyContact} /><main><AcademyHero {...academyContact} /><AcademyTrust students={500} satisfaction={100} /><AcademyCourses {...academyContact} courses={courses} /><AcademyTeachers teachers={teachers} /><AcademyReviews reviews={reviews} /><AcademyCTA {...academyContact} /></main><AcademyFooter {...academyContact} /></div>;
}
