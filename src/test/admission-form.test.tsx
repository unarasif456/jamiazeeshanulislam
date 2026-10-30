import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AdmissionForm } from "@/components/admission-form";

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

describe("Admission form", () => {
  it("refuses an empty request and names the missing fields", () => {
    render(<AdmissionForm whatsapp="923000000000" />);
    submit();
    expect(screen.getByText("نام کم از کم دو حروف لکھیں")).toBeInTheDocument();
    expect(screen.getByText("شعبہ منتخب کریں")).toBeInTheDocument();
    expect(screen.queryByText("جزاک اللہ خیرًا")).not.toBeInTheDocument();
  });

  it("rejects a phone number that is not a valid Pakistani mobile", () => {
    render(<AdmissionForm whatsapp="923000000000" />);
    fill({ phone: "0300123" });
    submit();
    expect(screen.getByText(/فون نمبر درست نہیں/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /وٹس ایپ پر درخواست بھیجیں/ })).not.toBeInTheDocument();
  });

  it("rejects a date of birth in the future", () => {
    render(<AdmissionForm whatsapp="923000000000" />);
    fill({ dob: "2099-01-01" });
    submit();
    expect(screen.getByText("تاریخ پیدائش درست نہیں")).toBeInTheDocument();
    expect(screen.queryByText("جزاک اللہ خیرًا")).not.toBeInTheDocument();
  });

  it("accepts a complete request and offers it on WhatsApp with the number normalised", () => {
    render(<AdmissionForm whatsapp="923000000000" />);
    fill();
    submit();
    expect(screen.getByText("جزاک اللہ خیرًا")).toBeInTheDocument();
    expect(screen.getByText("محمد احمد")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /وٹس ایپ پر درخواست بھیجیں/ })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me/923001234567"),
    );
  });
});
