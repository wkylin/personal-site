import { Send } from "lucide-react";
import { type ChangeEvent, type ComponentPropsWithoutRef, useEffect, useState } from "react";

const contactEmail = "wkylin.w@gmail.com";
const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "44b28ec2-e0a1-459a-8e3b-06869186889b";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validateForm(formData: ContactFormData) {
  const errors: ContactFormErrors = {};

  if (!formData.name.trim()) {
    errors.name = "请输入你的姓名";
  }

  if (!formData.email.trim()) {
    errors.email = "请输入你的邮箱";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "请输入有效的邮箱地址";
  }

  if (!formData.subject.trim()) {
    errors.subject = "请输入邮件主题";
  }

  if (!formData.message.trim()) {
    errors.message = "请输入留言内容";
  }

  return errors;
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [buttonText, setButtonText] = useState("发送邮件");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  useEffect(() => {
    if (!isCoolingDown) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsCoolingDown(false);
      setButtonText("发送邮件");
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [isCoolingDown]);

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setErrors({});
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [errors]);

  const clearErrors = () => {
    setErrors({});
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.dataset.field as keyof ContactFormData | undefined;

    if (!field) {
      return;
    }

    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleSubmit: NonNullable<ComponentPropsWithoutRef<"form">["onSubmit"]> = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setButtonText("请先补全信息");
      setIsCoolingDown(true);
      return;
    }

    setIsSubmitting(true);
    setButtonText("发送中...");

    const form = new FormData();
    form.append("access_key", web3FormsAccessKey);
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("subject", formData.subject);
    form.append("message", formData.message);
    form.append("from_name", "WKylin.cn Contact Form");
    form.append("replyto", formData.email);
    form.append("botcheck", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "邮件发送失败，请稍后再试。");
      }

      setFormData(initialFormData);
      setErrors({});
      setButtonText("发送成功");
    } catch (error) {
      setButtonText(error instanceof Error ? "发送失败" : "发送失败");
    } finally {
      setIsSubmitting(false);
      setIsCoolingDown(true);
    }
  };

  const fieldClassName = (field: keyof ContactFormData) =>
    `w-full rounded-none border px-3 py-2.5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 ${
      errors[field]
        ? "border-red-400/70 bg-red-950/20 focus:border-red-300"
        : "border-white/10 bg-white/5 focus:border-cyan-300/70 focus:bg-cyan-200/8"
    }`;

  return (
    <section id="contact" className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="reveal rounded-none border border-cyan-200/20 bg-slate-950/75 p-5" data-reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Direct Contact</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">直接发送项目合作与技术交流邮件</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          表单会通过服务接口直接投递到 {contactEmail}，适合沟通前端架构、工程治理、技术顾问、项目合作或团队建设相关话题。
        </p>
      </div>

      <form
        className="reveal rounded-none border border-white/10 bg-slate-900/65 p-5"
        data-reveal
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
      >
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="relative block pb-4">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Name</span>
            <input
              className={`mt-2 ${fieldClassName("name")}`}
              name="contact_person"
              data-field="name"
              autoComplete="new-password"
              data-lpignore="true"
              data-form-type="other"
              placeholder="你的姓名"
              value={formData.name}
              onChange={handleInputChange}
              onFocus={clearErrors}
            />
            {errors.name && <span className="absolute bottom-0 left-0 text-xs leading-3 text-red-300">{errors.name}</span>}
          </label>

          <label className="relative block pb-4">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Email</span>
            <input
              className={`mt-2 ${fieldClassName("email")}`}
              name="contact_reply"
              type="text"
              inputMode="email"
              data-field="email"
              autoComplete="new-password"
              data-lpignore="true"
              data-form-type="other"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={clearErrors}
            />
            {errors.email && <span className="absolute bottom-0 left-0 text-xs leading-3 text-red-300">{errors.email}</span>}
          </label>
        </div>

        <label className="relative mt-1 block pb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Subject</span>
          <input
            className={`mt-2 ${fieldClassName("subject")}`}
            name="contact_topic"
            data-field="subject"
            autoComplete="new-password"
            data-lpignore="true"
            data-form-type="other"
            placeholder="想沟通的主题"
            value={formData.subject}
            onChange={handleInputChange}
            onFocus={clearErrors}
          />
          {errors.subject && <span className="absolute bottom-0 left-0 text-xs leading-3 text-red-300">{errors.subject}</span>}
        </label>

        <label className="relative mt-1 block pb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Message</span>
          <textarea
            className={`mt-2 min-h-32 resize-y ${fieldClassName("message")}`}
            name="contact_content"
            data-field="message"
            autoComplete="new-password"
            data-lpignore="true"
            data-form-type="other"
            placeholder="请简单说明你的需求、背景或希望讨论的问题"
            value={formData.message}
            onChange={handleInputChange}
            onFocus={clearErrors}
          />
          {errors.message && <span className="absolute bottom-0 left-0 text-xs leading-3 text-red-300">{errors.message}</span>}
        </label>

        <button
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-none border border-cyan-300/50 bg-cyan-200 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-px hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isSubmitting || isCoolingDown}
        >
          {buttonText}
          <Send className={isSubmitting ? "h-4 w-4 animate-pulse" : "h-4 w-4"} />
        </button>
      </form>
    </section>
  );
}
