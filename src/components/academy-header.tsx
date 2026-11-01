import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png.asset.json";
import { contactSchema, WhatsAppButton } from "./academy-shared";
export const headerSchema = contactSchema;
const links = [["Home", "#home"], ["Courses", "#courses"], ["Teachers", "#teachers"], ["Reviews", "#reviews"]];
export function AcademyHeader(props: { whatsapp: string }) {
 headerSchema.parse(props); const [open, setOpen] = useState(false);
 return <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md"><div className="page-container flex min-h-22 items-center justify-between gap-5"><a href="#home" className="flex items-center gap-3"><img src={logo.url} alt="" width={52} height={52} className="h-13 w-13 object-contain" /><span className="brand-name">Jamia Zeeshan<span className="block">ul Islam<span className="brand-caption">ONLINE QURAN ACADEMY</span></span></span></a><nav aria-label="Main navigation" className="hidden gap-8 text-sm font-medium lg:flex">{links.map(([name, href]) => <a key={name} href={href} className="transition-colors hover:text-primary">{name}</a>)}</nav><div className="hidden sm:block"><WhatsAppButton>Free Trial on WhatsApp</WhatsAppButton></div><Button variant="ghost" size="icon" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="lg:hidden">{open ? <X /> : <Menu />}</Button></div>{open && <nav id="mobile-menu" aria-label="Mobile navigation" className="page-container border-t py-5 lg:hidden">{links.map(([name, href]) => <a key={name} href={href} onClick={() => setOpen(false)} className="block py-3 text-sm">{name}</a>)}<WhatsAppButton className="mt-3 w-full">Free Trial on WhatsApp</WhatsAppButton></nav>}</header>;
}
