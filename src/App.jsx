import { useState, useEffect, useRef, createContext, useContext } from "react";

// ════════════════════════════════════════════════════════════════════════════
// FONTS
// ════════════════════════════════════════════════════════════════════════════
const FontLink = () => (
    <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </>
);

// ════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ════════════════════════════════════════════════════════════════════════════
const T = {
    blue: "#1D4ED8", blueLight: "#3B82F6", bluePale: "#EFF6FF", blueMid: "#DBEAFE",
    navy: "#0F172A", slate: "#1E293B", muted: "#64748B", faint: "#94A3B8",
    border: "#BFDBFE", borderGray: "#E2E8F0", white: "#FFFFFF", bg: "#F8FAFF",
    bgDash: "#F1F5F9", red: "#EF4444", redBg: "#FEF2F2", green: "#10B981",
    greenBg: "#D1FAE5", amber: "#F59E0B", amberBg: "#FEF3C7",
    sidebarBg: "#0F172A", sidebarActive: "#1D4ED8", sidebarHover: "#1E293B",
    serif: "'Playfair Display', Georgia, serif", sans: "'DM Sans', system-ui, sans-serif",
};

// ════════════════════════════════════════════════════════════════════════════
// MOCK DATA
// ════════════════════════════════════════════════════════════════════════════
const DOCTORS = [
    { id: 1, name: "Dr. Priya Sharma", specialization: "Cardiologist", rating: 4.9, experience: "15 yrs", fee: 800, description: "15+ years in interventional cardiology and heart failure management at AIIMS Delhi.", image: "https://randomuser.me/api/portraits/women/44.jpg", available: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
    { id: 2, name: "Dr. Rohan Mehta", specialization: "Orthopedic", rating: 4.8, experience: "12 yrs", fee: 700, description: "Sports medicine expert and joint replacement surgeon, formerly at Fortis Hospital Mumbai.", image: "https://randomuser.me/api/portraits/men/32.jpg", available: ["10:00", "11:00", "15:00", "16:00", "17:00"] },
    { id: 3, name: "Dr. Ananya Iyer", specialization: "Dermatologist", rating: 4.7, experience: "9 yrs", fee: 600, description: "Cosmetic & clinical dermatology specialist with expertise in laser treatments and acne care.", image: "https://randomuser.me/api/portraits/women/68.jpg", available: ["09:00", "10:00", "11:00", "12:00", "14:00"] },
    { id: 4, name: "Dr. Suresh Patel", specialization: "Pediatrician", rating: 4.9, experience: "20 yrs", fee: 500, description: "Child health specialist with 20 years of experience in neonatal care and childhood development.", image: "https://randomuser.me/api/portraits/men/75.jpg", available: ["08:00", "09:00", "10:00", "14:00", "15:00"] },
    { id: 5, name: "Dr. Kavitha Nair", specialization: "Neurologist", rating: 4.6, experience: "11 yrs", fee: 900, description: "Expert in stroke management, epilepsy, and movement disorders at Manipal Neuroscience Centre.", image: "https://randomuser.me/api/portraits/women/26.jpg", available: ["11:00", "12:00", "15:00", "16:00", "17:00"] },
    { id: 6, name: "Dr. Amit Verma", specialization: "Dentist", rating: 4.8, experience: "8 yrs", fee: 400, description: "Implantologist and cosmetic dentist specializing in smile design and full-mouth rehabilitation.", image: "https://randomuser.me/api/portraits/men/52.jpg", available: ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00"] },
    { id: 7, name: "Dr. Meera Krishnan", specialization: "Gynecologist", rating: 4.9, experience: "14 yrs", fee: 750, description: "Women's health specialist with a focus on high-risk pregnancies and minimally invasive surgery.", image: "https://randomuser.me/api/portraits/women/55.jpg", available: ["09:00", "10:00", "14:00", "15:00", "16:00"] },
    { id: 8, name: "Dr. Vikram Rao", specialization: "Psychiatrist", rating: 4.7, experience: "10 yrs", fee: 850, description: "Mental health expert specializing in anxiety, depression, and cognitive behavioral therapy.", image: "https://randomuser.me/api/portraits/men/41.jpg", available: ["10:00", "11:00", "12:00", "16:00", "17:00"] },
    { id: 9, name: "Dr. Nisha Gupta", specialization: "Ophthalmologist", rating: 4.8, experience: "13 yrs", fee: 650, description: "Retina specialist and LASIK surgeon with expertise in cataract and glaucoma management.", image: "https://randomuser.me/api/portraits/women/33.jpg", available: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
];

const SPECIALITIES = ["Orthopedic", "Dermatologist", "Cardiologist", "Pediatrician", "Neurologist", "Dentist", "Psychiatrist", "Gynecologist", "Ophthalmologist"];

const MOCK_USERS = [
    { email: "patient@demo.com", password: "Demo1234", role: "patient", name: "Arjun Kapoor" },
    { email: "doctor@demo.com", password: "Demo1234", role: "doctor", name: "Dr. Priya Sharma", doctorId: 1 },
];

const INIT_APPOINTMENTS = [
    { id: "a1", doctorId: 1, doctorName: "Dr. Priya Sharma", specialization: "Cardiologist", date: "2025-03-10", time: "10:00", status: "confirmed", patientName: "Arjun Kapoor", notes: "Follow-up checkup" },
    { id: "a2", doctorId: 3, doctorName: "Dr. Ananya Iyer", specialization: "Dermatologist", date: "2025-03-15", time: "11:00", status: "pending", patientName: "Arjun Kapoor", notes: "Skin rash consultation" },
    { id: "a3", doctorId: 2, doctorName: "Dr. Rohan Mehta", specialization: "Orthopedic", date: "2025-02-28", time: "15:00", status: "completed", patientName: "Arjun Kapoor", notes: "Knee pain review" },
];

const INIT_SCHEDULE = [
    { id: "s1", day: "Monday", slots: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
    { id: "s2", day: "Tuesday", slots: ["09:00", "10:00", "11:00"] },
    { id: "s3", day: "Wednesday", slots: ["14:00", "15:00", "16:00", "17:00"] },
    { id: "s4", day: "Thursday", slots: ["09:00", "10:00", "14:00", "15:00"] },
    { id: "s5", day: "Friday", slots: ["10:00", "11:00", "12:00"] },
];

// ════════════════════════════════════════════════════════════════════════════
// AUTH CONTEXT
// ════════════════════════════════════════════════════════════════════════════
const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        try { const s = localStorage.getItem("doclink_auth"); return s ? JSON.parse(s) : null; }
        catch { return null; }
    });
    const login = (user) => { setAuth(user); localStorage.setItem("doclink_auth", JSON.stringify(user)); };
    const logout = (navigate) => { setAuth(null); localStorage.removeItem("doclink_auth"); navigate("home"); };
    return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

// ════════════════════════════════════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════════════════════════════════════
const Ic = {
    Search: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>,
    Eye: ({ off }) => <svg width="17" height="17" fill="none" stroke={T.faint} strokeWidth="2" viewBox="0 0 24 24">{off ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}</svg>,
    Star: ({ filled }) => <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#F59E0B" : "#E5E7EB"}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
    Dashboard: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>,
    Doctors: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Calendar: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    List: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
    Clock: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    Logout: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
    Patients: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    Schedule: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    Requests: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>,
    Check: () => <svg width="16" height="16" fill="none" stroke={T.green} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>,
    XIcon: () => <svg width="16" height="16" fill="none" stroke={T.red} strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Plus: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    Trash: () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>,
    Menu: () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>,
    Bell: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
};

// ════════════════════════════════════════════════════════════════════════════
// SHARED PRIMITIVES
// ════════════════════════════════════════════════════════════════════════════
function Stars({ rating }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {[1, 2, 3, 4, 5].map(i => <Ic.Star key={i} filled={i <= Math.round(rating)} />)}
            <span style={{ fontSize: 12, color: T.muted, marginLeft: 4, fontWeight: 600 }}>{rating}</span>
        </div>
    );
}

function FormInput({ label, type = "text", value, onChange, placeholder, error, rightEl, autoComplete }) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ marginBottom: 18 }}>
            {label && <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: T.slate, marginBottom: 6 }}>{label}</label>}
            <div style={{ position: "relative" }}>
                <input type={type} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    style={{
                        width: "100%", boxSizing: "border-box", padding: rightEl ? "12px 44px 12px 14px" : "12px 14px",
                        borderRadius: 10, fontSize: 14.5, outline: "none", fontFamily: T.sans,
                        border: `1.5px solid ${error ? T.red : focused ? T.blue : "#D1D5DB"}`,
                        background: error ? T.redBg : "#FAFAFA", color: T.navy,
                        transition: "border-color 0.2s, box-shadow 0.2s",
                        boxShadow: focused && !error ? "0 0 0 3px rgba(29,78,216,0.1)" : "none",
                    }} />
                {rightEl && <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>{rightEl}</span>}
            </div>
            {error && <p style={{ fontSize: 12, color: T.red, marginTop: 5, fontWeight: 500 }}>{error}</p>}
        </div>
    );
}

function PrimaryBtn({ children, onClick, loading, small, danger, outline, style: extra }) {
    const s = {
        padding: small ? "8px 18px" : "12px 24px", borderRadius: 10, fontWeight: 700,
        fontSize: small ? 13.5 : 15, fontFamily: T.sans, cursor: loading ? "not-allowed" : "pointer",
        border: outline ? `1.5px solid ${danger ? T.red : T.blue}` : "none",
        background: outline ? "transparent" : danger ? "#DC2626" : `linear-gradient(135deg, ${T.blue}, #1E40AF)`,
        color: outline ? (danger ? T.red : T.blue) : T.white,
        boxShadow: outline ? "none" : danger ? "0 4px 12px rgba(220,38,38,0.25)" : "0 4px 14px rgba(29,78,216,0.3)",
        transition: "all 0.2s", opacity: loading ? 0.7 : 1, display: "inline-flex", alignItems: "center", gap: 7, ...extra,
    };
    return (
        <button style={s} onClick={onClick}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
            {loading ? "Please wait…" : children}
        </button>
    );
}

function Badge({ status }) {
    const map = {
        confirmed: { bg: T.greenBg, color: "#059669", label: "Confirmed" },
        pending: { bg: T.amberBg, color: "#D97706", label: "Pending" },
        completed: { bg: "#F1F5F9", color: T.muted, label: "Completed" },
        cancelled: { bg: T.redBg, color: T.red, label: "Cancelled" },
        rejected: { bg: T.redBg, color: T.red, label: "Rejected" },
        accepted: { bg: T.greenBg, color: "#059669", label: "Accepted" },
    };
    const st = map[status] || map.pending;
    return <span style={{ fontSize: 12, fontWeight: 700, background: st.bg, color: st.color, borderRadius: 99, padding: "4px 12px" }}>{st.label}</span>;
}

function Toast({ msg, onClose }) {
    useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, []);
    return (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999, background: T.navy, color: T.white, borderRadius: 12, padding: "14px 22px", fontSize: 14, fontWeight: 600, fontFamily: T.sans, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", animation: "slideUp 0.3s ease" }}>
            <span style={{ color: T.green }}>✓</span> {msg}
        </div>
    );
}

function StatCard({ label, value, icon, color = T.blue, sub }) {
    return (
        <div style={{ background: T.white, borderRadius: 16, padding: "22px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: `1px solid ${T.borderGray}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                    <div style={{ fontSize: 13, color: T.muted, fontWeight: 600, marginBottom: 6 }}>{label}</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: T.navy, fontFamily: T.serif, lineHeight: 1 }}>{value}</div>
                    {sub && <div style={{ fontSize: 12.5, color: T.faint, marginTop: 6 }}>{sub}</div>}
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", color }}>{icon}</div>
            </div>
        </div>
    );
}

function PasswordStrength({ password }) {
    const checks = [
        { label: "At least 8 characters", ok: password.length >= 8 },
        { label: "One uppercase letter", ok: /[A-Z]/.test(password) },
        { label: "One number", ok: /\d/.test(password) },
    ];
    if (!password) return null;
    const score = checks.filter(c => c.ok).length;
    const colors = ["#EF4444", "#F59E0B", "#10B981"];
    const labels = ["Weak", "Fair", "Strong"];
    return (
        <div style={{ marginBottom: 16, marginTop: -8 }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i < score ? colors[score - 1] : "#E5E7EB", transition: "background 0.3s" }} />)}
            </div>
            <span style={{ fontSize: 12, color: colors[score - 1] || T.faint, fontWeight: 600 }}>{labels[score - 1] || "Weak"}</span>
            <div style={{ marginTop: 6 }}>
                {checks.map(c => (
                    <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                        {c.ok
                            ? <svg width="14" height="14" fill="none" stroke={T.green} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                            : <svg width="14" height="14" fill="none" stroke={T.red} strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>}
                        <span style={{ fontSize: 12, color: c.ok ? T.green : T.red }}>{c.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// PUBLIC NAVBAR
// ════════════════════════════════════════════════════════════════════════════
function PublicNavbar({ page, navigate, scrolled }) {
    return (
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: scrolled || page !== "home" ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.75)", backdropFilter: "blur(14px)", boxShadow: scrolled || page !== "home" ? "0 1px 20px rgba(29,78,216,0.09)" : "none", transition: "all 0.3s ease" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
                <div onClick={() => navigate("home")} style={{ fontSize: 22, fontWeight: 800, color: T.blue, fontFamily: T.serif, letterSpacing: "-0.03em", cursor: "pointer" }}>
                    Doc<span style={{ color: "#0EA5E9" }}>Link</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => navigate("login")} style={{ border: `1.5px solid ${T.blue}`, color: T.blue, background: page === "login" ? T.bluePale : "transparent", borderRadius: 9, padding: "8px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = T.bluePale}
                        onMouseLeave={e => e.currentTarget.style.background = page === "login" ? T.bluePale : "transparent"}>Login</button>
                    <button onClick={() => navigate("signup")} style={{ background: `linear-gradient(135deg, ${T.blue}, #0EA5E9)`, color: T.white, border: "none", borderRadius: 9, padding: "8px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: T.sans, boxShadow: "0 4px 12px rgba(29,78,216,0.25)", transition: "all 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Sign Up</button>
                </div>
            </div>
        </nav>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// AUTH LAYOUT
// ════════════════════════════════════════════════════════════════════════════
function AuthLayout({ navigate, children, side }) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", fontFamily: T.sans, background: T.bg }}>
            <PublicNavbar page="auth" navigate={navigate} scrolled={true} />
            <div style={{ flex: "0 0 45%", background: "linear-gradient(150deg,#1E40AF 0%,#1D4ED8 50%,#0EA5E9 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "80px 60px", position: "relative", overflow: "hidden" }} className="auth-panel">
                <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                <div style={{ position: "absolute", bottom: -60, left: -60, width: 250, height: 250, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div onClick={() => navigate("home")} style={{ fontSize: 24, fontWeight: 800, color: T.white, fontFamily: T.serif, marginBottom: 48, cursor: "pointer", letterSpacing: "-0.03em" }}>Doc<span style={{ opacity: 0.75 }}>Link</span></div>
                    <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: T.white, fontFamily: T.serif, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.03em" }}>{side.heading}</h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 340, margin: "0 0 40px" }}>{side.desc}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {side.bullets.map(b => (
                            <div key={b} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <svg width="11" height="11" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{b}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "100px 40px 60px", overflowY: "auto" }}>
                <div style={{ width: "100%", maxWidth: 420 }}>{children}</div>
            </div>
            <style>{`.auth-panel{display:flex!important;}@media(max-width:768px){.auth-panel{display:none!important;}}@keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}`}</style>
        </div>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// DASHBOARD LAYOUT
// ════════════════════════════════════════════════════════════════════════════
function DashboardLayout({ navigate, subPage, setSubPage, role, children }) {
    const { auth, logout } = useAuth();
    const [sideOpen, setSideOpen] = useState(false);

    const patientNav = [
        { id: "dashboard", label: "Dashboard", icon: <Ic.Dashboard /> },
        { id: "search", label: "Search Doctors", icon: <Ic.Doctors /> },
        { id: "book", label: "Book Appointment", icon: <Ic.Calendar /> },
        { id: "appointments", label: "My Appointments", icon: <Ic.List /> },
    ];
    const doctorNav = [
        { id: "dashboard", label: "Dashboard", icon: <Ic.Dashboard /> },
        { id: "requests", label: "Appointment Requests", icon: <Ic.Requests /> },
        { id: "schedule", label: "Manage Schedule", icon: <Ic.Schedule /> },
        { id: "patients", label: "My Patients", icon: <Ic.Patients /> },
    ];
    const navItems = role === "doctor" ? doctorNav : patientNav;

    const SidebarContent = () => (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div onClick={() => navigate("home")} style={{ fontSize: 20, fontWeight: 800, color: T.white, fontFamily: T.serif, letterSpacing: "-0.03em", cursor: "pointer", marginBottom: 20 }}>Doc<span style={{ color: "#0EA5E9" }}>Link</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${T.blue},#0EA5E9)`, display: "flex", alignItems: "center", justifyContent: "center", color: T.white, fontWeight: 700, fontSize: 16 }}>{auth?.name?.charAt(0) || "U"}</div>
                    <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: T.white, lineHeight: 1.3 }}>{auth?.name}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", textTransform: "capitalize" }}>{auth?.role}</div>
                    </div>
                </div>
            </div>
            <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                {navItems.map(item => (
                    <button key={item.id} onClick={() => { setSubPage(item.id); setSideOpen(false); }}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: T.sans, fontWeight: 600, fontSize: 14, transition: "all 0.15s", textAlign: "left", background: subPage === item.id ? T.sidebarActive : "transparent", color: subPage === item.id ? T.white : "rgba(255,255,255,0.55)" }}
                        onMouseEnter={e => { if (subPage !== item.id) { e.currentTarget.style.background = T.sidebarHover; e.currentTarget.style.color = T.white; } }}
                        onMouseLeave={e => { if (subPage !== item.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; } }}>
                        {item.icon}{item.label}
                    </button>
                ))}
            </nav>
            <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <button onClick={() => logout(navigate)}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: T.sans, fontWeight: 600, fontSize: 14, background: "transparent", color: "rgba(255,255,255,0.5)", width: "100%", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(220,38,38,0.15)"; e.currentTarget.style.color = "#F87171"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                    <Ic.Logout /> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div style={{ display: "flex", minHeight: "100vh", fontFamily: T.sans, background: T.bgDash }}>
            <aside style={{ width: 240, background: T.sidebarBg, flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }} className="dash-sidebar">
                <SidebarContent />
            </aside>
            {sideOpen && (
                <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, width: 260, background: T.sidebarBg, height: "100vh", overflowY: "auto" }}><SidebarContent /></div>
                    <div style={{ flex: 1, background: "rgba(0,0,0,0.5)", marginLeft: 260 }} onClick={() => setSideOpen(false)} />
                </div>
            )}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                <header style={{ background: T.white, borderBottom: `1px solid ${T.borderGray}`, padding: "0 28px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <button onClick={() => setSideOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: T.slate }} className="mobile-menu-btn"><Ic.Menu /></button>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: T.navy, fontFamily: T.serif }}>{navItems.find(n => n.id === subPage)?.label || "Dashboard"}</div>
                            <div style={{ fontSize: 12.5, color: T.faint }}>DocLink · {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ position: "relative", cursor: "pointer", color: T.muted }}><Ic.Bell /><div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: T.red, border: "2px solid white" }} /></div>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${T.blue},#0EA5E9)`, display: "flex", alignItems: "center", justifyContent: "center", color: T.white, fontWeight: 700, fontSize: 15 }}>{auth?.name?.charAt(0) || "U"}</div>
                    </div>
                </header>
                <main style={{ flex: 1, padding: "32px 28px", overflowY: "auto" }}>{children}</main>
            </div>
            <style>{`.dash-sidebar{display:block!important;}.mobile-menu-btn{display:none!important;}@media(max-width:768px){.dash-sidebar{display:none!important;}.mobile-menu-btn{display:block!important;}main{padding:20px 16px!important;}}`}</style>
        </div>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// USER PAGES
// ════════════════════════════════════════════════════════════════════════════
function UserDashboardHome({ appointments, setSubPage }) {
    const { auth } = useAuth();
    const upcoming = appointments.filter(a => a.status === "confirmed" || a.status === "pending");
    const completed = appointments.filter(a => a.status === "completed");
    return (
        <div>
            <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 800, color: T.navy, margin: "0 0 6px" }}>Good morning, {auth?.name?.split(" ")[0]} 👋</h2>
                <p style={{ color: T.muted, fontSize: 14.5 }}>Here's your health overview for today.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 18, marginBottom: 32 }}>
                <StatCard label="Upcoming" value={upcoming.length} icon={<Ic.Calendar />} sub="Appointments scheduled" />
                <StatCard label="Completed" value={completed.length} icon={<Ic.Check />} color={T.green} sub="Past consultations" />
                <StatCard label="Doctors" value={DOCTORS.length} icon={<Ic.Doctors />} color="#7C3AED" sub="Available near you" />
                <StatCard label="Specialties" value={SPECIALITIES.length} icon={<Ic.List />} color={T.amber} sub="Specializations" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="user-grid">
                <div style={{ background: T.white, borderRadius: 16, padding: "22px", border: `1px solid ${T.borderGray}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                        <div style={{ fontWeight: 700, fontSize: 15.5, color: T.navy, fontFamily: T.serif }}>Upcoming Appointments</div>
                        <span onClick={() => setSubPage("appointments")} style={{ fontSize: 13, color: T.blue, cursor: "pointer", fontWeight: 600 }}>View all →</span>
                    </div>
                    {upcoming.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "30px 0", color: T.faint }}>
                            <div style={{ fontSize: 36, marginBottom: 8 }}>📅</div>
                            <div style={{ fontSize: 14, marginBottom: 8 }}>No upcoming appointments</div>
                            <span onClick={() => setSubPage("search")} style={{ fontSize: 13.5, color: T.blue, cursor: "pointer", fontWeight: 600 }}>Find a doctor →</span>
                        </div>
                    ) : upcoming.slice(0, 3).map(a => (
                        <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${T.borderGray}` }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 14, color: T.navy }}>{a.doctorName}</div>
                                <div style={{ fontSize: 12.5, color: T.muted }}>{a.specialization} · {a.date} at {a.time}</div>
                            </div>
                            <Badge status={a.status} />
                        </div>
                    ))}
                </div>
                <div style={{ background: `linear-gradient(135deg,${T.blue},#0EA5E9)`, borderRadius: 16, padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.white, fontFamily: T.serif, marginBottom: 10 }}>Find a Doctor Today</div>
                        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 24 }}>Search from 500+ verified specialists and book instantly.</p>
                    </div>
                    <button onClick={() => setSubPage("search")} style={{ background: T.white, color: T.blue, border: "none", borderRadius: 9, padding: "11px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: T.sans, alignSelf: "flex-start" }}>Search Doctors →</button>
                </div>
            </div>
            <style>{`@media(max-width:640px){.user-grid{grid-template-columns:1fr!important;}}`}</style>
        </div>
    );
}

function SearchDoctors({ onBook }) {
    const [search, setSearch] = useState("");
    const [spec, setSpec] = useState("");
    const filtered = DOCTORS.filter(d =>
        (d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase())) &&
        (!spec || d.specialization === spec)
    );
    return (
        <div>
            <div style={{ background: T.white, borderRadius: 16, padding: "20px 22px", border: `1px solid ${T.borderGray}`, marginBottom: 24, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ flex: 2, minWidth: 200, position: "relative" }}>
                        <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: T.faint }}><Ic.Search /></div>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or specialization…"
                            style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px 11px 42px", borderRadius: 10, border: `1.5px solid ${T.borderGray}`, fontSize: 14, outline: "none", fontFamily: T.sans, color: T.navy, background: T.bgDash }} />
                    </div>
                    <select value={spec} onChange={e => setSpec(e.target.value)}
                        style={{ flex: 1, minWidth: 160, padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.borderGray}`, fontSize: 14, outline: "none", fontFamily: T.sans, color: T.navy, background: T.bgDash, cursor: "pointer" }}>
                        <option value="">All Specialties</option>
                        {SPECIALITIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                    {SPECIALITIES.slice(0, 6).map(s => (
                        <button key={s} onClick={() => setSpec(spec === s ? "" : s)}
                            style={{ borderRadius: 999, padding: "6px 14px", fontSize: 12.5, fontWeight: 600, border: `1.5px solid ${spec === s ? T.blue : T.borderGray}`, background: spec === s ? T.blue : T.white, color: spec === s ? T.white : T.muted, cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s" }}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ fontSize: 14, color: T.muted, marginBottom: 16 }}>{filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found</div>
            {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: T.faint }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: T.slate }}>No doctors found</div>
                    <p style={{ fontSize: 14 }}>Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
                    {filtered.map((d, i) => <SearchDoctorCard key={d.id} doctor={d} onBook={onBook} index={i} />)}
                </div>
            )}
        </div>
    );
}

function SearchDoctorCard({ doctor, onBook, index }) {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);
    useEffect(() => { const t = setTimeout(() => setVisible(true), index * 60); return () => clearTimeout(t); }, []);
    return (
        <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            style={{ background: T.white, borderRadius: 18, padding: "22px", border: `1px solid ${hovered ? T.border : T.borderGray}`, boxShadow: hovered ? "0 10px 36px rgba(29,78,216,0.13)" : "0 2px 10px rgba(0,0,0,0.04)", opacity: visible ? 1 : 0, transform: visible ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(16px)", transition: "all 0.4s ease", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <img src={doctor.image} alt={doctor.name} style={{ width: 58, height: 58, borderRadius: "50%", objectFit: "cover", border: `3px solid ${T.blueMid}` }} />
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: T.navy, fontFamily: T.serif }}>{doctor.name}</div>
                    <div style={{ fontSize: 13, color: T.blue, fontWeight: 600, marginTop: 1 }}>{doctor.specialization}</div>
                    <div style={{ marginTop: 4 }}><Stars rating={doctor.rating} /></div>
                </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 12.5, color: T.muted, background: T.bgDash, borderRadius: 6, padding: "4px 10px", fontWeight: 500 }}>🕐 {doctor.experience}</span>
                <span style={{ fontSize: 12.5, color: T.muted, background: T.bgDash, borderRadius: 6, padding: "4px 10px", fontWeight: 500 }}>₹{doctor.fee} / visit</span>
            </div>
            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, margin: 0 }}>{doctor.description}</p>
            <button onClick={() => onBook(doctor)}
                style={{ background: hovered ? `linear-gradient(135deg,${T.blue},#1E40AF)` : T.bluePale, color: hovered ? T.white : T.blue, border: "none", borderRadius: 9, padding: "10px 0", fontWeight: 700, fontSize: 13.5, cursor: "pointer", fontFamily: T.sans, transition: "all 0.25s", boxShadow: hovered ? "0 4px 12px rgba(29,78,216,0.25)" : "none" }}>
                Book Appointment →
            </button>
        </div>
    );
}

function BookAppointment({ appointments, setAppointments, selectedDoctor, setSelectedDoctor, setSubPage }) {
    const [step, setStep] = useState(selectedDoctor ? 2 : 1);
    const [doctor, setDoctor] = useState(selectedDoctor);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");
    const [toast, setToast] = useState(null);
    const { auth } = useAuth();

    useEffect(() => { if (selectedDoctor) { setDoctor(selectedDoctor); setStep(2); } }, [selectedDoctor]);

    const minDate = new Date(); minDate.setDate(minDate.getDate() + 1);
    const minDateStr = minDate.toISOString().split("T")[0];

    const handleBook = () => {
        const appt = { id: "a" + Date.now(), doctorId: doctor.id, doctorName: doctor.name, specialization: doctor.specialization, date, time, status: "pending", patientName: auth?.name, notes };
        setAppointments(prev => [appt, ...prev]);
        setToast("Appointment booked successfully!");
        setDate(""); setTime(""); setNotes(""); setDoctor(null); setSelectedDoctor(null); setStep(1);
        setTimeout(() => setSubPage("appointments"), 2000);
    };

    const stepColors = [T.green, T.green, T.green];

    return (
        <div style={{ maxWidth: 620 }}>
            {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 36 }}>
                {[["1", "Select Doctor"], ["2", "Choose Slot"], ["3", "Confirm"]].map(([n, l], i) => (
                    <div key={n} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                            <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, fontFamily: T.sans, background: step > i + 1 ? T.green : step === i + 1 ? T.blue : T.borderGray, color: step >= i + 1 ? T.white : T.muted, transition: "all 0.3s" }}>{step > i + 1 ? "✓" : n}</div>
                            <span style={{ fontSize: 11.5, fontWeight: 600, color: step === i + 1 ? T.blue : T.muted, whiteSpace: "nowrap" }}>{l}</span>
                        </div>
                        {i < 2 && <div style={{ width: 60, height: 2, background: step > i + 1 ? T.green : T.borderGray, margin: "0 6px", marginBottom: 20, transition: "background 0.3s" }} />}
                    </div>
                ))}
            </div>

            {step === 1 && (
                <div>
                    <h3 style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 800, color: T.navy, margin: "0 0 20px" }}>Select a Doctor</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {DOCTORS.map(d => (
                            <div key={d.id} onClick={() => { setDoctor(d); setStep(2); }}
                                style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", background: T.white, borderRadius: 14, border: `1.5px solid ${doctor?.id === d.id ? T.blue : T.borderGray}`, cursor: "pointer", transition: "all 0.2s" }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = T.blue}
                                onMouseLeave={e => e.currentTarget.style.borderColor = doctor?.id === d.id ? T.blue : T.borderGray}>
                                <img src={d.image} alt={d.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, fontSize: 14.5, color: T.navy }}>{d.name}</div>
                                    <div style={{ fontSize: 13, color: T.blue, fontWeight: 600 }}>{d.specialization}</div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: 13, color: T.muted }}>₹{d.fee}</div>
                                    <Stars rating={d.rating} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && doctor && (
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, background: T.white, borderRadius: 14, padding: "16px", border: `1px solid ${T.borderGray}` }}>
                        <img src={doctor.image} alt={doctor.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover" }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 16, color: T.navy, fontFamily: T.serif }}>{doctor.name}</div>
                            <div style={{ fontSize: 13, color: T.blue }}>{doctor.specialization} · ₹{doctor.fee}</div>
                        </div>
                        <button onClick={() => { setDoctor(null); setStep(1); }} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 20 }}>←</button>
                    </div>
                    <div style={{ background: T.white, borderRadius: 16, padding: "22px", border: `1px solid ${T.borderGray}`, marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: T.slate, marginBottom: 8 }}>Select Date</label>
                        <input type="date" min={minDateStr} value={date} onChange={e => { setDate(e.target.value); setTime(""); }}
                            style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.borderGray}`, fontSize: 14, outline: "none", fontFamily: T.sans, color: T.navy, background: T.bgDash }} />
                        {date && (
                            <div style={{ marginTop: 20 }}>
                                <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: T.slate, marginBottom: 10 }}>Available Time Slots</label>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                    {doctor.available.map(slot => (
                                        <button key={slot} onClick={() => setTime(slot)}
                                            style={{ padding: "9px 18px", borderRadius: 9, border: `1.5px solid ${time === slot ? T.blue : T.borderGray}`, background: time === slot ? T.blue : T.white, color: time === slot ? T.white : T.slate, fontWeight: 600, fontSize: 13.5, cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s" }}>
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {date && time && (
                            <div style={{ marginTop: 20 }}>
                                <label style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: T.slate, marginBottom: 8 }}>Notes (optional)</label>
                                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Describe your symptoms or reason for visit…"
                                    style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${T.borderGray}`, fontSize: 14, fontFamily: T.sans, color: T.navy, outline: "none", resize: "vertical", background: T.bgDash }} />
                            </div>
                        )}
                    </div>
                    {date && time && <PrimaryBtn onClick={() => setStep(3)} style={{ width: "100%", justifyContent: "center", padding: "12px" }}>Review Booking →</PrimaryBtn>}
                </div>
            )}

            {step === 3 && doctor && date && time && (
                <div>
                    <div style={{ background: T.white, borderRadius: 16, padding: "24px", border: `1px solid ${T.borderGray}`, marginBottom: 16 }}>
                        <h3 style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 800, color: T.navy, margin: "0 0 20px" }}>Confirm Your Booking</h3>
                        {[["Doctor", doctor.name], ["Specialization", doctor.specialization], ["Date", date], ["Time", time], ["Consultation Fee", `₹${doctor.fee}`], ["Notes", notes || "None"]].map(([k, v]) => (
                            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.borderGray}` }}>
                                <span style={{ fontSize: 14, color: T.muted }}>{k}</span>
                                <span style={{ fontSize: 14, fontWeight: 600, color: T.navy }}>{v}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                        <PrimaryBtn outline onClick={() => setStep(2)} style={{ flex: 1, justifyContent: "center", padding: "12px" }}>← Back</PrimaryBtn>
                        <PrimaryBtn onClick={handleBook} style={{ flex: 1, justifyContent: "center", padding: "12px" }}>Confirm ✓</PrimaryBtn>
                    </div>
                </div>
            )}
        </div>
    );
}

function MyAppointments({ appointments, setAppointments }) {
    const [filter, setFilter] = useState("all");
    const [toast, setToast] = useState(null);
    const filtered = filter === "all" ? appointments : appointments.filter(a => a.status === filter);
    const cancel = (id) => { setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "cancelled" } : a)); setToast("Appointment cancelled."); };
    return (
        <div>
            {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
                {["all", "confirmed", "pending", "completed", "cancelled"].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        style={{ padding: "7px 16px", borderRadius: 99, border: `1.5px solid ${filter === f ? T.blue : T.borderGray}`, background: filter === f ? T.blue : T.white, color: filter === f ? T.white : T.muted, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: T.sans, textTransform: "capitalize", transition: "all 0.2s" }}>
                        {f}
                    </button>
                ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {filtered.length === 0
                    ? <div style={{ textAlign: "center", padding: "60px", color: T.faint }}><div style={{ fontSize: 44, marginBottom: 12 }}>📋</div><div style={{ fontSize: 16, fontWeight: 700, color: T.slate }}>No appointments found</div></div>
                    : filtered.map(a => (
                        <div key={a.id} style={{ background: T.white, borderRadius: 16, padding: "20px 22px", border: `1px solid ${T.borderGray}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                                <div style={{ width: 46, height: 46, borderRadius: "50%", background: T.blueMid, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>🩺</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 15, color: T.navy, fontFamily: T.serif }}>{a.doctorName}</div>
                                    <div style={{ fontSize: 13, color: T.muted }}>{a.specialization}</div>
                                    <div style={{ fontSize: 13, color: T.faint, marginTop: 3 }}>📅 {a.date} · 🕐 {a.time}</div>
                                    {a.notes && <div style={{ fontSize: 12.5, color: T.faint, marginTop: 3, fontStyle: "italic" }}>"{a.notes}"</div>}
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <Badge status={a.status} />
                                {(a.status === "confirmed" || a.status === "pending") && (
                                    <button onClick={() => cancel(a.id)} style={{ background: T.redBg, color: T.red, border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: T.sans }}>Cancel</button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// DOCTOR PAGES
// ════════════════════════════════════════════════════════════════════════════
function DoctorDashboardHome({ requests, setSubPage }) {
    const { auth } = useAuth();
    const pending = requests.filter(r => r.status === "pending");
    const confirmed = requests.filter(r => r.status === "accepted");
    return (
        <div>
            <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontFamily: T.serif, fontSize: 26, fontWeight: 800, color: T.navy, margin: "0 0 6px" }}>Welcome, {auth?.name} 👋</h2>
                <p style={{ color: T.muted, fontSize: 14.5 }}>Here's your practice overview.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 18, marginBottom: 32 }}>
                <StatCard label="Pending Requests" value={pending.length} icon={<Ic.Requests />} color={T.amber} sub="Awaiting response" />
                <StatCard label="Confirmed" value={confirmed.length} icon={<Ic.Calendar />} sub="Upcoming appointments" />
                <StatCard label="Today" value={0} icon={<Ic.Clock />} color={T.green} sub="Appointments today" />
                <StatCard label="Total Patients" value={requests.length} icon={<Ic.Patients />} color="#7C3AED" sub="All time" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="doc-grid">
                <div style={{ background: T.white, borderRadius: 16, padding: "22px", border: `1px solid ${T.borderGray}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                        <div style={{ fontWeight: 700, fontSize: 15.5, color: T.navy, fontFamily: T.serif }}>Pending Requests</div>
                        <span onClick={() => setSubPage("requests")} style={{ fontSize: 13, color: T.blue, cursor: "pointer", fontWeight: 600 }}>View all →</span>
                    </div>
                    {pending.length === 0
                        ? <div style={{ textAlign: "center", padding: "30px 0", color: T.faint }}><div style={{ fontSize: 34, marginBottom: 8 }}>🎉</div><div style={{ fontSize: 14 }}>All requests handled!</div></div>
                        : pending.slice(0, 3).map(r => (
                            <div key={r.id} style={{ padding: "11px 0", borderBottom: `1px solid ${T.borderGray}` }}>
                                <div style={{ fontWeight: 600, fontSize: 14, color: T.navy }}>{r.patientName}</div>
                                <div style={{ fontSize: 12.5, color: T.muted }}>{r.date} at {r.time} · {r.notes || "General consultation"}</div>
                            </div>
                        ))}
                </div>
                <div style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", borderRadius: 16, padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: T.white, fontFamily: T.serif, marginBottom: 10 }}>Manage Your Schedule</div>
                        <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, marginBottom: 24 }}>Add or remove available time slots for each day of the week.</p>
                    </div>
                    <button onClick={() => setSubPage("schedule")} style={{ background: T.white, color: "#7C3AED", border: "none", borderRadius: 9, padding: "11px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: T.sans, alignSelf: "flex-start" }}>Manage Schedule →</button>
                </div>
            </div>
            <style>{`@media(max-width:640px){.doc-grid{grid-template-columns:1fr!important;}}`}</style>
        </div>
    );
}

function AppointmentRequests({ requests, setRequests }) {
    const [filter, setFilter] = useState("pending");
    const [toast, setToast] = useState(null);
    const filtered = filter === "all" ? requests : requests.filter(r => r.status === filter);
    const respond = (id, status) => { setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r)); setToast(status === "accepted" ? "Appointment accepted!" : "Appointment rejected."); };
    return (
        <div>
            {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
                {["all", "pending", "accepted", "rejected"].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        style={{ padding: "7px 16px", borderRadius: 99, border: `1.5px solid ${filter === f ? T.blue : T.borderGray}`, background: filter === f ? T.blue : T.white, color: filter === f ? T.white : T.muted, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: T.sans, textTransform: "capitalize", transition: "all 0.2s" }}>
                        {f} {f !== "all" && `(${requests.filter(r => r.status === f).length})`}
                    </button>
                ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {filtered.length === 0
                    ? <div style={{ textAlign: "center", padding: "60px", color: T.faint }}><div style={{ fontSize: 44, marginBottom: 12 }}>📋</div><div style={{ fontSize: 16, fontWeight: 700, color: T.slate }}>No requests here</div></div>
                    : filtered.map(r => (
                        <div key={r.id} style={{ background: T.white, borderRadius: 16, padding: "20px 22px", border: `1px solid ${T.borderGray}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 15, color: T.navy, fontFamily: T.serif }}>{r.patientName}</div>
                                <div style={{ fontSize: 13, color: T.muted }}>📅 {r.date} · 🕐 {r.time}</div>
                                {r.notes && <div style={{ fontSize: 12.5, color: T.faint, marginTop: 3, fontStyle: "italic" }}>"{r.notes}"</div>}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <Badge status={r.status} />
                                {r.status === "pending" && (
                                    <>
                                        <button onClick={() => respond(r.id, "accepted")} style={{ background: T.greenBg, color: "#059669", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: T.sans, display: "flex", alignItems: "center", gap: 5 }}>✓ Accept</button>
                                        <button onClick={() => respond(r.id, "rejected")} style={{ background: T.redBg, color: T.red, border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: T.sans, display: "flex", alignItems: "center", gap: 5 }}>✕ Reject</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

function ScheduleManager() {
    const [schedule, setSchedule] = useState(INIT_SCHEDULE);
    const [newSlot, setNewSlot] = useState({});
    const [toast, setToast] = useState(null);
    const addSlot = (dayId) => {
        const val = newSlot[dayId];
        if (!val) return;
        setSchedule(prev => prev.map(d => d.id === dayId && !d.slots.includes(val) ? { ...d, slots: [...d.slots, val].sort() } : d));
        setNewSlot(p => ({ ...p, [dayId]: "" }));
        setToast("Slot added!");
    };
    const removeSlot = (dayId, slot) => { setSchedule(prev => prev.map(d => d.id === dayId ? { ...d, slots: d.slots.filter(s => s !== slot) } : d)); setToast("Slot removed."); };
    return (
        <div>
            {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {schedule.map(day => (
                    <div key={day.id} style={{ background: T.white, borderRadius: 16, padding: "20px 22px", border: `1px solid ${T.borderGray}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                            <div style={{ fontWeight: 700, fontSize: 15.5, color: T.navy, fontFamily: T.serif }}>{day.day}</div>
                            <span style={{ fontSize: 12.5, color: T.muted }}>{day.slots.length} slot{day.slots.length !== 1 ? "s" : ""}</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                            {day.slots.length === 0
                                ? <span style={{ fontSize: 13, color: T.faint, fontStyle: "italic" }}>No slots for this day</span>
                                : day.slots.map(slot => (
                                    <div key={slot} style={{ display: "flex", alignItems: "center", gap: 6, background: T.bluePale, borderRadius: 8, padding: "6px 12px", border: `1px solid ${T.border}` }}>
                                        <span style={{ fontSize: 13.5, fontWeight: 600, color: T.blue }}>{slot}</span>
                                        <button onClick={() => removeSlot(day.id, slot)} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, padding: 0, display: "flex", alignItems: "center" }}><Ic.Trash /></button>
                                    </div>
                                ))}
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                            <input type="time" value={newSlot[day.id] || ""} onChange={e => setNewSlot(p => ({ ...p, [day.id]: e.target.value }))}
                                style={{ padding: "8px 12px", borderRadius: 9, border: `1.5px solid ${T.borderGray}`, fontSize: 13.5, fontFamily: T.sans, outline: "none", color: T.navy, background: T.bgDash }} />
                            <button onClick={() => addSlot(day.id)} style={{ background: T.blue, color: T.white, border: "none", borderRadius: 9, padding: "8px 16px", fontWeight: 700, fontSize: 13.5, cursor: "pointer", fontFamily: T.sans, display: "flex", alignItems: "center", gap: 6 }}>
                                <Ic.Plus /> Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MyPatients({ requests }) {
    const unique = [...new Map(requests.filter(r => r.status !== "rejected").map(r => [r.patientName, r])).values()];
    return (
        <div>
            <div style={{ marginBottom: 20, fontSize: 14, color: T.muted }}>{unique.length} patient{unique.length !== 1 ? "s" : ""} total</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16 }}>
                {unique.map((r, i) => (
                    <div key={i} style={{ background: T.white, borderRadius: 16, padding: "20px", border: `1px solid ${T.borderGray}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                        <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg,${T.blue},#0EA5E9)`, display: "flex", alignItems: "center", justifyContent: "center", color: T.white, fontWeight: 800, fontSize: 18, marginBottom: 14 }}>{r.patientName?.charAt(0)}</div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: T.navy, fontFamily: T.serif }}>{r.patientName}</div>
                        <div style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>Last visit: {r.date}</div>
                        <div style={{ marginTop: 10 }}><Badge status={r.status} /></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// HOME PAGE (public landing)
// ════════════════════════════════════════════════════════════════════════════
function HomePage({ navigate }) {
    const [search, setSearch] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const doctorsSectionRef = useRef(null);
    useEffect(() => { const fn = () => setScrolled(window.scrollY > 10); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
    const filtered = DOCTORS.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()));
    const handleSearch = (val) => { setSearch(val); if (val && doctorsSectionRef.current) setTimeout(() => doctorsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 50); };

    const HomeCard = ({ doctor, index }) => {
        const [visible, setVisible] = useState(false);
        const [hovered, setHovered] = useState(false);
        useEffect(() => { const t = setTimeout(() => setVisible(true), index * 70); return () => clearTimeout(t); }, []);
        return (
            <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                style={{ background: T.white, borderRadius: 18, padding: "24px 22px", border: `1px solid ${hovered ? T.border : "#F1F5F9"}`, boxShadow: hovered ? "0 12px 40px rgba(29,78,216,0.14)" : "0 2px 12px rgba(29,78,216,0.05)", opacity: visible ? 1 : 0, transform: visible ? (hovered ? "translateY(-5px)" : "translateY(0)") : "translateY(20px)", transition: "all 0.4s ease", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <img src={doctor.image} alt={doctor.name} style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: `3px solid ${T.blueMid}` }} />
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 15.5, color: T.navy, fontFamily: T.serif }}>{doctor.name}</div>
                        <div style={{ fontSize: 13, color: T.blue, fontWeight: 600, marginTop: 2 }}>{doctor.specialization}</div>
                        <div style={{ marginTop: 4 }}><Stars rating={doctor.rating} /></div>
                    </div>
                </div>
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, margin: 0 }}>{doctor.description}</p>
                <button onClick={() => navigate("signup")} style={{ marginTop: 4, background: hovered ? `linear-gradient(135deg,${T.blue},#1E40AF)` : T.bluePale, color: hovered ? T.white : T.blue, border: "none", borderRadius: 9, padding: "10px 0", fontWeight: 600, fontSize: 13.5, cursor: "pointer", fontFamily: T.sans, transition: "all 0.25s" }}>
                    View Profile →
                </button>
            </div>
        );
    };

    return (
        <div style={{ fontFamily: T.sans, background: T.bg, minHeight: "100vh" }}>
            <PublicNavbar page="home" navigate={navigate} scrolled={scrolled} />
            <section style={{ paddingTop: 130, paddingBottom: 70, textAlign: "center", background: "linear-gradient(160deg,#EFF6FF 0%,#F0F9FF 55%,#F8FAFF 100%)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -60, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: T.blueMid, color: "#1D4ED8", borderRadius: 999, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>🩺 Trusted by 50,000+ patients across India</div>
                <h1 style={{ fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 800, lineHeight: 1.1, color: T.navy, margin: "0 auto 18px", maxWidth: 700, fontFamily: T.serif, letterSpacing: "-0.03em", padding: "0 20px" }}>Find <span style={{ color: T.blue }}>Trusted Doctors</span><br />Near You</h1>
                <p style={{ fontSize: "clamp(1rem,2vw,1.15rem)", color: T.muted, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7, padding: "0 20px" }}>Search specialists, compare ratings, and book appointments instantly.</p>
                <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", padding: "0 20px" }}>
                    <div style={{ position: "absolute", left: 38, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: T.faint }}><Ic.Search /></div>
                    <input value={search} onChange={e => handleSearch(e.target.value)} placeholder="Search by specialization or doctor name…"
                        style={{ width: "100%", boxSizing: "border-box", padding: "18px 18px 18px 48px", borderRadius: 14, fontSize: 15, outline: "none", border: `1.5px solid ${T.border}`, background: T.white, color: T.navy, boxShadow: "0 4px 24px rgba(29,78,216,0.09)", fontFamily: T.sans, transition: "all 0.2s" }}
                        onFocus={e => { e.target.style.borderColor = T.blue; e.target.style.boxShadow = "0 4px 32px rgba(29,78,216,0.18)"; }}
                        onBlur={e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = "0 4px 24px rgba(29,78,216,0.09)"; }} />
                    {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 36, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: T.faint, fontSize: 20 }}>×</button>}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9, justifyContent: "center", marginTop: 22, padding: "0 20px" }}>
                    {SPECIALITIES.map(s => (
                        <button key={s} onClick={() => handleSearch(search === s ? "" : s)}
                            style={{ borderRadius: 999, padding: "7px 17px", fontSize: 13, fontWeight: 600, border: `1.5px solid ${search === s ? T.blue : T.border}`, background: search === s ? T.blue : T.white, color: search === s ? T.white : T.blue, cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s" }}
                            onMouseEnter={e => { if (search !== s) e.currentTarget.style.background = T.bluePale; }}
                            onMouseLeave={e => { if (search !== s) e.currentTarget.style.background = T.white; }}>
                            {s}
                        </button>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center", marginTop: 56, padding: "0 20px" }}>
                    {[["500+", "Verified Doctors"], ["50K+", "Happy Patients"], ["4.9★", "Average Rating"], ["24/7", "Support"]].map(([n, l]) => (
                        <div key={l} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 30, fontWeight: 800, color: T.blue, fontFamily: T.serif, lineHeight: 1 }}>{n}</div>
                            <div style={{ fontSize: 13, color: T.muted, marginTop: 5, fontWeight: 500 }}>{l}</div>
                        </div>
                    ))}
                </div>
            </section>
            <section ref={doctorsSectionRef} style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 5%" }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 10 }}>
                    <div>
                        <h2 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 800, color: T.navy, fontFamily: T.serif, letterSpacing: "-0.03em", margin: 0 }}>{search ? `Results for "${search}"` : "Top Rated Doctors Near You"}</h2>
                        <p style={{ fontSize: 14, color: T.faint, marginTop: 6 }}>{filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found · Verified & Trusted</p>
                    </div>
                    {search && <button onClick={() => setSearch("")} style={{ fontSize: 13, color: T.blue, background: T.bluePale, border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontWeight: 600, fontFamily: T.sans }}>Clear ×</button>}
                </div>
                {filtered.length === 0
                    ? <div style={{ textAlign: "center", padding: "80px 20px", color: T.faint }}><div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div><div style={{ fontSize: 18, fontWeight: 700, color: T.slate, marginBottom: 8 }}>No doctors found</div><button onClick={() => setSearch("")} style={{ marginTop: 16, background: T.blue, color: T.white, border: "none", borderRadius: 9, padding: "10px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: T.sans }}>View All Doctors</button></div>
                    : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 22, marginTop: 32 }}>{filtered.map((doc, i) => <HomeCard key={doc.id} doctor={doc} index={i} />)}</div>}
            </section>
            <section style={{ background: `linear-gradient(135deg,${T.blue},#0EA5E9)`, padding: "60px 5%", textAlign: "center" }}>
                <h3 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: T.white, fontFamily: T.serif, margin: "0 0 12px" }}>Ready to take control of your health?</h3>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, margin: "0 0 28px" }}>Join 50,000+ patients who trust DocLink.</p>
                <button onClick={() => navigate("signup")} style={{ background: T.white, color: T.blue, border: "none", borderRadius: 10, padding: "13px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: T.sans, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>Get Started — It's Free</button>
            </section>
            <footer style={{ background: T.navy, color: T.faint, padding: "56px 5% 28px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 44 }}>
                        <div><div style={{ fontSize: 20, fontWeight: 800, color: T.white, fontFamily: T.serif }}>Doc<span style={{ color: "#0EA5E9" }}>Link</span></div><p style={{ fontSize: 14, marginTop: 10, maxWidth: 240, lineHeight: 1.7 }}>Connecting patients with trusted healthcare professionals.</p></div>
                        {[["Quick Links", ["Find Doctors", "How It Works", "For Clinics", "Blog"]], ["Specializations", SPECIALITIES.slice(0, 5)], ["Contact", ["support@doclink.in", "+91 98765 43210", "Mon–Sat, 9am–6pm"]]].map(([title, links]) => (
                            <div key={title}><div style={{ color: T.white, fontWeight: 700, marginBottom: 14, fontSize: 13.5 }}>{title}</div>{links.map(l => <div key={l} style={{ fontSize: 13.5, marginBottom: 8, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = "#60A5FA"} onMouseLeave={e => e.currentTarget.style.color = T.faint}>{l}</div>)}</div>
                        ))}
                    </div>
                    <div style={{ borderTop: "1px solid #1E293B", paddingTop: 22, textAlign: "center", fontSize: 13, color: "#475569" }}>© 2025 DocLink Health Technologies Pvt. Ltd. · All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// LOGIN PAGE
// ════════════════════════════════════════════════════════════════════════════
function LoginPage({ navigate }) {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "", remember: false });
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const validate = () => {
        const e = {};
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
        if (!form.password) e.password = "Password is required";
        return e;
    };

    const handleSubmit = () => {
        const e = validate(); setErrors(e);
        if (Object.keys(e).length > 0) return;
        setLoading(true); setAuthError("");
        setTimeout(() => {
            const user = MOCK_USERS.find(u => u.email === form.email && u.password === form.password);
            if (!user) { setLoading(false); setAuthError("Invalid credentials. Use the demo credentials below."); return; }
            login(user);
            navigate(user.role === "doctor" ? "doctor-dashboard" : "user-dashboard");
        }, 1200);
    };

    return (
        <AuthLayout navigate={navigate} side={{ heading: "Welcome Back 👋", desc: "Sign in to manage your appointments and health records securely.", bullets: ["Access your appointments", "View doctor profiles", "Manage health records", "24/7 support"] }}>
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontFamily: T.serif, fontWeight: 800, fontSize: 30, color: T.navy, margin: "0 0 8px", letterSpacing: "-0.03em" }}>Sign in</h1>
                <p style={{ color: T.muted, fontSize: 14.5 }}>Don't have an account? <span onClick={() => navigate("signup")} style={{ color: T.blue, fontWeight: 600, cursor: "pointer" }}>Create one</span></p>
            </div>
            <div style={{ background: T.bluePale, border: `1px solid ${T.border}`, borderRadius: 10, padding: "11px 14px", fontSize: 13, color: T.blue, marginBottom: 18, lineHeight: 1.7 }}>
                <strong>Demo credentials:</strong><br />
                Patient: patient@demo.com / Demo1234<br />
                Doctor: doctor@demo.com / Demo1234
            </div>
            {authError && <div style={{ background: T.redBg, border: `1px solid #FECACA`, borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: T.red, marginBottom: 18 }}>{authError}</div>}
            <FormInput label="Email address" type="email" value={form.email} autoComplete="email" onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" error={errors.email} />
            <FormInput label="Password" type={showPass ? "text" : "password"} value={form.password} autoComplete="current-password" onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Enter your password" error={errors.password} rightEl={<span onClick={() => setShowPass(p => !p)}><Ic.Eye off={showPass} /></span>} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, marginTop: -6 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13.5, color: T.muted }}>
                    <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} style={{ accentColor: T.blue, width: 15, height: 15 }} /> Remember me
                </label>
                <span style={{ fontSize: 13.5, color: T.blue, fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
            </div>
            <PrimaryBtn onClick={handleSubmit} loading={loading} style={{ width: "100%", justifyContent: "center", padding: "13px" }}>Sign In →</PrimaryBtn>
        </AuthLayout>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// SIGNUP PAGE
// ════════════════════════════════════════════════════════════════════════════
function SignupPage({ navigate }) {
    const { login } = useAuth();
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", role: "patient" });
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Full name is required";
        else if (form.name.trim().length < 2) e.name = "Name too short";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
        if (!form.password) e.password = "Password is required";
        else if (form.password.length < 8) e.password = "At least 8 characters required";
        if (!form.confirm) e.confirm = "Please confirm your password";
        else if (form.password !== form.confirm) e.confirm = "Passwords do not match";
        return e;
    };

    const handleSubmit = () => {
        const e = validate(); setErrors(e);
        if (Object.keys(e).length > 0) return;
        setLoading(true);
        setTimeout(() => {
            const user = { name: form.name, email: form.email, role: form.role === "doctor" ? "doctor" : "patient" };
            login(user);
            navigate(user.role === "doctor" ? "doctor-dashboard" : "user-dashboard");
        }, 1200);
    };

    return (
        <AuthLayout navigate={navigate} side={{ heading: "Join DocLink Today 🩺", desc: "Create your free account and get instant access to 500+ verified doctors.", bullets: ["Book appointments in under 2 minutes", "Verified & rated professionals", "Secure health records", "24/7 patient support"] }}>
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontFamily: T.serif, fontWeight: 800, fontSize: 30, color: T.navy, margin: "0 0 8px", letterSpacing: "-0.03em" }}>Create account</h1>
                <p style={{ color: T.muted, fontSize: 14.5 }}>Already have an account? <span onClick={() => navigate("login")} style={{ color: T.blue, fontWeight: 600, cursor: "pointer" }}>Sign in</span></p>
            </div>
            <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 10, padding: 4, marginBottom: 22 }}>
                {[["patient", "I'm a Patient"], ["doctor", "I'm a Doctor"]].map(([val, label]) => (
                    <button key={val} onClick={() => setForm(f => ({ ...f, role: val }))}
                        style={{ flex: 1, padding: "9px 0", borderRadius: 8, border: "none", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: T.sans, transition: "all 0.2s", background: form.role === val ? T.white : "transparent", color: form.role === val ? T.blue : T.muted, boxShadow: form.role === val ? "0 1px 6px rgba(0,0,0,0.1)" : "none" }}>
                        {label}
                    </button>
                ))}
            </div>
            <FormInput label="Full Name" value={form.name} autoComplete="name" onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder={form.role === "doctor" ? "Dr. Rahul Sharma" : "Priya Mehta"} error={errors.name} />
            <FormInput label="Email address" type="email" value={form.email} autoComplete="email" onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" error={errors.email} />
            <FormInput label="Password" type={showPass ? "text" : "password"} value={form.password} autoComplete="new-password" onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Create a strong password" error={errors.password} rightEl={<span onClick={() => setShowPass(p => !p)}><Ic.Eye off={showPass} /></span>} />
            <PasswordStrength password={form.password} />
            <FormInput label="Confirm Password" type={showConfirm ? "text" : "password"} value={form.confirm} autoComplete="new-password" onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} placeholder="Repeat your password" error={errors.confirm} rightEl={<span onClick={() => setShowConfirm(p => !p)}><Ic.Eye off={showConfirm} /></span>} />
            <PrimaryBtn onClick={handleSubmit} loading={loading} style={{ width: "100%", justifyContent: "center", padding: "13px" }}>Create Account →</PrimaryBtn>
            <p style={{ textAlign: "center", fontSize: 12.5, color: T.faint, marginTop: 16, lineHeight: 1.6 }}>
                By signing up you agree to our <span style={{ color: T.blue, cursor: "pointer" }}>Terms</span> and <span style={{ color: T.blue, cursor: "pointer" }}>Privacy Policy</span>.
            </p>
        </AuthLayout>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// DASHBOARD CONTAINERS
// ════════════════════════════════════════════════════════════════════════════
function UserDashboardPage({ navigate }) {
    const [subPage, setSubPage] = useState("dashboard");
    const [appointments, setAppointments] = useState(INIT_APPOINTMENTS);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleBookFromSearch = (doctor) => { setSelectedDoctor(doctor); setSubPage("book"); };

    return (
        <DashboardLayout navigate={navigate} subPage={subPage} setSubPage={setSubPage} role="patient">
            {subPage === "dashboard" && <UserDashboardHome appointments={appointments} setSubPage={setSubPage} />}
            {subPage === "search" && <SearchDoctors onBook={handleBookFromSearch} />}
            {subPage === "book" && <BookAppointment appointments={appointments} setAppointments={setAppointments} selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor} setSubPage={setSubPage} />}
            {subPage === "appointments" && <MyAppointments appointments={appointments} setAppointments={setAppointments} />}
        </DashboardLayout>
    );
}

function DoctorDashboardPage({ navigate }) {
    const [subPage, setSubPage] = useState("dashboard");
    const [requests, setRequests] = useState(INIT_APPOINTMENTS);
    return (
        <DashboardLayout navigate={navigate} subPage={subPage} setSubPage={setSubPage} role="doctor">
            {subPage === "dashboard" && <DoctorDashboardHome requests={requests} setSubPage={setSubPage} />}
            {subPage === "requests" && <AppointmentRequests requests={requests} setRequests={setRequests} />}
            {subPage === "schedule" && <ScheduleManager />}
            {subPage === "patients" && <MyPatients requests={requests} />}
        </DashboardLayout>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// PROTECTED ROUTE
// ════════════════════════════════════════════════════════════════════════════
function ProtectedRoute({ children, requiredRole, navigate }) {
    const { auth } = useAuth();
    useEffect(() => {
        if (!auth) { navigate("login"); return; }
        if (requiredRole && auth.role !== requiredRole) navigate(auth.role === "doctor" ? "doctor-dashboard" : "user-dashboard");
    }, [auth]);
    if (!auth) return null;
    if (requiredRole && auth.role !== requiredRole) return null;
    return children;
}

// ════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════════════════════
function AppInner() {
    const { auth } = useAuth();
    const [page, setPage] = useState(() => {
        if (auth) return auth.role === "doctor" ? "doctor-dashboard" : "user-dashboard";
        return "home";
    });
    const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

    return (
        <>
            <style>{`*{margin:0;padding:0;box-sizing:border-box;}body{background:#F8FAFF;}@keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}`}</style>
            {page === "home" && <HomePage navigate={navigate} />}
            {page === "login" && <LoginPage navigate={navigate} />}
            {page === "signup" && <SignupPage navigate={navigate} />}
            {page === "user-dashboard" && <ProtectedRoute requiredRole="patient" navigate={navigate}><UserDashboardPage navigate={navigate} /></ProtectedRoute>}
            {page === "doctor-dashboard" && <ProtectedRoute requiredRole="doctor" navigate={navigate}><DoctorDashboardPage navigate={navigate} /></ProtectedRoute>}
        </>
    );
}

export default function App() {
    return (
        <>
            <FontLink />
            <AuthProvider><AppInner /></AuthProvider>
        </>
    );
}
