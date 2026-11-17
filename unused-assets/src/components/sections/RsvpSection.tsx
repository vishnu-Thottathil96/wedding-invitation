import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, User, Phone, Users, MessageSquare } from 'lucide-react';
import { GoldenDivider } from '../ui/OrnateFlourish';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  guestCount: number;
  attendance: string;
  dietary: string;
  message: string;
}

export const RsvpSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    guestCount: 2,
    attendance: 'all',
    dietary: 'traditional-veg',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuestChange = (count: number) => {
    setFormData((prev) => ({ ...prev, guestCount: count }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your name and contact phone number.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate submission with golden confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      guestCount: 2,
      attendance: 'all',
      dietary: 'traditional-veg',
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="rsvp" className="relative py-24 sm:py-32 px-4 bg-[#221410] text-[#FAF5EB] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(84,17,29,0.35)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <GoldenDivider
          subtitle="Be Our Guest"
          title="RSVP &amp; Blessings"
          className="mb-14 sm:mb-20"
        />

        <p className="max-w-xl mx-auto text-center font-serif italic text-base sm:text-lg text-[#F3E9D7]/85 mb-12 -mt-8 font-light">
          “Your gracious presence and heartfelt blessings will complete our celebrations. Kindly let us know if you can join us.”
        </p>

        {/* ── RSVP Card ── */}
        <div className="relative rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-br from-[#3E0B13]/95 via-[#29060B]/95 to-[#1A0508] border border-[#D4AF37]/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-900/60 border border-red-500/50 text-red-200 text-xs text-center font-sans">
                    {errorMessage}
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block font-cinzel text-xs tracking-wider uppercase text-[#F6E29F] mb-2"
                  >
                    Guest Name(s) *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Sundaram &amp; Family"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#221410]/80 border border-[#D4AF37]/35 text-[#FAF5EB] placeholder-[#FAF5EB]/35 text-sm font-sans focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-cinzel text-xs tracking-wider uppercase text-[#F6E29F] mb-2"
                    >
                      Phone / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#221410]/80 border border-[#D4AF37]/35 text-[#FAF5EB] placeholder-[#FAF5EB]/35 text-sm font-sans focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-cinzel text-xs tracking-wider uppercase text-[#F6E29F] mb-2"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sundaram@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#221410]/80 border border-[#D4AF37]/35 text-[#FAF5EB] placeholder-[#FAF5EB]/35 text-sm font-sans focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block font-cinzel text-xs tracking-wider uppercase text-[#F6E29F] mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Number of Guests Attending</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleGuestChange(num)}
                        className={`flex-1 min-w-[50px] py-2.5 rounded-xl border text-sm font-serif font-medium transition-all cursor-pointer ${
                          formData.guestCount === num
                            ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-[#221410] border-[#FFF4CC] shadow-md font-bold'
                            : 'bg-[#221410]/80 border-[#D4AF37]/30 text-[#FAF5EB]/80 hover:border-[#D4AF37]'
                        }`}
                      >
                        {num === 5 ? '5+' : num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attendance Selection */}
                <div>
                  <label
                    htmlFor="attendance"
                    className="block font-cinzel text-xs tracking-wider uppercase text-[#F6E29F] mb-2"
                  >
                    Will you be attending?
                  </label>
                  <select
                    id="attendance"
                    name="attendance"
                    value={formData.attendance}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#221410] border border-[#D4AF37]/35 text-[#FAF5EB] text-sm font-sans focus:outline-none focus:border-[#D4AF37] transition-all cursor-pointer"
                  >
                    <option value="all">Joyfully Attending All Festivities</option>
                    <option value="muhoortham">Attending Sunday Morning Muhoortham &amp; Feast</option>
                    <option value="sangeet">Attending Saturday Sangeet Gala</option>
                    <option value="reception">Attending Sunday Evening Reception</option>
                    <option value="decline">Regretfully Cannot Attend (Celebrating in Spirit)</option>
                  </select>
                </div>

                {/* Dietary Preference */}
                <div>
                  <label
                    htmlFor="dietary"
                    className="block font-cinzel text-xs tracking-wider uppercase text-[#F6E29F] mb-2"
                  >
                    Feast Preference
                  </label>
                  <select
                    id="dietary"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#221410] border border-[#D4AF37]/35 text-[#FAF5EB] text-sm font-sans focus:outline-none focus:border-[#D4AF37] transition-all cursor-pointer"
                  >
                    <option value="traditional-veg">Traditional South Indian Pure Veg (Banana Leaf Feast)</option>
                    <option value="jain-veg">Jain Vegetarian (No onion / garlic)</option>
                    <option value="other">Standard Vegetarian</option>
                  </select>
                </div>

                {/* Personal Message & Blessings */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-cinzel text-xs tracking-wider uppercase text-[#F6E29F] mb-2 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Personal Message &amp; Blessings</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your wishes and blessings for Priya &amp; Arjun..."
                    className="w-full px-4 py-3 rounded-xl bg-[#221410]/80 border border-[#D4AF37]/35 text-[#FAF5EB] placeholder-[#FAF5EB]/35 text-sm font-sans focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F6E29F] to-[#B38F24] text-[#221410] font-cinzel font-bold text-sm tracking-[0.2em] uppercase shadow-[0_10px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_12px_35px_rgba(212,175,55,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Sending Your Blessings...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm RSVP &amp; Send Blessings</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              /* ── Confirmation Card ── */
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 px-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFF4CC] text-[#221410] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                  <CheckCircle2 className="w-9 h-9 text-[#29060B]" />
                </div>

                <span className="font-cinzel text-xs tracking-[0.25em] text-[#D4AF37] uppercase block mb-2">
                  RSVP Received with Joy
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF5EB] font-light mb-4">
                  Thank you, {formData.fullName}!
                </h3>

                <p className="font-serif italic text-base sm:text-lg text-[#F6E29F] max-w-lg mx-auto mb-6">
                  “Your warm wishes and blessings mean the world to us. We look forward to celebrating this sacred milestone together!”
                </p>

                <div className="p-4 rounded-2xl bg-[#54111D]/70 border border-[#D4AF37]/30 max-w-md mx-auto mb-8 text-left text-xs sm:text-sm font-sans space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#FAF5EB]/60">Guests:</span>
                    <span className="font-medium text-[#FAF5EB]">{formData.guestCount} Attendee(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#FAF5EB]/60">Status:</span>
                    <span className="font-medium text-[#E6CA65]">Confirmed</span>
                  </div>
                  {formData.message && (
                    <div className="pt-2 border-t border-[#D4AF37]/20">
                      <span className="text-[#FAF5EB]/60 block mb-1">Your message:</span>
                      <p className="italic text-[#FAF5EB]/90">"{formData.message}"</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full border border-[#D4AF37]/60 text-[#F6E29F] font-cinzel text-xs tracking-wider uppercase hover:bg-[#54111D] transition-colors cursor-pointer"
                >
                  Submit Another Response
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
