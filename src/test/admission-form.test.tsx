import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AdmissionForm } from "@/components/admission-form";

const WHATSAPP = "923152834384";

const VALID = {
  name: "محمد احمد",
  father: "مولوی کریم",
  phone: "0300-123-4567",
  dob: "2012-04-05",
  dept: "حفظ القرآن",
  city: "لاہور",
  prev: "",
};

function fill(overrides: Partial<typeof VALID> = {}) {
  const values = { ...VALID, ...overrides };
  for (const [id, value] of Object.entries(values)) {
    const el = document.getElementById(id);
    if (el) fireEvent.change(el, { target: { value } });
  }
}

function submit() {
  fireEvent.click(screen.getByRole("button", { name: "درخواست تیار کریں" }));
}

beforeEach(() => {
  vi.spyOn(window, "open").mockImplementation(() => null);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Admission form", () => {
  it("refuses an empty request and names the missing fields", () => {
    render(<AdmissionForm whatsapp={WHATSAPP} />);
    submit();
    expect(screen.getByText("نام کم از کم دو حروف لکھیں")).toBeInTheDocument();
    expect(screen.getByText("شعبہ منتخب کریں")).toBeInTheDocument();
    expect(screen.queryByText("جزاک اللہ خیرًا")).not.toBeInTheDocument();
    expect(window.open).not.toHaveBeenCalled();
  });

  it("rejects a phone number that is not a valid Pakistani mobile", () => {
    render(<AdmissionForm whatsapp={WHATSAPP} />);
    fill({ phone: "0300123" });
    submit();
    expect(screen.getByText(/فون نمبر درست نہیں/)).toBeInTheDocument();
    expect(window.open).not.toHaveBeenCalled();
  });

  it("rejects a date of birth in the future", () => {
    render(<AdmissionForm whatsapp={WHATSAPP} />);
    fill({ dob: "2099-01-01" });
    submit();
    expect(screen.getByText("تاریخ پیدائش درست نہیں")).toBeInTheDocument();
    expect(window.open).not.toHaveBeenCalled();
  });

  it("opens WhatsApp on the madrasa number with the admission message on submit", () => {
    render(<AdmissionForm whatsapp={WHATSAPP} />);
    fill();
    submit();
    expect(window.open).toHaveBeenCalledTimes(1);
    const [url, target] = vi.mocked(window.open).mock.calls[0] as [string, string];
    expect(url).toContain(`wa.me/${WHATSAPP}`);
    expect(target).toBe("_blank");
    const text = decodeURIComponent(url.split("text=")[1] ?? "");
    expect(text).toBe(
      "New Admission - Name: محمد احمد, Course: حفظ القرآن, Phone: 0300-123-4567",
    );
  });

  it("shows the success message on the website after a valid submit", () => {
    render(<AdmissionForm whatsapp={WHATSAPP} />);
    fill();
    submit();
    expect(screen.getByText("جزاک اللہ خیرًا")).toBeInTheDocument();
    expect(screen.getByText("محمد احمد")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /وٹس ایپ دوبارہ کھولیں/ }),
    ).toHaveAttribute("href", expect.stringContaining(`wa.me/${WHATSAPP}`));
  });
});
