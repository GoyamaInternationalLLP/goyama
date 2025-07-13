"use client";

import React, { useState } from "react";

type FormData = {
  companyName: string;
  firstName: string;
  lastName: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  comments: string;
  customerTypes: string[];
  otherCustomerType: string;
  productInterests: string[];
  otherProductInterest: string;
  hearAbout: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    firstName: "",
    lastName: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
    comments: "",
    customerTypes: [],
    otherCustomerType: "",
    productInterests: [],
    otherProductInterest: "",
    hearAbout: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | boolean>(null);

  const isFormValid =
    formData.companyName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.country.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.zipCode.trim() !== "" &&
    formData.customerTypes.length > 0 &&
    formData.productInterests.length > 0;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.currentTarget;
    const checked = (e.currentTarget as HTMLInputElement).checked;

    if (type === "checkbox") {
      const key = name as "customerTypes" | "productInterests";
      setFormData((prev) => {
        const list = prev[key];
        const updated = checked
          ? [...list, value]
          : list.filter((item) => item !== value);
        return { ...prev, [key]: updated } as FormData;
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value } as FormData));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Network error");
      setSuccess(true);
      setFormData({
        companyName: "",
        firstName: "",
        lastName: "",
        street: "",
        apt: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        phone: "",
        email: "",
        website: "",
        comments: "",
        customerTypes: [],
        otherCustomerType: "",
        productInterests: [],
        otherProductInterest: "",
        hearAbout: "",
      });
    } catch {
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold underline text-center">Contact Us</h1>
      <p className="text-gray-600">
        We are pleased you are interested in learning more about our products….
      </p>

      {/* Personal & Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block font-medium">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        {/* First & Last Name */}
        <div className="flex gap-2">
          <div className="w-1/2">
            <label htmlFor="firstName" className="block font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="lastName" className="block font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border rounded p-2 w-full"
              required
            />
          </div>
        </div>
        {/* Street & Apt */}
        <div>
          <label htmlFor="street" className="block font-medium">
            Street Address
          </label>
          <input
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street Address"
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="apt" className="block font-medium">
            Apt, Suite, etc.
          </label>
          <input
            id="apt"
            name="apt"
            value={formData.apt}
            onChange={handleChange}
            placeholder="Apt, Suite, etc."
            className="border rounded p-2 w-full"
          />
        </div>
        {/* City */}
        <div>
          <label htmlFor="city" className="block font-medium">
            City <span className="text-red-500">*</span>
          </label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        {/* State */}
        <div>
          <label htmlFor="state" className="block font-medium">
            State
          </label>
          <input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        {/* Zip Code */}
        <div>
          <label htmlFor="zipCode" className="block font-medium">
            Zip Code <span className="text-red-500">*</span>
          </label>
          <input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        {/* Country */}
        <div>
          <label htmlFor="country" className="block font-medium">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-medium">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border rounded p-2 w-full"
            required
          />
        </div>
        {/* Website */}
        <div>
          <label htmlFor="website" className="block font-medium">
            Website
          </label>
          <input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website"
            className="border rounded p-2 w-full"
          />
        </div>
      </div>
      {/* Comments */}
      <div>
        <label htmlFor="comments" className="block font-medium">
          Comments
        </label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Comments"
          className="border rounded p-2 w-full h-32"
        />
      </div>
      {/* Customer Type */}
      <fieldset className="space-y-2">
        <legend className="font-semibold">
          Customer Type <span className="text-red-500">*</span>
        </legend>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            "Distributor",
            "Contractor",
            "Flooring Retailer",
            "Architect",
            "Designer",
            "HomeOwner",
            "Kitchen/Bath Dealer",
            "Other",
          ].map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                name="customerTypes"
                value={type}
                checked={formData.customerTypes.includes(type)}
                onChange={handleChange}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
        {formData.customerTypes.includes("Other") && (
          <input
            name="otherCustomerType"
            value={formData.otherCustomerType}
            onChange={handleChange}
            placeholder="Please specify"
            className="border rounded p-2 w-full mt-2"
          />
        )}
      </fieldset>
      {/* Product Interests */}
      <fieldset className="space-y-2">
        <legend className="font-semibold">
          Product Interests <span className="text-red-500">*</span>
        </legend>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            "Cement",
            "Flooring",
            "Lighting",
            "Accessories",
            "Marble",
            "Granite",
            "Mosaic",
            "Other",
          ].map((prod) => (
            <label key={prod} className="flex items-center">
              <input
                type="checkbox"
                name="productInterests"
                value={prod}
                checked={formData.productInterests.includes(prod)}
                onChange={handleChange}
                className="mr-2"
              />
              {prod}
            </label>
          ))}
        </div>
        {formData.productInterests.includes("Other") && (
          <input
            name="otherProductInterest"
            value={formData.otherProductInterest}
            onChange={handleChange}
            placeholder="Please specify"
            className="border rounded p-2 w-full mt-2"
          />
        )}
      </fieldset>
      {/* How did you hear about us? */}
      <div>
        <label htmlFor="hearAbout" className="block font-semibold mb-1">
          How did you hear about us?
        </label>
        <select
          id="hearAbout"
          name="hearAbout"
          value={formData.hearAbout}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">Select one</option>
          <option>Website</option>
          <option>Social Media</option>
          <option>Email Newsletter</option>
          <option>Friend/Family</option>
          <option>Search Engine</option>
        </select>
      </div>
      {/* Submit */}
      <button
        type="submit"
        disabled={submitting || !isFormValid}
        className={`w-full py-3 ${
          isFormValid ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-300"
        } text-white font-semibold rounded disabled:opacity-50`}
      >
        {submitting ? "Submitting…" : "Submit"}
      </button>
      {success === true && (
        <p className="text-green-600 pt-4">
          Thank you! We’ll be in touch soon.
        </p>
      )}
      {success === false && (
        <p className="text-red-600 pt-4">
          Oops, something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
