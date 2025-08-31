import ContactsSection from "@/components/admin/ContactsSection";
import { fetchContacts } from "@/lib/api";

const ContactUsReqsPage = async () => {
  const contacts = await fetchContacts();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Us Requests</h1>
          <p className="text-gray-600">View all contact requests</p>
        </div>
      </div>
      {contacts.length === 0 ? (
        <div className="mt-4 text-gray-600">No contact requests found</div>
      ) : (
        <ContactsSection contacts={contacts} />
      )}
    </div>
  );
};

export default ContactUsReqsPage;
