import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabaseClient";
import { Phone, Mail, MapPin, Building2, Plus, X, Search, ChevronDown, ChevronRight, MessageCircle, FileText, Calendar, Clock, User, Users, Send, Paperclip, Check, AlertCircle, ArrowRight, MoreVertical, Edit3, Trash2, Eye, Filter, SortAsc, Download, Upload, Instagram, Copy, ClipboardCheck, LogOut, Lock } from "lucide-react";

/* ── constants ── */
const STAGES = [
  { id: 1, name: "Prospección", color: "#BA7517", bg: "#FAEEDA", desc: "Identificar aliados potenciales" },
  { id: 2, name: "Acercamiento", color: "#185FA5", bg: "#E6F1FB", desc: "Primer contacto y agendar cita" },
  { id: 3, name: "Presentación", color: "#0F6E56", bg: "#E1F5EE", desc: "Reunión y demostración de valor" },
  { id: 4, name: "Onboarding", color: "#993C1D", bg: "#FAECE7", desc: "Capacitación y activación" },
  { id: 5, name: "Activo", color: "#3B6D11", bg: "#EAF3DE", desc: "Aliado operando" },
];

const WA_TEMPLATES = [
  { id: "cita", label: "Agendar primera cita", msg: "Hola {nombre}, soy del equipo de Créditos Visibles. Ofrecemos financiamiento de acabados para vivienda que puede ayudarte a incrementar tus ventas y subir tu ticket promedio. Tú recibes el pago completo y nosotros nos encargamos del recaudo. ¿Podríamos agendar una breve reunión esta semana para contarte más?" },
  { id: "seguimiento", label: "Seguimiento post-reunión", msg: "Hola {nombre}, fue un gusto conversar contigo. Como te comenté, en Créditos Visibles tenemos más del 75% de aprobación y respuesta en máximo 2 días hábiles. ¿Tienes alguna duda adicional? Quedo atento para avanzar con la alianza." },
  { id: "docs", label: "Solicitar documentación", msg: "Hola {nombre}, para formalizar nuestra alianza necesitamos los siguientes documentos: RUT, Cámara de Comercio y cédula del Representante Legal. ¿Puedes enviarlos esta semana?" },
  { id: "activacion", label: "Activación de alianza", msg: "Hola {nombre}, ¡ya estamos listos! Tu equipo está capacitado y el canal de soporte activo. Cuando tengas tu primer cliente interesado en financiamiento, escríbeme y lo procesamos juntos. ¡Éxitos!" },
  { id: "custom", label: "Mensaje personalizado", msg: "" },
];

const INTERACTION_TYPES = [
  { id: "llamada", label: "Llamada", icon: "📞" },
  { id: "reunion", label: "Reunión", icon: "🤝" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
  { id: "email", label: "Email", icon: "📧" },
  { id: "nota", label: "Nota interna", icon: "📝" },
];

const fmtDate = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
};
const fmtDateTime = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("es-CO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
};

/* ══════════════════════════════════════════
   LOGIN SCREEN
   ══════════════════════════════════════════ */
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");

  const handleSubmit = async () => {
    if (!email || !password) { setError("Completa todos los campos"); return; }
    setLoading(true); setError("");
    try {
      let result;
      if (mode === "login") {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }
      if (result.error) throw result.error;
      if (mode === "signup") setError("¡Cuenta creada! Revisa tu correo para confirmar.");
    } catch (err) {
      setError(err.message === "Invalid login credentials" ? "Correo o contraseña incorrectos" : err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f0", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", background: "#F2A623", borderRadius: 12, padding: "10px 18px", fontWeight: 800, fontSize: 22, color: "#1a1a1a", marginBottom: 12 }}>CV</div>
          <div style={{ fontWeight: 700, fontSize: 22, color: "#1a1a1a" }}>Créditos Visibles</div>
          <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>CRM de Aliados Comerciales</div>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </div>
          {error && (
            <div style={{ padding: "8px 12px", borderRadius: 8, background: error.includes("creada") ? "#EAF3DE" : "#FAECE7", color: error.includes("creada") ? "#3B6D11" : "#993C1D", fontSize: 12, marginBottom: 14, lineHeight: 1.5 }}>
              {error}
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "#666", display: "block", marginBottom: 4 }}>Correo electrónico</label>
            <div style={{ position: "relative" }}>
              <Mail size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com"
                onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
                style={{ width: "100%", padding: "10px 12px 10px 32px", fontSize: 14, borderRadius: 8, border: "1.5px solid #e0e0e0", outline: "none", boxSizing: "border-box" }} />
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "#666", display: "block", marginBottom: 4 }}>Contraseña</label>
            <div style={{ position: "relative" }}>
              <Lock size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#bbb" }} />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
                style={{ width: "100%", padding: "10px 12px 10px 32px", fontSize: 14, borderRadius: 8, border: "1.5px solid #e0e0e0", outline: "none", boxSizing: "border-box" }} />
            </div>
          </div>
          <button onClick={handleSubmit} disabled={loading} style={{
            width: "100%", padding: "11px 0", fontSize: 14, fontWeight: 600, border: "none", borderRadius: 8,
            background: loading ? "#ddd" : "#F2A623", color: loading ? "#aaa" : "#1a1a1a", cursor: loading ? "default" : "pointer",
          }}>
            {loading ? "Cargando..." : mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
              style={{ background: "none", border: "none", color: "#185FA5", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
              {mode === "login" ? "¿No tienes cuenta? Crear una" : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SHARED COMPONENTS
   ══════════════════════════════════════════ */
function Modal({ children, onClose, title, wide }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.4)", padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "white", borderRadius: 14, width: wide ? 700 : 440, maxWidth: "95vw", maxHeight: "90vh", overflow: "auto", padding: "20px 24px", position: "relative" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: title ? 16 : 0 }}>
          {title && <div style={{ fontWeight: 600, fontSize: 16 }}>{title}</div>}
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 4, marginLeft: "auto" }}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function AllyForm({ onSubmit, initial }) {
  const [form, setForm] = useState(initial || { name: "", company: "", phone: "", email: "", city: "", instagram: "" });
  const set = (k, v) => setForm({ ...form, [k]: v });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { k: "name", label: "Nombre completo", ph: "Ej: Carlos Méndez", icon: <User size={14} /> },
        { k: "company", label: "Empresa", ph: "Ej: Acabados Premium SAS", icon: <Building2 size={14} /> },
        { k: "phone", label: "Teléfono (sin +57)", ph: "Ej: 3101234567", icon: <Phone size={14} /> },
        { k: "email", label: "Correo electrónico", ph: "Ej: carlos@empresa.com", icon: <Mail size={14} /> },
        { k: "city", label: "Ciudad", ph: "Ej: Bogotá", icon: <MapPin size={14} /> },
        { k: "instagram", label: "Instagram", ph: "Ej: https://instagram.com/empresa", icon: <Instagram size={14} /> },
      ].map(f => (
        <div key={f.k}>
          <label style={{ fontSize: 12, fontWeight: 500, color: "#666", marginBottom: 4, display: "block" }}>{f.label}</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#bbb" }}>{f.icon}</span>
            <input value={form[f.k] || ""} onChange={e => set(f.k, e.target.value)} placeholder={f.ph}
              style={{ width: "100%", padding: "9px 12px 9px 32px", fontSize: 13, borderRadius: 8, border: "1px solid #ddd", outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
      ))}
      <button onClick={() => { if (form.name && form.company && form.phone) onSubmit(form); }}
        disabled={!form.name || !form.company || !form.phone}
        style={{
          marginTop: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, border: "none", borderRadius: 8, cursor: "pointer",
          background: form.name && form.company && form.phone ? "#F2A623" : "#e5e5e0",
          color: form.name && form.company && form.phone ? "#1a1a1a" : "#aaa"
        }}>
        {initial ? "Guardar cambios" : "Agregar aliado"}
      </button>
    </div>
  );
}

function AllyDetail({ ally, tab, setTab, onUpdate, onMove, onWA, onEdit, newInteraction, setNewInteraction, onAddInteraction }) {
  const stage = STAGES.find(s => s.id === ally.stage);
  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-3" style={{ marginBottom: 16 }}>
        <div>
          <div className="flex items-center gap-2">
            <div style={{ fontWeight: 700, fontSize: 20 }}>{ally.name}</div>
            <button onClick={onEdit} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb" }}><Edit3 size={14} /></button>
          </div>
          <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{ally.company}</div>
          <div className="flex items-center gap-3 flex-wrap" style={{ marginTop: 8 }}>
            <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#888" }}><Phone size={12} />{ally.phone}</span>
            {ally.email && <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#888" }}><Mail size={12} />{ally.email}</span>}
            {ally.city && <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#888" }}><MapPin size={12} />{ally.city}</span>}
            {ally.instagram && <a href={ally.instagram.startsWith("http") ? ally.instagram : "https://" + ally.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ fontSize: 12, color: "#E1306C", textDecoration: "none" }}><Instagram size={12} />Instagram</a>}
          </div>
        </div>
        <button onClick={onWA} className="flex items-center gap-1"
          style={{ padding: "7px 12px", fontSize: 12, fontWeight: 500, background: "#25D366", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}>
          <MessageCircle size={13} /> WhatsApp
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#888", marginBottom: 6 }}>ETAPA ACTUAL</div>
        <div className="flex gap-1 flex-wrap">
          {STAGES.map(s => (
            <button key={s.id} onClick={() => onMove(s.id)} className="flex items-center gap-1" style={{
              padding: "5px 10px", fontSize: 11, fontWeight: ally.stage === s.id ? 600 : 400, borderRadius: 6,
              border: ally.stage === s.id ? `2px solid ${s.color}` : "1px solid #ddd",
              background: ally.stage === s.id ? s.bg : "transparent", color: ally.stage === s.id ? s.color : "#999", cursor: "pointer"
            }}>
              {ally.stage > s.id && <Check size={10} />}{s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-1" style={{ borderBottom: "1px solid #eee", marginBottom: 16 }}>
        {[{ id: "info", label: "Información" }, { id: "historial", label: "Historial" }, { id: "docs", label: "Documentos" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 14px", fontSize: 12, fontWeight: tab === t.id ? 600 : 400,
            color: tab === t.id ? "#1a1a1a" : "#888", background: "none", border: "none",
            borderBottom: tab === t.id ? "2px solid #F2A623" : "2px solid transparent", cursor: "pointer"
          }}>{t.label}</button>
        ))}
      </div>

      {tab === "info" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#888" }}>DATOS DE LA EMPRESA</div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: "#666", marginBottom: 4, display: "block" }}>NIT</label>
            <input value={ally.nit || ""} onChange={e => onUpdate({ nit: e.target.value })} placeholder="Ej: 900123456-7"
              style={{ width: "100%", padding: "8px 12px", fontSize: 13, borderRadius: 8, border: "1px solid #ddd", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: "#666", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}><Instagram size={12} /> Instagram</label>
            <div className="flex gap-2">
              <input value={ally.instagram || ""} onChange={e => onUpdate({ instagram: e.target.value })} placeholder="Ej: https://instagram.com/empresa"
                style={{ flex: 1, padding: "8px 12px", fontSize: 13, borderRadius: 8, border: "1px solid #ddd", outline: "none", boxSizing: "border-box" }} />
              {ally.instagram && (
                <a href={ally.instagram.startsWith("http") ? ally.instagram : "https://" + ally.instagram} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 10px", borderRadius: 8, background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", color: "white", fontSize: 12, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap", gap: 4 }}>
                  <Eye size={12} /> Ver
                </a>
              )}
            </div>
          </div>
          <div style={{ padding: 16, background: "#f9f9f6", borderRadius: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#666", marginBottom: 8 }}>Resumen rápido</div>
            <div className="flex flex-wrap gap-4" style={{ fontSize: 12 }}>
              <div><span style={{ color: "#aaa" }}>Registro: </span>{fmtDate(ally.created_at)}</div>
              <div><span style={{ color: "#aaa" }}>Interacciones: </span>{ally.interactions?.length || 0}</div>
              <div><span style={{ color: "#aaa" }}>Docs completos: </span>{[ally.rut_doc, ally.camara_com, ally.cedula_doc, ally.contrato_doc].filter(Boolean).length}/4</div>
            </div>
          </div>
        </div>
      )}

      {tab === "historial" && (
        <div>
          <div style={{ padding: 14, background: "#f9f9f6", borderRadius: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#666", marginBottom: 8 }}>Nueva interacción</div>
            <div className="flex gap-2 flex-wrap">
              <select value={newInteraction.type} onChange={e => setNewInteraction({ ...newInteraction, type: e.target.value })}
                style={{ padding: "7px 10px", fontSize: 12, borderRadius: 8, border: "1px solid #ddd" }}>
                {INTERACTION_TYPES.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
              </select>
              <input value={newInteraction.note} onChange={e => setNewInteraction({ ...newInteraction, note: e.target.value })}
                placeholder="Describe la interacción..." onKeyDown={e => { if (e.key === "Enter") onAddInteraction(); }}
                style={{ flex: 1, minWidth: 180, padding: "7px 12px", fontSize: 12, borderRadius: 8, border: "1px solid #ddd", outline: "none" }} />
              <button onClick={onAddInteraction} disabled={!newInteraction.note.trim()}
                style={{ padding: "7px 14px", fontSize: 12, fontWeight: 500, background: newInteraction.note.trim() ? "#F2A623" : "#e5e5e0", color: newInteraction.note.trim() ? "#1a1a1a" : "#aaa", border: "none", borderRadius: 8, cursor: "pointer" }}>
                Agregar
              </button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[...(ally.interactions || [])].reverse().map((inter) => {
              const it = INTERACTION_TYPES.find(t => t.id === inter.type);
              return (
                <div key={inter.id} className="flex gap-3" style={{ padding: "10px 0", borderBottom: "1px solid #f0f0ec" }}>
                  <div style={{ fontSize: 16, width: 28, textAlign: "center", flexShrink: 0, paddingTop: 2 }}>{it?.icon || "📝"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, lineHeight: 1.5 }}>{inter.note}</div>
                    <div style={{ fontSize: 11, color: "#bbb", marginTop: 4 }}>{fmtDateTime(inter.created_at)} — {it?.label}</div>
                  </div>
                </div>
              );
            })}
            {(!ally.interactions || ally.interactions.length === 0) && (
              <div style={{ padding: 24, textAlign: "center", color: "#ccc", fontSize: 13 }}>Sin interacciones registradas</div>
            )}
          </div>
        </div>
      )}

      {tab === "docs" && (
        <div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 12, lineHeight: 1.5 }}>
            Marca los documentos que ya has recibido del aliado.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { key: "rut_doc", label: "RUT", desc: "Registro Único Tributario" },
              { key: "camara_com", label: "Cámara de Comercio", desc: "Certificado de existencia y representación" },
              { key: "cedula_doc", label: "Cédula Rep. Legal", desc: "Documento de identidad del representante" },
              { key: "contrato_doc", label: "Contrato de alianza", desc: "Acuerdo comercial firmado" },
              { key: "otro_doc", label: "Otros documentos", desc: "Documentación adicional" },
            ].map(doc => (
              <label key={doc.key} className="flex items-center gap-3" style={{
                padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                border: ally[doc.key] ? "1px solid #86efac" : "1px solid #ddd",
                background: ally[doc.key] ? "#f0fdf4" : "transparent", transition: "all 0.15s"
              }}>
                <input type="checkbox" checked={!!ally[doc.key]} onChange={e => onUpdate({ [doc.key]: e.target.checked })}
                  style={{ width: 18, height: 18, accentColor: "#22c55e", cursor: "pointer" }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: ally[doc.key] ? "#166534" : "#333" }}>{doc.label}</div>
                  <div style={{ fontSize: 11, color: ally[doc.key] ? "#4ade80" : "#bbb" }}>{doc.desc}</div>
                </div>
                {ally[doc.key] && <Check size={16} style={{ marginLeft: "auto", color: "#22c55e" }} />}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN CRM APP
   ══════════════════════════════════════════ */
function CRM({ user }) {
  const [allies, setAllies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("pipeline");
  const [showForm, setShowForm] = useState(false);
  const [selectedAlly, setSelectedAlly] = useState(null);
  const [detailTab, setDetailTab] = useState("info");
  const [search, setSearch] = useState("");
  const [editingAlly, setEditingAlly] = useState(null);
  const [showWA, setShowWA] = useState(false);
  const [waTemplate, setWaTemplate] = useState(null);
  const [customMsg, setCustomMsg] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [newInteraction, setNewInteraction] = useState({ type: "llamada", note: "" });
  const [stageFilter, setStageFilter] = useState(0);
  const [dragAlly, setDragAlly] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  /* ── Load allies + interactions from Supabase ── */
  const fetchAllies = useCallback(async () => {
    const { data, error } = await supabase
      .from("allies")
      .select("*, interactions(*)") 
      .order("created_at", { ascending: false });
    if (!error && data) {
      const sorted = data.map(a => ({
        ...a,
        interactions: (a.interactions || []).sort((x, y) => new Date(x.created_at) - new Date(y.created_at)),
      }));
      setAllies(sorted);
    }
    setLoaded(true);
  }, []);

  useEffect(() => { fetchAllies(); }, [fetchAllies]);

  /* ── CRUD helpers ── */
  const addAlly = async (form) => {
    const { data, error } = await supabase.from("allies").insert({
      name: form.name, company: form.company, phone: form.phone,
      email: form.email || null, city: form.city || null, instagram: form.instagram || null,
      stage: 1, nit: null, rut_doc: false, camara_com: false,
      cedula_doc: false, contrato_doc: false, otro_doc: false,
    }).select().single();
    if (!error && data) {
      await supabase.from("interactions").insert({ ally_id: data.id, type: "nota", note: "Aliado registrado en el CRM" });
      await fetchAllies();
    }
    setShowForm(false);
  };

  const updateAlly = async (id, updates) => {
    await supabase.from("allies").update(updates).eq("id", id);
    setAllies(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    if (selectedAlly?.id === id) setSelectedAlly(prev => ({ ...prev, ...updates }));
  };

  const deleteAlly = async (id) => {
    await supabase.from("interactions").delete().eq("ally_id", id);
    await supabase.from("allies").delete().eq("id", id);
    setAllies(prev => prev.filter(a => a.id !== id));
    if (selectedAlly?.id === id) setSelectedAlly(null);
    setConfirmDelete(null);
  };

  const moveStage = async (id, newStage) => {
    const ally = allies.find(a => a.id === id);
    if (!ally || ally.stage === newStage) return;
    await supabase.from("allies").update({ stage: newStage }).eq("id", id);
    await supabase.from("interactions").insert({ ally_id: id, type: "nota", note: `Movido a etapa: ${STAGES.find(s => s.id === newStage)?.name}` });
    await fetchAllies();
  };

  const addInteraction = async (allyId) => {
    if (!newInteraction.note.trim()) return;
    await supabase.from("interactions").insert({ ally_id: allyId, type: newInteraction.type, note: newInteraction.note.trim() });
    setNewInteraction({ type: "llamada", note: "" });
    await fetchAllies();
  };

  const openWhatsApp = async (ally, template) => {
    const msg = template.id === "custom" ? customMsg : template.msg.replace(/{nombre}/g, ally.name.split(" ")[0]);
    const phone = "57" + ally.phone.replace(/\D/g, "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
    await supabase.from("interactions").insert({ ally_id: ally.id, type: "whatsapp", note: `Mensaje enviado: ${template.label}` });
    await fetchAllies();
    setShowWA(false); setCustomMsg("");
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  const filtered = allies.filter(a => {
    const s = search.toLowerCase();
    const matchSearch = !s || a.name?.toLowerCase().includes(s) || a.company?.toLowerCase().includes(s) || a.city?.toLowerCase().includes(s) || a.phone?.includes(s);
    const matchStage = stageFilter === 0 || a.stage === stageFilter;
    return matchSearch && matchStage;
  });

  const stats = {
    total: allies.length,
    activos: allies.filter(a => a.stage === 5).length,
    enProceso: allies.filter(a => a.stage > 1 && a.stage < 5).length,
    prospectos: allies.filter(a => a.stage === 1).length,
  };

  if (!loaded) return <div className="flex items-center justify-center" style={{ minHeight: "100vh" }}><div style={{ color: "#aaa" }}>Cargando CRM...</div></div>;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#1a1a1a", color: "white", padding: "16px 24px" }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div style={{ background: "#F2A623", borderRadius: 8, padding: "6px 10px", fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>CV</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 17, letterSpacing: -0.3 }}>Créditos Visibles</div>
              <div style={{ fontSize: 11, opacity: 0.5, marginTop: -1 }}>CRM de Aliados Comerciales</div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            {[
              { k: "total", l: "Total", v: stats.total, c: "#888" },
              { k: "activos", l: "Activos", v: stats.activos, c: "#4ade80" },
              { k: "proceso", l: "En proceso", v: stats.enProceso, c: "#F2A623" },
              { k: "prospectos", l: "Prospectos", v: stats.prospectos, c: "#93c5fd" },
            ].map(s => (
              <div key={s.k} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "6px 14px", textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 10, opacity: 0.45 }}>{s.l}</div>
              </div>
            ))}
            <button onClick={handleLogout} title="Cerrar sesión" style={{
              background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "8px 10px",
              cursor: "pointer", color: "#888", display: "flex", alignItems: "center", gap: 4, fontSize: 11,
            }}><LogOut size={14} /></button>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e5e0", padding: "0 24px" }}>
        <div className="flex items-center justify-between flex-wrap gap-2" style={{ paddingTop: 8 }}>
          <div className="flex gap-1">
            {[{ id: "pipeline", label: "Pipeline", icon: <Filter size={14} /> }, { id: "database", label: "Base de datos", icon: <Users size={14} /> }].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="flex items-center gap-1" style={{
                padding: "8px 16px", fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
                color: tab === t.id ? "#1a1a1a" : "#888",
                borderBottom: tab === t.id ? "2px solid #F2A623" : "2px solid transparent",
                background: "none", border: "none", cursor: "pointer"
              }}>{t.icon}{t.label}</button>
            ))}
          </div>
          <div className="flex items-center gap-2" style={{ paddingBottom: 8 }}>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#aaa" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar aliado..."
                style={{ padding: "7px 12px 7px 32px", fontSize: 13, border: "1px solid #ddd", borderRadius: 8, width: 200, outline: "none", background: "#f9f9f6" }} />
            </div>
            <button onClick={() => { setShowForm(true); setEditingAlly(null); }} className="flex items-center gap-1"
              style={{ padding: "7px 14px", fontSize: 13, fontWeight: 500, background: "#F2A623", color: "#1a1a1a", border: "none", borderRadius: 8, cursor: "pointer" }}>
              <Plus size={14} /> Nuevo aliado
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 24px", maxWidth: 1400 }}>

        {/* Pipeline */}
        {tab === "pipeline" && (
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 16 }}>
            {STAGES.map(stage => {
              const stageAllies = filtered.filter(a => a.stage === stage.id);
              return (
                <div key={stage.id} style={{ minWidth: 220, flex: 1, maxWidth: 280 }}
                  onDragOver={e => e.preventDefault()} onDrop={() => { if (dragAlly) { moveStage(dragAlly, stage.id); setDragAlly(null); } }}>
                  <div style={{ background: stage.bg, borderRadius: 10, padding: "10px 12px", marginBottom: 8, borderLeft: `3px solid ${stage.color}` }}>
                    <div className="flex items-center justify-between">
                      <span style={{ fontSize: 13, fontWeight: 600, color: stage.color }}>{stage.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: stage.color, background: "rgba(255,255,255,0.6)", borderRadius: 10, padding: "1px 8px" }}>{stageAllies.length}</span>
                    </div>
                    <div style={{ fontSize: 10, color: stage.color, opacity: 0.7, marginTop: 2 }}>{stage.desc}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 60 }}>
                    {stageAllies.map(ally => (
                      <div key={ally.id} draggable onDragStart={() => setDragAlly(ally.id)}
                        onClick={() => { setSelectedAlly(ally); setDetailTab("info"); }}
                        style={{ background: "white", borderRadius: 10, border: "1px solid #e8e8e4", padding: "10px 12px", cursor: "pointer", transition: "box-shadow 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{ally.name}</div>
                        <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{ally.company}</div>
                        <div className="flex items-center justify-between" style={{ marginTop: 8 }}>
                          <div className="flex items-center gap-1" style={{ fontSize: 10, color: "#aaa" }}><MapPin size={10} />{ally.city}</div>
                          <div className="flex gap-1">
                            <button onClick={e => { e.stopPropagation(); setSelectedAlly(ally); setShowWA(true); }} style={{
                              background: "#25D366", color: "white", border: "none", borderRadius: 5, width: 24, height: 24,
                              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                            }}><MessageCircle size={12} /></button>
                          </div>
                        </div>
                        {ally.interactions?.length > 0 && (
                          <div style={{ fontSize: 10, color: "#bbb", marginTop: 6, borderTop: "1px solid #eee", paddingTop: 6 }}>
                            Última: {fmtDate(ally.interactions[ally.interactions.length - 1]?.created_at)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Database */}
        {tab === "database" && (
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #e8e8e4", overflow: "hidden" }}>
            <div className="flex items-center gap-2 flex-wrap" style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
              <span style={{ fontSize: 12, color: "#888" }}>Filtrar etapa:</span>
              <select value={stageFilter} onChange={e => setStageFilter(Number(e.target.value))} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #ddd", background: "#f9f9f6" }}>
                <option value={0}>Todas</option>
                {STAGES.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <span style={{ fontSize: 12, color: "#aaa", marginLeft: "auto" }}>{filtered.length} aliados</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f9f9f6" }}>
                    {["Nombre", "Empresa", "Teléfono", "Ciudad", "Etapa", "Registro", "Docs", "Acciones"].map(h => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 500, fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(ally => {
                    const stage = STAGES.find(s => s.id === ally.stage);
                    const docCount = [ally.rut_doc, ally.camara_com, ally.cedula_doc, ally.contrato_doc].filter(Boolean).length;
                    return (
                      <tr key={ally.id} onClick={() => { setSelectedAlly(ally); setDetailTab("info"); }}
                        style={{ borderBottom: "1px solid #eee", cursor: "pointer" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fafaf8"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "10px 12px", fontWeight: 500 }}>{ally.name}</td>
                        <td style={{ padding: "10px 12px", color: "#666" }}>{ally.company}</td>
                        <td style={{ padding: "10px 12px" }}><a href={`tel:${ally.phone}`} style={{ color: "#185FA5", textDecoration: "none" }}>{ally.phone}</a></td>
                        <td style={{ padding: "10px 12px", color: "#666" }}>{ally.city}</td>
                        <td style={{ padding: "10px 12px" }}>
                          <span style={{ background: stage?.bg, color: stage?.color, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{stage?.name}</span>
                        </td>
                        <td style={{ padding: "10px 12px", color: "#999", fontSize: 12 }}>{fmtDate(ally.created_at)}</td>
                        <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 11, color: docCount === 4 ? "#0F6E56" : "#999" }}>{docCount}/4</span></td>
                        <td style={{ padding: "10px 12px" }}>
                          <div className="flex gap-1">
                            <button onClick={e => { e.stopPropagation(); setSelectedAlly(ally); setShowWA(true); }}
                              style={{ background: "#25D366", color: "white", border: "none", borderRadius: 5, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><MessageCircle size={12} /></button>
                            <button onClick={e => { e.stopPropagation(); setConfirmDelete(ally.id); }}
                              style={{ background: "#fef2f2", color: "#dc2626", border: "none", borderRadius: 5, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Trash2 size={12} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filtered.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "#aaa", fontSize: 13 }}>No se encontraron aliados</div>}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)} title={editingAlly ? "Editar aliado" : "Nuevo aliado"}>
          <AllyForm onSubmit={(data) => {
            if (editingAlly) { updateAlly(editingAlly.id, data); setShowForm(false); }
            else addAlly(data);
          }} initial={editingAlly} />
        </Modal>
      )}

      {selectedAlly && !showWA && (
        <Modal onClose={() => setSelectedAlly(null)} wide>
          <AllyDetail
            ally={allies.find(a => a.id === selectedAlly.id) || selectedAlly}
            tab={detailTab} setTab={setDetailTab}
            onUpdate={(updates) => updateAlly(selectedAlly.id, updates)}
            onMove={(stage) => moveStage(selectedAlly.id, stage)}
            onWA={() => setShowWA(true)}
            onEdit={() => { setEditingAlly(allies.find(a => a.id === selectedAlly.id)); setShowForm(true); }}
            newInteraction={newInteraction} setNewInteraction={setNewInteraction}
            onAddInteraction={() => addInteraction(selectedAlly.id)}
          />
        </Modal>
      )}

      {showWA && selectedAlly && (
        <Modal onClose={() => { setShowWA(false); setWaTemplate(null); setCustomMsg(""); setCopiedId(null); }} title="Enviar WhatsApp">
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 12 }}>
              Enviando a: <strong>{selectedAlly.name}</strong> ({selectedAlly.phone})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {WA_TEMPLATES.map(t => {
                const resolvedMsg = t.id !== "custom" ? t.msg.replace(/{nombre}/g, selectedAlly.name.split(" ")[0]) : "";
                return (
                  <div key={t.id} onClick={() => setWaTemplate(t)} style={{
                    padding: "10px 14px", borderRadius: 8, cursor: "pointer",
                    border: waTemplate?.id === t.id ? "2px solid #25D366" : "1px solid #ddd",
                    background: waTemplate?.id === t.id ? "#f0fdf4" : "transparent"
                  }}>
                    <div className="flex items-center justify-between">
                      <div style={{ fontWeight: 500, fontSize: 13 }}>{t.label}</div>
                      {t.id !== "custom" && (
                        <button onClick={e => { e.stopPropagation(); navigator.clipboard.writeText(resolvedMsg).then(() => { setCopiedId(t.id); setTimeout(() => setCopiedId(null), 2000); }); }}
                          style={{ background: copiedId === t.id ? "#DEF7EC" : "#f5f5f2", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 500, color: copiedId === t.id ? "#0F6E56" : "#888" }}>
                          {copiedId === t.id ? <><ClipboardCheck size={12} /> Copiado</> : <><Copy size={12} /> Copiar</>}
                        </button>
                      )}
                    </div>
                    {t.id !== "custom" && <div style={{ fontSize: 11, color: "#999", marginTop: 4, lineHeight: 1.5 }}>{resolvedMsg.slice(0, 120)}...</div>}
                  </div>
                );
              })}
            </div>
            {waTemplate?.id === "custom" && (
              <textarea value={customMsg} onChange={e => setCustomMsg(e.target.value)} placeholder="Escribe tu mensaje personalizado..."
                style={{ width: "100%", marginTop: 12, padding: 12, fontSize: 13, borderRadius: 8, border: "1px solid #ddd", minHeight: 80, resize: "vertical", outline: "none", boxSizing: "border-box" }} />
            )}
            {waTemplate && (
              <div className="flex gap-2" style={{ marginTop: 16 }}>
                <button onClick={() => { const msg = waTemplate.id === "custom" ? customMsg : waTemplate.msg.replace(/{nombre}/g, selectedAlly.name.split(" ")[0]); navigator.clipboard.writeText(msg).then(() => { setCopiedId("action"); setTimeout(() => setCopiedId(null), 2000); }); }}
                  className="flex items-center justify-center gap-2" style={{ flex: 1, padding: "10px 0", background: copiedId === "action" ? "#DEF7EC" : "#f0f0ec", color: copiedId === "action" ? "#0F6E56" : "#555", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  {copiedId === "action" ? <><ClipboardCheck size={15} /> Copiado</> : <><Copy size={15} /> Copiar mensaje</>}
                </button>
                <button onClick={() => openWhatsApp(selectedAlly, waTemplate)} className="flex items-center justify-center gap-2"
                  style={{ flex: 1, padding: "10px 0", background: "#25D366", color: "white", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  <Send size={15} /> Abrir WhatsApp
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(null)} title="Eliminar aliado">
          <div style={{ fontSize: 13, color: "#666", marginBottom: 16 }}>¿Estás seguro? Esta acción no se puede deshacer.</div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setConfirmDelete(null)} style={{ padding: "8px 16px", fontSize: 13, border: "1px solid #ddd", borderRadius: 8, background: "transparent", cursor: "pointer" }}>Cancelar</button>
            <button onClick={() => deleteAlly(confirmDelete)} style={{ padding: "8px 16px", fontSize: 13, border: "none", borderRadius: 8, background: "#ef4444", color: "white", fontWeight: 500, cursor: "pointer" }}>Eliminar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   APP WRAPPER (Auth)
   ══════════════════════════════════════════ */
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!supabase) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: 24 }}>
      <div style={{ maxWidth: 480, textAlign: "center" }}>
        <div style={{ display: "inline-flex", background: "#F2A623", borderRadius: 12, padding: "10px 18px", fontWeight: 800, fontSize: 22, color: "#1a1a1a", marginBottom: 16 }}>CV</div>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Configuración requerida</h2>
        <p style={{ color: "#666", lineHeight: 1.6, marginBottom: 16 }}>Agrega las variables de entorno de Supabase en tu archivo <code style={{ background: "#f5f5f0", padding: "2px 6px", borderRadius: 4 }}>.env</code></p>
        <div style={{ background: "#1a1a1a", color: "#4ade80", padding: 16, borderRadius: 10, textAlign: "left", fontSize: 13, fontFamily: "monospace", lineHeight: 1.8 }}>
          VITE_SUPABASE_URL=tu_url<br/>
          VITE_SUPABASE_ANON_KEY=tu_key
        </div>
      </div>
    </div>
  );

  if (loading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ color: "#aaa" }}>Cargando...</div></div>;
  if (!user) return <LoginScreen />;
  return <CRM user={user} />;
}
