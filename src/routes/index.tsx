import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import video from "@/assets/hero.mp4.asset.json";
import logo from "@/assets/logo.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "جامعہ ذیشان الاسلام | Jamia Zeeshan-ul-Islam" },
      { name: "description", content: "جامعہ ذیشان الاسلام — حفظ، ناظرہ، درسِ نظامی اور دینی تعلیم کا مرکز۔" },
      { property: "og:title", content: "جامعہ ذیشان الاسلام" },
      { property: "og:description", content: "دینی تعلیم کا مرکز — شعبہ جات، تازہ خبریں اور عطیات" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP = "923000000000";
const JAZZCASH = "03XX-XXXXXXX";

const nav = [
  { label: "صفحہ اول", href: "#home" },
  { label: "شعبہ جات", href: "#departments", children: ["حفظ القرآن", "ناظرہ", "درسِ نظامی", "تجوید"] },
  { label: "تازہ خبریں", href: "#news" },
  { label: "عطیات", href: "#donate" },
];

const departments = [
  { t: "حفظ القرآن", d: "ماہر قراء کی نگرانی میں قرآن کریم حفظ" },
  { t: "ناظرہ قرآن", d: "تجوید کے ساتھ صحیح تلاوت کی تعلیم" },
  { t: "درسِ نظامی", d: "عالم کورس — فقہ، حدیث، تفسیر" },
  { t: "تجوید و قراءت", d: "مخارج اور قواعدِ تجوید کی مشق" },
];

const news = [
  { date: "۲۵ اکتوبر", t: "سالانہ جلسہ دستار بندی کی تیاریاں" },
  { date: "۱۸ اکتوبر", t: "نئے داخلوں کا آغاز ہو گیا ہے" },
  { date: "۱۰ اکتوبر", t: "ہفتہ وار درسِ قرآن ہر جمعرات بعد نمازِ مغرب" },
];

function Index() {
  const [open, setOpen] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
          <a href="#home" className="flex items-center gap-2">
            <img src={logo.url} alt="جامعہ ذیشان الاسلام" className="h-12 w-12 rounded-full object-cover ring-1 ring-primary/50" />
            <span className="text-gold text-lg font-bold">جامعہ ذیشان الاسلام</span>
          </a>
          <nav className="hidden items-center gap-5 md:flex">
            {nav.map((n) => (
              <div key={n.label} className="relative" onMouseEnter={() => setOpen(n.label)} onMouseLeave={() => setOpen(null)}>
                <a href={n.href} className="text-sm hover:text-primary">{n.label}{n.children && " ▾"}</a>
                {n.children && open === n.label && (
                  <div className="absolute right-0 top-full min-w-40 rounded-md border bg-popover p-2 shadow-lg">
                    {n.children.map((c) => (
                      <a key={c} href={n.href} className="block rounded px-3 py-1 text-sm hover:bg-muted">{c}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#donate" className="bg-gold rounded-full px-4 py-1.5 text-sm font-bold text-primary-foreground">عطیہ دیں</a>
            <button aria-label="مینو" onClick={() => setMenu(!menu)} className="rounded border px-2 text-primary md:hidden">☰</button>
          </div>
        </div>
        {menu && (
          <div className="border-t px-4 py-2 md:hidden">
            {nav.map((n) => (
              <div key={n.label}>
                <a href={n.href} onClick={() => setMenu(false)} className="block py-1">{n.label}</a>
                {n.children?.map((c) => (
                  <a key={c} href={n.href} onClick={() => setMenu(false)} className="block pr-4 text-sm text-muted-foreground">— {c}</a>
                ))}
              </div>
            ))}
          </div>
        )}
      </header>

      <section id="home" className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <video src={video.url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-overlay absolute inset-0" />
        <div className="relative z-10 px-4 text-center">
          <img src={logo.url} alt="" className="mx-auto mb-4 w-44 rounded-2xl mix-blend-lighten" />
          <p className="font-latin text-2xl text-primary">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <h1 className="text-gold mt-2 text-4xl font-bold md:text-6xl">جامعہ ذیشان الاسلام</h1>
          <p className="mt-3 text-muted-foreground">علم، عمل اور اخلاق کا گہوارہ</p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="#departments" className="rounded-full border border-primary px-5 py-2 text-primary">شعبہ جات</a>
            <a href="#donate" className="bg-gold rounded-full px-5 py-2 font-bold text-primary-foreground">عطیہ دیں</a>
          </div>
        </div>
      </section>

      <section id="departments" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-gold mb-8 text-center text-3xl font-bold">شعبہ جات</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((d) => (
            <div key={d.t} className="rounded-xl border bg-card p-5 text-center">
              <div className="text-3xl text-primary">۞</div>
              <h3 className="mt-2 text-xl font-bold">{d.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="news" className="bg-muted/40 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-gold mb-8 text-center text-3xl font-bold">تازہ خبریں</h2>
          <ul className="space-y-3">
            {news.map((n) => (
              <li key={n.t} className="flex items-center gap-4 rounded-lg border bg-card p-4">
                <span className="shrink-0 rounded bg-secondary px-3 text-sm text-secondary-foreground">{n.date}</span>
                <span>{n.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="donate" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="text-gold text-3xl font-bold">عطیات</h2>
        <p className="mt-3 text-muted-foreground">آپ کا تعاون طلبہ کی تعلیم و کفالت میں صدقہ جاریہ ہے۔</p>
        <div className="mt-6 rounded-2xl border-2 border-primary bg-card p-6">
          <p className="text-lg">JazzCash</p>
          <p dir="ltr" className="text-gold font-latin text-3xl font-bold">{JAZZCASH}</p>
          <p className="mt-1 text-sm text-muted-foreground">اکاؤنٹ ٹائٹل: جامعہ ذیشان الاسلام</p>
        </div>
      </section>

      <footer className="border-t bg-card py-8 text-center text-sm text-muted-foreground">
        <img src={logo.url} alt="" className="mx-auto mb-2 h-16 w-16 rounded-full object-cover" />
        <p>© {new Date().getFullYear()} جامعہ ذیشان الاسلام — جملہ حقوق محفوظ ہیں</p>
      </footer>

      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp shadow-lg"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-background"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.1.1.6-.1 1.1Z"/></svg>
      </a>
    </div>
  );
}
