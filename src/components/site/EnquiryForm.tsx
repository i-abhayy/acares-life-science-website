import { useState, type FormEvent } from "react";
import { AlertCircle, Info, Send } from "lucide-react";
import { COMPANY } from "@/lib/site";

type Field = { name: string; label: string; type?: string; required?: boolean; options?: string[]; textarea?: boolean; wide?: boolean };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function EnquiryForm({ fields, submitLabel = "Send enquiry", defaults = {} }: { fields: Field[]; submitLabel?: string; defaults?: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(defaults);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const v = (values[f.name] ?? "").trim();
      if (f.required && !v) e[f.name] = `${f.label} is required.`;
      else if (f.type === "email" && v && !EMAIL.test(v)) e[f.name] = "Please enter a valid email address.";
      else if (f.type === "tel" && v && !/^[+\d\s-]{7,15}$/.test(v)) e[f.name] = "Please enter a valid phone number.";
      else if (v.length > (f.textarea ? 2000 : 150)) e[f.name] = `${f.label} is too long.`;
    }
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    setDone(Object.keys(e).length === 0);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => {
        const id = `f-${f.name}`;
        const err = errors[f.name];
        const common = {
          id, name: f.name, value: values[f.name] ?? "", "aria-invalid": !!err, "aria-describedby": err ? `${id}-err` : undefined,
          onChange: (e: { target: { value: string } }) => { setValues((s) => ({ ...s, [f.name]: e.target.value })); setDone(false); },
          className: "field",
        };
        return (
          <div key={f.name} className={f.textarea || f.wide ? "sm:col-span-2" : ""}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
              {f.label} {f.required ? <span className="text-destructive">*</span> : <span className="font-normal text-muted-foreground">(optional)</span>}
            </label>
            {f.options ? (
              <select {...common}>
                <option value="">Select…</option>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.textarea ? (
              <textarea {...common} rows={5} />
            ) : (
              <input {...common} type={f.type ?? "text"} />
            )}
            {err && <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive"><AlertCircle className="h-4 w-4" />{err}</p>}
          </div>
        );
      })}
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary"><Send className="h-4 w-4" />{submitLabel}</button>
      </div>
      {done && (
        <div role="status" className="flex gap-3 rounded-xl border border-cyan/40 bg-ice p-4 text-sm sm:col-span-2">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p>
            Thank you — your details look complete. <strong>Online sending is not connected yet</strong>, so this message has not been delivered.
            Please call us on <a className="font-semibold text-primary underline" href={`tel:+91${COMPANY.phone}`}>{COMPANY.phone}</a> in the meantime.
          </p>
        </div>
      )}
    </form>
  );
}
