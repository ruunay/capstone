import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError("You must agree to the Terms and Conditions to create an account.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register(form);
      const redirect = localStorage.getItem("held_redirect") || "/dashboard";
      localStorage.removeItem("held_redirect");
      navigate(redirect);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const closeTermsModal = (e) => {
    if (e.target === e.currentTarget) setShowTerms(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-header">
          <div className="auth-logo-icon">H</div>
          <h1 className="auth-logo">Held</h1>
          <p className="auth-tagline">
            Begin your soft, intentional journey — a space made just for you.
          </p>
        </div>

        <div className="disclaimer-banner">
          Held is a personal journaling platform. We are not a medical or mental health service.
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          {error && <div className="error-msg">{error}</div>}

          <div className="field">
            <label>Username</label>
            <input
              className="input"
              value={form.username}
              onChange={(e) => update("username", e.target.value)}
              placeholder="yourname"
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              className="input"
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                style={{
                  background: "none", border: "none", color: "var(--pink)",
                  cursor: "pointer", padding: 0, font: "inherit",
                  fontSize: "0.82rem", textDecoration: "underline",
                }}
              >
                Terms and Conditions
              </button>
              . I understand Held is not a medical or therapeutic service.
            </span>
          </label>

          <button className="btn btn-full btn-hero" type="submit" disabled={loading}>
            {loading ? "Creating your space…" : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>

      {showTerms && (
        <div className="terms-modal-overlay" onClick={closeTermsModal}>
          <div className="terms-modal-content">
            <h2>Held Platform — Terms and Conditions</h2>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Last Updated: April 27, 2026
            </p>
            <p style={{ marginBottom: "1.25rem", fontStyle: "italic" }}>
              PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE CREATING AN ACCOUNT.
            </p>

            <h3>1. Acceptance of Terms</h3>
            <p>By creating an account on Held, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not use the platform. These terms apply to all users of the Held platform including registered members and visitors.</p>

            <h3>2. Not a Medical or Therapeutic Service</h3>
            <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: "0.75rem" }}>
              HELD IS NOT A MEDICAL SERVICE, MENTAL HEALTH TREATMENT, OR SUBSTITUTE FOR PROFESSIONAL CARE.
            </p>
            <p>Held is a digital journaling and emotional wellness platform designed for personal reflection and self-expression only. Held does not provide:</p>
            <p>• Medical advice, diagnosis, or treatment<br />
            • Mental health therapy or psychiatric services<br />
            • Crisis intervention services<br />
            • Professional counseling of any kind</p>
            <p>The guided reflection feature is an automated tool designed to encourage self-reflection. It is not operated by licensed mental health professionals and should not be treated as therapy or clinical support.</p>
            <p>If you are experiencing a mental health crisis, thoughts of self-harm, or suicidal ideation, please contact:</p>
            <p style={{ color: "var(--pink)", marginTop: "0.5rem" }}>
              • 988 Suicide and Crisis Lifeline: Call or text 988<br />
              • Crisis Text Line: Text HOME to 741741<br />
              • Emergency Services: Call 911
            </p>

            <h3>3. Community Standards and Acceptable Use</h3>
            <p>By using Held, you agree to the following community standards. Violation of these standards may result in immediate account suspension or permanent ban without refund.</p>
            <p>You agree NOT to:</p>
            <p>• Bully, harass, intimidate, or threaten any other user<br />
            • Post sexually explicit, graphic, violent, or disturbing content<br />
            • Use hate speech, slurs, or language that degrades any person based on race, gender, sexual orientation, religion, disability, or any other characteristic<br />
            • Share personal information of other users without their consent<br />
            • Impersonate other users or public figures<br />
            • Post spam, advertisements, or promotional content<br />
            • Upload illegal content of any kind<br />
            • Engage in any form of discrimination or targeted harassment<br />
            • Share content that glorifies self-harm, eating disorders, or substance abuse</p>
            <p>Held reserves the right to remove any content that violates these standards and to suspend or terminate accounts without prior notice.</p>

            <h3>4. Privacy and Anonymity</h3>
            <p>Your journal entries are private by default and are not visible to other users. Community posts are shared anonymously — your real name and personal information will not be displayed to other community members. Held administrators may access user information when required for safety, legal compliance, or platform integrity purposes.</p>

            <h3>5. User Content</h3>
            <p>You retain ownership of all content you create on Held. By posting content to the community, you grant Held a non-exclusive license to display that content within the platform. You are solely responsible for the content you post and agree that it complies with these Terms and Conditions.</p>

            <h3>6. Membership and Billing</h3>
            <p>Held offers a free tier and a paid membership at $5.99 per month. Paid memberships auto-renew monthly until cancelled. You may cancel your membership at any time through your account settings. Refunds are not provided for partial billing periods. Held reserves the right to change membership pricing with 30 days notice.</p>

            <h3>7. Limitation of Liability</h3>
            <p>Held and its creators, employees, and partners shall not be liable for any damages arising from your use of the platform including but not limited to emotional distress, decisions made based on platform content, or technical issues resulting in data loss. You use the platform at your own risk.</p>

            <h3>8. Changes to Terms</h3>
            <p>Held reserves the right to modify these Terms and Conditions at any time. Users will be notified of significant changes. Continued use of the platform after changes constitutes acceptance of the new terms.</p>

            <h3>9. Contact</h3>
            <p>For questions about these Terms and Conditions contact: legal@held.com</p>

            <p style={{ marginTop: "1.5rem", fontStyle: "italic", color: "var(--text)" }}>
              By checking the box below, you confirm that you have read, understood, and agree to these Terms and Conditions, and that you acknowledge Held is not a medical or therapeutic service.
            </p>

            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
              <button
                className="btn btn-full"
                onClick={() => { setAgreedToTerms(true); setShowTerms(false); }}
              >
                I Agree
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setShowTerms(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
