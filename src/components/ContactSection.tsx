import { Send } from "lucide-react";
import { type CSSProperties, type ChangeEvent, type ComponentPropsWithoutRef, useEffect, useState } from "react";
import { siDailydotdev, siDevdotto, siHashnode, siJuejin, siX } from "simple-icons";

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

const socialLinks = [
  { label: "Juejin", href: "https://juejin.cn/user/289926798641176", icon: siJuejin, brandColor: `#${siJuejin.hex}` },
  { label: "daily.dev", href: "https://app.daily.dev/wkylin", icon: siDailydotdev, brandColor: `#${siDailydotdev.hex}` },
  { label: "Dev.to", href: "https://dev.to/wkylin", icon: siDevdotto, brandColor: `#${siDevdotto.hex}`, isDarkBrand: true },
  { label: "X", href: "https://x.com/wkylin", icon: siX, brandColor: `#${siX.hex}`, isDarkBrand: true },
  { label: "Medium", href: "https://medium.com/@wkylin.w", brandColor: "#000000", customIcon: "medium", isDarkBrand: true },
  { label: "Hashnode", href: "https://hashnode.com/wkylin", icon: siHashnode, brandColor: `#${siHashnode.hex}` },
  { label: "CodePen", href: "https://codepen.io/wkylin", brandColor: "#26c6da", customIcon: "codepen" },
];

type BrandIconProps = {
  path: string;
  title: string;
};

function BrandIcon({ path, title }: BrandIconProps) {
  return (
    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" role="img" aria-label={title} focusable="false">
      <path fill="currentColor" d={path} />
    </svg>
  );
}

function CodePenIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 32 32" role="img" aria-label="CodePen" focusable="false">
      <path
        fill="currentColor"
        d="m8.303 19.008 7.313 4.876c.249.153.516.155.768 0l7.313-4.876c.187-.125.303-.348.303-.571v-4.875c0-.223-.116-.447-.303-.571l-7.313-4.875c-.249-.153-.516-.155-.768 0l-7.313 4.875c-.187.124-.303.348-.303.571v4.875c0 .223.116.446.303.571zm7.01 3.019-5.384-3.589 2.402-1.607 2.982 1.991zm1.374 0v-3.205l2.982-1.991 2.402 1.607zm5.938-4.876-1.723-1.151 1.723-1.152zm-5.938-7.178 5.384 3.589-2.402 1.607-2.982-1.991zm-.687 4.401 2.429 1.625-2.429 1.626-2.429-1.625zm-.687-4.401v3.205l-2.982 1.991-2.402-1.607zm-5.938 4.876 1.724 1.151-1.723 1.152v-2.303z"
      />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 1043.63 592.71" role="img" aria-label="Medium" focusable="false">
      <path
        fill="currentColor"
        d="M588.67 296.35c0 163.66-131.77 296.35-294.33 296.35S0 460.01 0 296.35 131.77 0 294.34 0s294.33 132.69 294.33 296.35zm322.89 0c0 154.06-65.89 278.96-147.18 278.96S617.2 450.41 617.2 296.35 683.09 17.39 764.38 17.39s147.18 124.9 147.18 278.96zm132.07 0c0 138-23.17 249.88-51.76 249.88s-51.76-111.88-51.76-249.88S963.28 46.47 991.87 46.47s51.76 111.88 51.76 249.88z"
      />
    </svg>
  );
}

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
        <div className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">线上足迹</p>
          <div className="mt-3 flex flex-wrap gap-2.5" aria-label="社交平台链接">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                className="social-icon-link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                data-tooltip={item.label}
                data-dark-brand={item.isDarkBrand ? "true" : undefined}
                style={{ "--brand-color": item.brandColor } as CSSProperties}
              >
                {item.customIcon === "codepen" ? <CodePenIcon /> : item.customIcon === "medium" ? <MediumIcon /> : item.icon && <BrandIcon path={item.icon.path} title={item.label} />}
              </a>
            ))}
          </div>
        </div>
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
