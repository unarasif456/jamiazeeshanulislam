import { z } from "zod";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export const WHATSAPP_URL = "https://wa.me/923152834384";
export const PHONE = "03152834384";
export const contactSchema = z.object({ whatsapp: z.literal(WHATSAPP_URL) });
export const academyContact: z.infer<typeof contactSchema> = { whatsapp: WHATSAPP_URL };
export function WhatsAppButton({ children, className = "", gold = false }: { children: React.ReactNode; className?: string; gold?: boolean }) {
 return <Button asChild size="lg" className={`h-auto min-h-12 whitespace-normal rounded-lg px-5 py-3 text-center text-sm ${gold ? "bg-gold text-gold-foreground hover:bg-gold/90" : ""} ${className}`}><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{children}</a></Button>;
}
export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p className="mt-4 text-muted-foreground">{description}</p></div>; }
