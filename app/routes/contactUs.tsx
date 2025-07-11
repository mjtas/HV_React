import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botField: '' // Honeypot field
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formPayload = new URLSearchParams();
      formPayload.append('form-name', 'contact');
      formPayload.append('bot-field', ''); // Add empty honeypot value
      
      // Append all form fields including honeypot
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });

      await fetch('/', {  // Submit to root path
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formPayload.toString(),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error submitting form. Please email us directly at bonnie@hiddenvalleyworkshops.com.au');
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-green-50 rounded-lg border border-green-200">
        <h1 className="text-3xl font-bold text-center mb-4">Hidden Valley</h1>
        <h2 className="text-2xl font-semibold text-center mb-8">Contact Us</h2>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Thank You!</h3>
          <p className="text-gray-700">
            Your message has been sent successfully. We'll get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-light font-serif text-green-600 mb-4">Hidden Valley</h1>
          <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-700">Contact Us</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Contact Form */}
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Questions about our workshops?</h3>
            
            <form 
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />
              
              {/* Honeypot field */}
              <div className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" onChange={handleChange} />
                </label>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your enquiry:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
              >
                Send Message
              </button>
            </form>
            
            <div className="mt-8 space-y-2">
              <p className="font-medium">Phone: 0456 855 652</p>
              <p className="font-medium">Email: bonnie@hiddenvalleyworkshops.com.au</p>
            </div>
          </div>

          {/* Right Column - Information */}
        <div className="md:w-1/2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Where is Hidden Valley?</h3>
            <p className="text-gray-700">
              Workshops are held at <a 
                        href="https://www.google.com/maps/place/Hidden+Valley+Workshops/@-41.6754289,146.7329156,16z/data=!4m8!3m7!1s0xaa7a7f46ea2c43c9:0x17c2d0a271e41b89!8m2!3d-41.6777528!4d146.7364454!9m1!1b1!16s%2Fg%2F11vsg8njlw?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 cursor-pointer"
                      >
                        12361 Highland Lakes Road Golden Valley
                      </a>, which is only 20 minutes from Deloraine, an hour from Devonport or Launceston, and 2 hours from Hobart on the Great Lakes touring route.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">What should I bring?</h3>
            <p className="text-gray-700">
              At 750 metres above sea level, Hidden Valley is 3-5°C colder than Deloraine. 
              Bring warm layers all year round, and sun protection in summer.  
              For building workshops, tie long hair back and avoid loose clothing.  All tools and safety equipment are provided but you are welcome to bring your own gloves, safety glasses and earmuffs if you like.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Child Entry</h3>
            <p className="text-gray-700">
            We advise that, unless marked child-friendly, our workshops are only suitable for 12 years and up. 
            All attendees must have a valid ticket.  'Bring a Friend' tickets allow two people to attend at a discounted price.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Refund Policy</h3>
            <p className="text-gray-700">
            We may cancel workshops due to low registration or unforeseen circumstances. You'll receive a full refund or alternative workshop. 
            In case of severe weather, we'll schedule a replacement date. If unavailable, you'll receive a gift voucher.  
            There are no refunds for change of mind cancellations, but gift vouchers may be issued on a case-by-case basis.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactForm;