"use client";

import { useState } from "react";

const PHONE_PATTERN = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
const EMAIL_PATTERN = /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/;
const POSTAL_CODE_PATTERN = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
const mediaOptions = [
    "Photography",
    "Videography & Video Editing",
    "Content Creation & Management",
    "Social Media Management",
];

const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Northwest Territories",
    "Nova Scotia",
    "Nunavut",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Yukon",
];

const initialForm = {
    firstName: "",
    middleName: "",
    surname: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    mailingAddress: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Canada",
    membershipTier: "",
    occupation: "",
    primaryLanguages: "",
    facebook: "",
    linkedin: "",
    mediaSkills: [],
    mediaOther: "",
};

function FieldHint({ children }) {
    return (
        <span className="group relative ml-1 inline-flex align-middle">
            <button
                type="button"
                className="flex h-4 w-4 items-center justify-center rounded-full border border-muted text-[11px] font-bold text-muted"
                aria-label="More information"
            >
                ?
            </button>
            <span className="pointer-events-none invisible absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-foreground px-3 py-2 text-left text-xs font-normal leading-relaxed text-white opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {children}
            </span>
        </span>
    );
}

function FieldMessage({ id, message }) {
    if (!message) return null;
    return (
        <p id={id} className="mt-1 text-sm font-semibold text-accent" role="alert">
            {message}
        </p>
    );
}

export default function MembershipForm() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function updateField(event) {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => ({ ...current, [name]: "" }));
        setSubmitted(false);
    }

    function toggleMediaSkill(skill) {
        setForm((current) => ({
            ...current,
            mediaSkills: current.mediaSkills.includes(skill)
                ? current.mediaSkills.filter((item) => item !== skill)
                : [...current.mediaSkills, skill],
        }));
        setSubmitted(false);
    }

    function validate() {
        const nextErrors = {};
        const requiredFields = [
            ["firstName", "First Name is Required."],
            ["surname", "Surname is Required."],
            ["dateOfBirth", "Date of Birth is Required."],
            ["phone", "Phone Number is Required."],
            ["email", "Email Address is Required."],
            ["mailingAddress", "Mailing Address is Required."],
            ["city", "City is Required."],
            ["province", "Province or Territory is Required."],
            ["postalCode", "Postal Code is Required."],
            ["membershipTier", "Please Select a Membership Tier."],
            ["occupation", "Occupation is Required."],
            ["primaryLanguages", "Please enter at least one Primary Language."],
        ];

        requiredFields.forEach(([name, message]) => {
            if (!String(form[name] || "").trim()) nextErrors[name] = message;
        });

        if (form.phone && !PHONE_PATTERN.test(form.phone.trim())) {
            nextErrors.phone = "Enter a valid Phone Number, for example 604-555-0123.";
        }
        if (form.email && !EMAIL_PATTERN.test(form.email.trim())) {
            nextErrors.email = "Enter a valid Email Address.";
        }
        if (form.postalCode && !POSTAL_CODE_PATTERN.test(form.postalCode.trim())) {
            nextErrors.postalCode = "Enter a valid Canadian Postal Code, for example V3W 0Y8.";
        }
        if (form.dateOfBirth) {
            const birthDate = new Date(`${form.dateOfBirth}T00:00:00`);
            const today = new Date();
            const eighteenthBirthday = new Date(
                birthDate.getFullYear() + 18,
                birthDate.getMonth(),
                birthDate.getDate()
            );
            if (Number.isNaN(birthDate.getTime()) || eighteenthBirthday > today) {
                nextErrors.dateOfBirth = "You must be at least 18 years old to apply.";
            }
        }

        return nextErrors;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const nextErrors = validate();
        setErrors(nextErrors);
        setSubmitted(false);

        if (Object.keys(nextErrors).length === 0) {
            setSubmitted(true);
        }
    }

    const fieldClass = (name) =>
        `mt-2 w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 ${errors[name] ? "border-accent" : "border-border-muted"
        }`;

    return (
        <section id="membership-form" aria-labelledby="membership-form-heading" className="mx-auto max-w-[900px] px-6 pb-16 sm:px-12 sm:pb-22">
            <div className="rounded-[28px] border border-border-muted bg-white p-6 sm:p-10">
                <h2 id="membership-form-heading" className="font-display text-[30px] font-extrabold">
                    MLLWS Membership Form
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                    Complete this form to apply for membership with Mother Language Lovers of the World Society.
                    Fields marked with <span className="font-bold text-accent">*</span> are required.
                </p>

                {submitted && (
                    <p className="mt-6 rounded-xl bg-[#EAF3EC] px-4 py-3 font-semibold text-green-dark" role="status">
                        Thank you. Your membership application has been received.
                    </p>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-8">
                    <fieldset className="grid gap-5 sm:grid-cols-2">
                        <legend className="sr-only">Personal information</legend>
                        <label className="text-sm font-semibold">
                            First Name <span className="text-accent">*</span>
                            <input name="firstName" value={form.firstName} onChange={updateField} className={fieldClass("firstName")} autoComplete="given-name" aria-invalid={Boolean(errors.firstName)} aria-describedby="firstName-error" />
                            <FieldMessage id="firstName-error" message={errors.firstName} />
                        </label>
                        <label className="text-sm font-semibold">
                            Middle Name(s)
                            <input name="middleName" value={form.middleName} onChange={updateField} className={fieldClass("middleName")} autoComplete="additional-name" />
                        </label>
                        <label className="text-sm font-semibold">
                            Surname <span className="text-accent">*</span>
                            <input name="surname" value={form.surname} onChange={updateField} className={fieldClass("surname")} autoComplete="family-name" aria-invalid={Boolean(errors.surname)} aria-describedby="surname-error" />
                            <FieldMessage id="surname-error" message={errors.surname} />
                        </label>
                        <label className="text-sm font-semibold">
                            Date of Birth <span className="text-accent">*</span>
                            <FieldHint>We ask for your date of birth to confirm that applicants meet the minimum age requirement.</FieldHint>
                            <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={updateField} className={fieldClass("dateOfBirth")} autoComplete="bday" aria-invalid={Boolean(errors.dateOfBirth)} aria-describedby="dateOfBirth-error" />
                            <FieldMessage id="dateOfBirth-error" message={errors.dateOfBirth} />
                        </label>
                    </fieldset>

                    <fieldset className="grid gap-5 sm:grid-cols-2">
                        <legend className="sr-only">Contact information</legend>
                        <label className="text-sm font-semibold">
                            Phone Number <span className="text-accent">*</span>
                            <FieldHint>We may use your phone number to contact you about your membership application or MLLWS activities.</FieldHint>
                            <input type="tel" name="phone" value={form.phone} onChange={updateField} className={fieldClass("phone")} autoComplete="tel" placeholder="604-555-0123" aria-invalid={Boolean(errors.phone)} aria-describedby="phone-error" />
                            <FieldMessage id="phone-error" message={errors.phone} />
                        </label>
                        <label className="text-sm font-semibold">
                            Email Address <span className="text-accent">*</span>
                            <FieldHint>We use your email to send membership updates and follow up about your application.</FieldHint>
                            <input type="email" name="email" value={form.email} onChange={updateField} className={fieldClass("email")} autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby="email-error" />
                            <FieldMessage id="email-error" message={errors.email} />
                        </label>
                    </fieldset>

                    <fieldset className="grid gap-5 sm:grid-cols-2">
                        <legend className="sr-only">Mailing address</legend>
                        <label className="text-sm font-semibold sm:col-span-2">
                            Mailing Address <span className="text-accent">*</span>
                            <input name="mailingAddress" value={form.mailingAddress} onChange={updateField} className={fieldClass("mailingAddress")} autoComplete="street-address" aria-invalid={Boolean(errors.mailingAddress)} aria-describedby="mailingAddress-error" />
                            <FieldMessage id="mailingAddress-error" message={errors.mailingAddress} />
                        </label>
                        <label className="text-sm font-semibold">
                            City <span className="text-accent">*</span>
                            <input name="city" value={form.city} onChange={updateField} className={fieldClass("city")} autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby="city-error" />
                            <FieldMessage id="city-error" message={errors.city} />
                        </label>
                        <label className="text-sm font-semibold">
                            Province / Territory <span className="text-accent">*</span>
                            <select name="province" value={form.province} onChange={updateField} className={fieldClass("province")} autoComplete="address-level1" aria-invalid={Boolean(errors.province)} aria-describedby="province-error">
                                <option value="">Choose</option>
                                {provinces.map((province) => <option key={province} value={province}>{province}</option>)}
                            </select>
                            <FieldMessage id="province-error" message={errors.province} />
                        </label>
                        <label className="text-sm font-semibold">
                            Post Code <span className="text-accent">*</span>
                            <input name="postalCode" value={form.postalCode} onChange={updateField} className={fieldClass("postalCode")} autoComplete="postal-code" placeholder="V3W 0Y8" maxLength={7} aria-invalid={Boolean(errors.postalCode)} aria-describedby="postalCode-error" />
                            <FieldMessage id="postalCode-error" message={errors.postalCode} />
                        </label>
                        <label className="text-sm font-semibold">
                            Country
                            <input name="country" value={form.country} readOnly disabled className={`${fieldClass("country")} cursor-not-allowed opacity-70`} autoComplete="country-name" />
                        </label>
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-semibold">Which MLLWS Membership Tier are you applying for? <span className="text-accent">*</span></legend>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {[
                                ["Community Supporter", "Community Supporter - Free"],
                                ["General Member", "General Member - $20 / Year"]
                            ].map(([value, label]) => (
                                <label key={value} className="flex items-start gap-3 rounded-xl border border-border-muted p-4 text-sm">
                                    <input type="radio" name="membershipTier" value={value} checked={form.membershipTier === value} onChange={updateField} className="mt-1 h-4 w-4 accent-brand" />
                                    <span>{label}</span>
                                </label>
                            ))}
                        </div>
                        <FieldMessage id="membershipTier-error" message={errors.membershipTier} />
                    </fieldset>

                    <fieldset className="grid gap-5 sm:grid-cols-2">
                        <legend className="sr-only">Additional information</legend>
                        <label className="text-sm font-semibold">
                            Occupation <span className="text-accent">*</span>
                            <input name="occupation" value={form.occupation} onChange={updateField} className={fieldClass("occupation")} aria-invalid={Boolean(errors.occupation)} aria-describedby="occupation-error" />
                            <FieldMessage id="occupation-error" message={errors.occupation} />
                        </label>
                        <label className="text-sm font-semibold">
                            Primary Language(s) Spoken <span className="text-accent">*</span>
                            <FieldHint>This helps us understand and celebrate the languages represented in our membership community.</FieldHint>
                            <input name="primaryLanguages" value={form.primaryLanguages} onChange={updateField} className={fieldClass("primaryLanguages")} placeholder="Separate multiple languages with commas" aria-invalid={Boolean(errors.primaryLanguages)} aria-describedby="primaryLanguages-error" />
                            <FieldMessage id="primaryLanguages-error" message={errors.primaryLanguages} />
                        </label>
                        <label className="text-sm font-semibold">
                            Facebook Profile Link
                            <input type="url" name="facebook" value={form.facebook} onChange={updateField} className={fieldClass("facebook")} autoComplete="url" />
                        </label>
                        <label className="text-sm font-semibold">
                            LinkedIn Profile Link
                            <input type="url" name="linkedin" value={form.linkedin} onChange={updateField} className={fieldClass("linkedin")} autoComplete="url" />
                        </label>
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-semibold">
                            Are you passionate about media, storytelling, or digital outreach?
                            <FieldHint>These skills help MLLWS document events, share community stories, and grow our digital presence.</FieldHint>
                        </legend>
                        <p className="mt-2 text-sm text-muted">
                            We are looking for talented individuals to help grow our digital presence and document our journey.
                        </p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {mediaOptions.map((skill) => (
                                <label key={skill} className="flex items-center gap-3 rounded-xl border border-border-muted p-4 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={form.mediaSkills.includes(skill)}
                                        onChange={() => toggleMediaSkill(skill)}
                                        className="h-4 w-4 accent-brand"
                                    />
                                    <span>{skill}</span>
                                </label>
                            ))}
                            <label className="flex items-center gap-3 rounded-xl border border-border-muted p-4 text-sm sm:col-span-2">
                                <input
                                    type="checkbox"
                                    checked={form.mediaSkills.includes("Other")}
                                    onChange={() => toggleMediaSkill("Other")}
                                    className="h-4 w-4 accent-brand"
                                />
                                <span>Other:</span>
                                <input
                                    name="mediaOther"
                                    value={form.mediaOther}
                                    onChange={updateField}
                                    className="min-w-0 flex-1 border-0 border-b border-dashed border-muted bg-transparent px-1 py-1 text-sm outline-none focus:border-brand"
                                    aria-label="Other media or digital outreach skill"
                                />
                            </label>
                        </div>
                    </fieldset>

                    <button type="submit" className="rounded-full bg-foreground px-7 py-3.5 font-bold text-white transition hover:scale-105">
                        Submit Application
                    </button>
                </form>
            </div>
        </section>
    );
}
