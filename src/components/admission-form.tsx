import { useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";

type Field = "name" | "father" | "phone" | "city" | "dob" | "dept" | "prev";

const LABELS: Record<Field, string> = {
  name: "طلبہ کا نام",
  father: "والد / سرپرست کا نام",
  phone: "فون نمبر",
  city: "شہر یا رہائشی پتہ",
  dob: "تاریخ پیدائش",
  dept: "شعبہ",
  prev: "پچھلی تعلیم (اختیاری)",
};

const DEPTS = ["حفظ القرآن", "ناظرہ قرآن", "درسِ نظامی", "تجوید و قراءت"];

const EMPTY: Record<Field, string> = {
  name: "",
  father: "",
  phone: "",
  city: "",
  dob: "",
  dept: "",
  prev: "",
};

/** صرف ہندسے، اور 00 کی جگہ 0 — پاکستانی نمبر یکساں شکل میں لانے کے لیے */
function digits(v: string) {
  const d = v.replace(/\D/g, "");
  return d.startsWith("00") ? "0" + d.slice(2) : d;
}

function phoneOk(v: string) {
  return /^(92|0)?3\d{9}$/.test(digits(v));
}

function dobOk(v: string) {
  const d = new Date(v + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  if (d > now) return false;
  const oldest = new Date(now);
  oldest.setFullYear(now.getFullYear() - 60);
  return d >= oldest;
}

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "نام کم از کم دو حروف لکھیں")
    .max(60, "نام 60 حروف سے زیادہ نہیں ہو سکتا"),
  father: z
    .string()
    .trim()
    .min(2, "والد یا سرپرست کا نام لکھیں")
    .max(60, "نام 60 حروف سے زیادہ نہیں ہو سکتا"),
  phone: z
    .string()
    .trim()
    .min(1, "فون نمبر لکھیں")
    .refine(phoneOk, "فون نمبر درست نہیں (مثال: 03001234567)"),
  city: z
    .string()
    .trim()
    .min(2, "شہر یا پتہ لکھیں")
    .max(120, "پتہ 120 حروف سے زیادہ نہیں ہو سکتا"),
  dob: z
    .string()
    .min(1, "تاریخ پیدائش منتخب کریں")
    .refine(dobOk, "تاریخ پیدائش درست نہیں"),
  dept: z.string().min(1, "شعبہ منتخب کریں"),
  prev: z
    .string()
    .trim()
    .max(300, "تفصیل 300 حروف تک محدود رکھیں")
    .optional(),
});

const fieldCls =
  "w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40";

function Row({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: Field;
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm text-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function AdmissionForm({ whatsapp }: { whatsapp: string }) {
  const [form, setForm] = useState<Record<Field, string>>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [done, setDone] = useState(false);

  const set = (k: Field) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of r.error.issues) {
        const k = String(issue.path[0]) as Field;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      setDone(false);
      return;
    }
    setErrors({});
    setDone(true);
    window.open(waHref(), "_blank", "noopener,noreferrer");
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setDone(false);
  };

  const waHref = () => {
    const text = `New Admission - Name: ${form.name}, Course: ${form.dept}, Phone: ${form.phone}`;
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
  };

  if (done) {
    const rows: [string, string][] = [
      ["طلبہ کا نام", form.name],
      ["والد / سرپرست", form.father],
      ["شعبہ", form.dept],
      ["فون نمبر", form.phone],
      ["شہر / پتہ", form.city],
      ["تاریخ پیدائش", form.dob],
      ["پچھلی تعلیم", form.prev || "—"],
    ];
    return (
      <div className="rounded-2xl border-2 border-primary bg-card p-6 text-center">
        <div className="text-gold text-2xl font-bold">جزاک اللہ خیرًا</div>
        <p className="mt-2 text-muted-foreground">
          آپ کی درخواست تیار ہے۔ تصدیق کے لیے اسے وٹس ایپ پر بھیج دیں یا جامعہ آ کر
          دستاویزات جمع کروائیں۔
        </p>
        <ul className="mt-5 space-y-2 text-right">
          {rows.map(([k, v]) => (
            <li
              key={k}
              className="flex flex-wrap items-baseline justify-between gap-x-4 rounded-lg border bg-background px-4 py-1"
            >
              <span className="text-sm text-muted-foreground">{k}</span>
              <span className="text-foreground">{v}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={waHref()}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-whatsapp px-5 py-2 font-bold text-whatsapp-foreground"
          >
            وٹس ایپ پر درخواست بھیجیں
          </a>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-input px-5 py-2 text-foreground transition hover:bg-accent"
          >
            نیا فارم
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border bg-card">
      <div className="bg-gold h-1 rounded-t-2xl" />
      <div className="p-5 sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <Row id="name" label={LABELS.name} error={errors.name}>
            <input
              id="name"
              className={fieldCls}
              value={form.name}
              onChange={(e) => set("name")(e.target.value)}
              placeholder="مثلاً: محمد احمد"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </Row>
          <Row id="father" label={LABELS.father} error={errors.father}>
            <input
              id="father"
              className={fieldCls}
              value={form.father}
              onChange={(e) => set("father")(e.target.value)}
              placeholder="مثلاً: مولوی کریم دہلوی"
              aria-invalid={!!errors.father}
              aria-describedby={errors.father ? "father-error" : undefined}
            />
          </Row>
          <Row id="phone" label={LABELS.phone} error={errors.phone} hint="مثال: 03001234567">
            <input
              id="phone"
              type="tel"
              dir="ltr"
              className={`${fieldCls} text-right`}
              value={form.phone}
              onChange={(e) => set("phone")(e.target.value)}
              placeholder="03001234567"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </Row>
          <Row id="dob" label={LABELS.dob} error={errors.dob}>
            <input
              id="dob"
              type="date"
              dir="ltr"
              className={fieldCls}
              value={form.dob}
              onChange={(e) => set("dob")(e.target.value)}
              aria-invalid={!!errors.dob}
              aria-describedby={errors.dob ? "dob-error" : undefined}
            />
          </Row>
          <Row id="dept" label={LABELS.dept} error={errors.dept}>
            <select
              id="dept"
              className={fieldCls}
              value={form.dept}
              onChange={(e) => set("dept")(e.target.value)}
              aria-invalid={!!errors.dept}
              aria-describedby={errors.dept ? "dept-error" : undefined}
            >
              <option value="">— شعبہ منتخب کریں —</option>
              {DEPTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Row>
          <Row id="city" label={LABELS.city} error={errors.city}>
            <input
              id="city"
              className={fieldCls}
              value={form.city}
              onChange={(e) => set("city")(e.target.value)}
              placeholder="شہر، گلی، مکان نمبر"
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "city-error" : undefined}
            />
          </Row>
        </div>
        <div className="mt-4">
          <Row id="prev" label={LABELS.prev} error={errors.prev} hint="پچھلی جماعت، مدرسہ یا اسناد کا مختصر ذکر">
            <textarea
              id="prev"
              rows={3}
              className={fieldCls}
              value={form.prev}
              onChange={(e) => set("prev")(e.target.value)}
              placeholder="مثلاً: پانچویں جماعت تک پڑھا، قرآن پاک ناظرہ پڑھ رکھا ہے۔"
              aria-invalid={!!errors.prev}
              aria-describedby={errors.prev ? "prev-error" : undefined}
            />
          </Row>
        </div>
        <button
          type="submit"
          className="bg-gold mt-6 w-full rounded-full px-6 py-3 text-lg font-bold text-primary-foreground transition hover:opacity-95"
        >
          درخواست تیار کریں
        </button>
      </div>
    </form>
  );
}
