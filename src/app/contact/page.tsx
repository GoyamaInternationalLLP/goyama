// App Router – if you’re using Pages Router, drop this in pages/contact.
import ContactForm from "../../../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded shadow">
        <ContactForm />
      </div>
    </main>
  );
}
