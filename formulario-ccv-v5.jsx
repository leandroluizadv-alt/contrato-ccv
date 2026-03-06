import { useState, useRef } from "react";

const EMAILJS_SERVICE = "service_5qe96eu";
const EMAILJS_TEMPLATE = "template_86gjet3";
const EMAILJS_PUBLIC_KEY = "N5ydAfmUb_SOoGMm7";

const C = {
  ouro: "#C8A84B", ouroEsc: "#8B6914", marrom: "#2C1810", marromEsc: "#1A0F08",
  creme: "#FDFAF5", cremeMed: "#F5EDD8", bege: "#D4C5A9",
  verde: "#1A5C35", verdeClaro: "#F0FFF4", verdeBorda: "#A8DFC0",
  vermelho: "#8B0000", vermelhoClaro: "#FFF5F5", vermelhoBorda: "#F0A8A8",
  amarelo: "#7A5000", amareloClaro: "#FFFBF0", amareloBorda: "#E8D080",
  cinza: "#555", cinzaClaro: "#F8F8F8", cinzaBorda: "#D0D0D0",
  azul: "#1A3C5C", azulClaro: "#F0F4FF", azulBorda: "#A8C0DF",
};

const STEPS = [
  { id: "vendedor", label: "Vendedor", icon: "👤" },
  { id: "comprador", label: "Comprador", icon: "👤" },
  { id: "imovel", label: "Imóvel", icon: "📋" },
  { id: "negocio", label: "Negócio", icon: "💰" },
  { id: "intermediadora", label: "Imobiliária", icon: "🏢" },
  { id: "envio", label: "Enviar", icon: "📤" },
];

// ─── Logo do Escritório ──────────────────────────────────────────────
const Logo = () => (
  <div style={{ textAlign: "center", marginBottom: 20 }}>
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ marginBottom: 6, filter: "drop-shadow(0 4px 12px rgba(200,168,75,0.35))" }}>
        <img src="data:image/png;base64,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" alt="Leandro Moura Advocacia" style={{ width: 72, height: 72, objectFit: "contain" }} />
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#F5E6C8", letterSpacing: "0.06em", fontFamily: "Georgia, serif" }}>LEANDRO MOURA</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.ouro, letterSpacing: "0.2em", textTransform: "uppercase" }}>ADVOCACIA</div>
      <div style={{ fontSize: 10, color: C.ouroEsc, letterSpacing: "0.1em" }}>OAB/GO 27.323</div>
    </div>
  </div>
);

// ─── Componentes base ────────────────────────────────────────────────
const Sec = ({ title, icon, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, ${C.ouroEsc}, transparent)` }} />
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: C.ouroEsc, whiteSpace: "nowrap" }}>{icon} {title}</span>
      <div style={{ height: 2, flex: 1, background: `linear-gradient(270deg, ${C.ouroEsc}, transparent)` }} />
    </div>
    {children}
  </div>
);

const Txt = ({ label, value, onChange, placeholder, required, half, type = "text", showErr }) => {
  const [t, setT] = useState(false);
  const inv = required && (t || showErr) && !value?.trim();
  return (
    <div style={{ marginBottom: 10, gridColumn: half ? "span 1" : "span 2" }}>
      <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: inv ? C.vermelho : C.ouroEsc, marginBottom: 3 }}>
        {label}{required && <span style={{ color: C.vermelho }}> *</span>}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} onBlur={() => setT(true)} placeholder={placeholder}
        style={{ width: "100%", padding: "9px 11px", border: `1.5px solid ${inv ? C.vermelhoBorda : C.bege}`, borderRadius: 6, fontSize: 13, fontFamily: "Georgia, serif", background: inv ? C.vermelhoClaro : C.creme, color: C.marrom, outline: "none", boxSizing: "border-box" }}
        onFocus={e => e.target.style.borderColor = C.ouroEsc}
      />
      {inv && <div style={{ fontSize: 10, color: C.vermelho, marginTop: 2 }}>Campo obrigatório</div>}
    </div>
  );
};

const G2 = ({ children }) => <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 12px" }}>{children}</div>;

const Upload = ({ label, sublabel, tag, docs, onUpload, onRemove, required, showErr }) => {
  const ref = useRef();
  const doc = docs[tag];
  const inv = required && showErr && !doc;
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: inv ? C.vermelho : C.ouroEsc, marginBottom: 3 }}>
        {label}{required && <span style={{ color: C.vermelho }}> *</span>}
      </label>
      {sublabel && <div style={{ fontSize: 11, color: C.cinza, marginBottom: 4, fontStyle: "italic" }}>{sublabel}</div>}
      {!doc ? (
        <div onClick={() => ref.current.click()}
          style={{ border: `2px dashed ${inv ? C.vermelhoBorda : C.bege}`, borderRadius: 8, padding: "13px", textAlign: "center", cursor: "pointer", background: inv ? C.vermelhoClaro : C.creme }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.ouroEsc; e.currentTarget.style.background = C.cremeMed; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = inv ? C.vermelhoBorda : C.bege; e.currentTarget.style.background = inv ? C.vermelhoClaro : C.creme; }}>
          <div style={{ fontSize: 20, marginBottom: 3 }}>📎</div>
          <div style={{ fontSize: 12, color: C.ouroEsc, fontWeight: 600 }}>Toque para anexar</div>
          <div style={{ fontSize: 10, color: C.cinza, marginTop: 1 }}>PDF, foto ou imagem escaneada</div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.verdeClaro, border: `1.5px solid ${C.verdeBorda}`, borderRadius: 8, padding: "9px 12px" }}>
          <span>✅</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.marrom }}>{doc.name}</div>
            <div style={{ fontSize: 10, color: C.cinza }}>{(doc.size / 1024).toFixed(1)} KB</div>
          </div>
          <button onClick={() => onRemove(tag)} style={{ background: "none", border: "none", cursor: "pointer", color: C.vermelho, fontSize: 18, padding: "2px 6px" }}>✕</button>
        </div>
      )}
      {inv && <div style={{ fontSize: 10, color: C.vermelho, marginTop: 2 }}>Documento obrigatório</div>}
      <input ref={ref} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={e => { if (e.target.files[0]) onUpload(tag, e.target.files[0]); }} />
    </div>
  );
};

const InfoBox = ({ icon, text, color = C.amarelo, bg = C.amareloClaro, border = C.amareloBorda }) => (
  <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: "9px 13px", marginBottom: 13, fontSize: 12, color, display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.5 }}>
    <span style={{ flexShrink: 0 }}>{icon}</span><span>{text}</span>
  </div>
);

const Toggle = ({ label, value, onChange }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, cursor: "pointer" }} onClick={() => onChange(!value)}>
    <div style={{ width: 44, height: 24, borderRadius: 12, background: value ? C.ouroEsc : C.bege, position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: value ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
    </div>
    <span style={{ fontSize: 13, color: C.marrom, fontFamily: "Georgia, serif" }}>{label}</span>
  </div>
);

// ─── Parte (Vendedor ou Comprador) ───────────────────────────────────
const Parte = ({ prefix, label, docs, onUpload, onRemove, form, setF, showErr, showSecond, setShowSecond, hasProcurador, setHasProcurador }) => {
  const p = prefix; // "vend" or "comp"
  const p2 = prefix === "vend" ? "vend2" : "comp2";
  const tagCnh = `cnh_${p === "vend" ? "vendedor" : "comprador"}`;
  const tagCnh2 = `cnh_${p === "vend" ? "vendedor2" : "comprador2"}`;
  const tagProc = `proc_${p === "vend" ? "vendedor" : "comprador"}`;
  const tagEnd = `end_${p === "vend" ? "vendedor" : "comprador"}`;
  const tagPag = `pag_${p === "vend" ? "vendedor" : "comprador"}`;

  return (
    <div>
      <InfoBox icon="📸" text={`Anexe o documento de identidade do ${label.toLowerCase()}. Os dados serão capturados pelo escritório.`} color={C.azul} bg={C.azulClaro} border={C.azulBorda} />

      <Sec title={`Documento de Identidade — ${label}`} icon="🪪">
        <Upload label={`CNH ou RG do ${label}`} sublabel="Frente e verso em foto nítida, PDF ou imagem escaneada" tag={tagCnh} docs={docs} onUpload={onUpload} onRemove={onRemove} required showErr={showErr} />
        <Upload label="Comprovante de Endereço" sublabel="Conta de água, luz, telefone ou banco — máximo 90 dias" tag={tagEnd} docs={docs} onUpload={onUpload} onRemove={onRemove} required showErr={showErr} />
      </Sec>

      <Sec title={`Contato do ${label}`} icon="📱">
        <G2>
          <Txt label="E-mail" value={form[`${p}_email`]} onChange={setF(`${p}_email`)} placeholder="email@exemplo.com" type="email" half showErr={showErr} />
          <Txt label="WhatsApp" value={form[`${p}_whatsapp`]} onChange={setF(`${p}_whatsapp`)} placeholder="(62) 99999-9999" half showErr={showErr} />
        </G2>
      </Sec>

      <Sec title={`Dados Bancários — ${label}`} icon="🏦">
        <InfoBox icon="ℹ️" text={p === "vend" ? "Para recebimento do valor do imóvel após a venda." : "Para eventual devolução de valores, se necessário."} color={C.cinza} bg="#F5F5F5" border={C.cinzaBorda} />
        <G2>
          <Txt label="Banco" value={form[`${p}_banco`]} onChange={setF(`${p}_banco`)} placeholder="Ex: Caixa Econômica" half showErr={showErr} />
          <Txt label="Agência" value={form[`${p}_agencia`]} onChange={setF(`${p}_agencia`)} placeholder="0000" half showErr={showErr} />
          <Txt label="Conta Corrente" value={form[`${p}_conta`]} onChange={setF(`${p}_conta`)} placeholder="00000-0" half showErr={showErr} />
          <Txt label="PIX (chave)" value={form[`${p}_pix`]} onChange={setF(`${p}_pix`)} placeholder="CPF, e-mail ou telefone" half showErr={showErr} />
        </G2>
      </Sec>

      {/* Procurador */}
      <Sec title={`${label} é representado por procurador?`} icon="📜">
        <Toggle label={`Sim, há procurador para o ${label.toLowerCase()}`} value={hasProcurador} onChange={setHasProcurador} />
        {hasProcurador && (
          <div style={{ background: C.amareloClaro, border: `1px solid ${C.amareloBorda}`, borderRadius: 8, padding: "12px 14px", marginTop: 4 }}>
            <InfoBox icon="⚖️" text="A procuração pública é obrigatória. Anexe o documento original ou cópia autenticada." color={C.amarelo} bg="transparent" border="transparent" />
            <Upload label="Procuração Pública" sublabel="Documento original ou cópia autenticada em cartório" tag={tagProc} docs={docs} onUpload={onUpload} onRemove={onRemove} required showErr={showErr} />
            <G2>
              <Txt label="Nome do Procurador" value={form[`${p}_proc_nome`]} onChange={setF(`${p}_proc_nome`)} placeholder="Nome completo do procurador" required showErr={showErr} />
              <Txt label="CPF do Procurador" value={form[`${p}_proc_cpf`]} onChange={setF(`${p}_proc_cpf`)} placeholder="000.000.000-00" half showErr={showErr} />
              <Txt label="RG do Procurador" value={form[`${p}_proc_rg`]} onChange={setF(`${p}_proc_rg`)} placeholder="Ex: 1234567" half showErr={showErr} />
            </G2>
          </div>
        )}
      </Sec>

      {/* 2ª parte */}
      <button onClick={() => setShowSecond(v => !v)}
        style={{ width: "100%", background: "none", border: `1.5px dashed ${C.bege}`, borderRadius: 8, padding: "9px", fontSize: 12, color: C.ouroEsc, cursor: "pointer", fontFamily: "Georgia, serif", marginBottom: showSecond ? 12 : 0 }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = C.ouro; e.currentTarget.style.background = C.cremeMed; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = C.bege; e.currentTarget.style.background = "none"; }}>
        {showSecond ? `− Remover 2º ${label}` : `+ Adicionar 2º ${label} (cônjuge / coproprietário)`}
      </button>

      {showSecond && (
        <div style={{ background: "#F9F6EE", border: `1px solid ${C.bege}`, borderRadius: 10, padding: "14px 14px 8px", marginTop: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.ouroEsc, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>2º {label}</div>
          <Upload label={`CNH ou RG do 2º ${label}`} sublabel="Frente e verso em foto nítida" tag={tagCnh2} docs={docs} onUpload={onUpload} onRemove={onRemove} required={showSecond} showErr={showErr} />
          <G2>
            <Txt label="E-mail" value={form[`${p2}_email`]} onChange={setF(`${p2}_email`)} placeholder="email@exemplo.com" half showErr={showErr} />
            <Txt label="WhatsApp" value={form[`${p2}_whatsapp`]} onChange={setF(`${p2}_whatsapp`)} placeholder="(62) 99999-9999" half showErr={showErr} />
          </G2>
        </div>
      )}
    </div>
  );
};

// ─── App principal ────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [showErr, setShowErr] = useState(false);
  const [docs, setDocs] = useState({});
  const [extraido, setExtraido] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [showVend2, setShowVend2] = useState(false);
  const [showComp2, setShowComp2] = useState(false);
  const [vendProcurador, setVendProcurador] = useState(false);
  const [compProcurador, setCompProcurador] = useState(false);
  const [intermediadoras, setIntermediadoras] = useState([{ nome: "", creci: "", cnpj: "", comissao: "" }]);

  const [form, setForm] = useState({
    vend_email: "", vend_whatsapp: "", vend_banco: "", vend_agencia: "", vend_conta: "", vend_pix: "",
    vend_proc_nome: "", vend_proc_cpf: "", vend_proc_rg: "",
    vend2_email: "", vend2_whatsapp: "",
    comp_email: "", comp_whatsapp: "", comp_banco: "", comp_agencia: "", comp_conta: "", comp_pix: "",
    comp_proc_nome: "", comp_proc_cpf: "", comp_proc_rg: "",
    comp2_email: "", comp2_whatsapp: "",
    condicoes: "",
    corretor_nome: "", corretor_creci: "", corretor_whatsapp: "",
  });

  const setF = k => v => setForm(f => ({ ...f, [k]: v }));
  const up = (tag, file) => setDocs(d => ({ ...d, [tag]: file }));
  const rm = tag => setDocs(d => { const n = { ...d }; delete n[tag]; return n; });

  const addInter = () => setIntermediadoras(a => [...a, { nome: "", creci: "", cnpj: "", comissao: "" }]);
  const setInter = (i, k, v) => setIntermediadoras(a => a.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const rmInter = i => setIntermediadoras(a => a.filter((_, idx) => idx !== i));

  const fileToB64 = f => new Promise((res, rej) => {
    const r = new FileReader(); r.onload = () => res(r.result.split(",")[1]); r.onerror = rej; r.readAsDataURL(f);
  });

  const ATALHOS = [
    { label: "Financiamento CEF", texto: "Financiamento habitacional pela Caixa Econômica Federal. " },
    { label: "Financiamento BB", texto: "Financiamento habitacional pelo Banco do Brasil. " },
    { label: "Outro banco", texto: "Financiamento habitacional pelo banco __________. " },
    { label: "+ Sinal", texto: "Sinal de R$ " },
    { label: "+ Entrada parcelada", texto: "Entrada parcelada em __ vezes. " },
    { label: "+ Permuta", texto: "Permuta de: __________. " },
    { label: "+ Taxa administrativa", texto: "Taxa administrativa de R$ " },
    { label: "+ Taxa de vistoria", texto: "Taxa de vistoria de R$ " },
    { label: "+ Avaliação bancária", texto: "Taxa de avaliação bancária de R$ " },
    { label: "+ Prazo de posse", texto: "Prazo de entrega da posse: __ dias úteis após __________. " },
  ];

  const stepValido = () => {
    if (step === 0) return !!docs.cnh_vendedor && !!docs.end_vendedor && (!vendProcurador || (!!docs.proc_vendedor && form.vend_proc_nome.trim()));
    if (step === 1) return !!docs.cnh_comprador && !!docs.end_comprador && (!compProcurador || (!!docs.proc_comprador && form.comp_proc_nome.trim()));
    if (step === 2) return !!docs.matricula && !!docs.iptu;
    if (step === 3) return form.condicoes.trim().length > 0;
    if (step === 4) return intermediadoras[0].nome.trim() && form.corretor_nome.trim();
    return true;
  };

  const tryNext = () => {
    if (!stepValido()) { setShowErr(true); return; }
    setShowErr(false); setStep(s => s + 1);
  };

  const extrairDados = async () => {
    setLoading(true); setAiResult(null);
    const docLabels = {
      cnh_vendedor: "CNH ou RG do Vendedor (1º)",
      cnh_vendedor2: "CNH ou RG do 2º Vendedor",
      proc_vendedor: "Procuração do Vendedor",
      end_vendedor: "Comprovante de Endereço do Vendedor",
      cnh_comprador: "CNH ou RG do Comprador (1º)",
      cnh_comprador2: "CNH ou RG do 2º Comprador",
      proc_comprador: "Procuração do Comprador",
      end_comprador: "Comprovante de Endereço do Comprador",
      matricula: "Certidão de Matrícula do Imóvel",
      iptu: "Certidão de IPTU",
      condominio: "Certidão de Taxas Condominiais",
      cert_municipal: "Certidão Negativa Municipal",
      cert_estadual: "Certidão Negativa Estadual",
      cert_federal: "Certidão Negativa Federal",
      cert_trabalhista: "Certidão Negativa Trabalhista",
      pag_vendedor: "Comprovante de Pagamento",
    };

    try {
      const content = [];
      for (const [tag, file] of Object.entries(docs)) {
        const b64 = await fileToB64(file);
        const mt = file.type || "image/jpeg";
        setLoadingMsg(`Lendo ${docLabels[tag] || tag}...`);
        if (mt.startsWith("image/")) content.push({ type: "image", source: { type: "base64", media_type: mt, data: b64 } });
        else content.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: b64 } });
        content.push({ type: "text", text: `[DOCUMENTO ENVIADO: ${docLabels[tag] || tag}]` });
      }

      setLoadingMsg("Processando documentos...");

      content.push({ type: "text", text: `Você é um especialista em leitura de documentos brasileiros. Leia cada documento com MÁXIMA ATENÇÃO e extraia os dados com precisão absoluta.

ATENÇÃO ESPECIAL PARA CNH/RG:
- O NOME está impresso em letras maiúsculas no documento — leia com cuidado, não invente
- O CPF tem formato 000.000.000-00 — leia dígito por dígito
- O RG pode ser chamado de "Registro Geral", "Identidade" ou "RG" — copie exatamente
- O ÓRGÃO EXPEDIDOR aparece junto ao RG (ex: SSP/GO, DETRAN/GO, PM/GO)
- A DATA DE NASCIMENTO está no formato DD/MM/AAAA — leia com atenção, não confunda dia, mês e ano
- Na CNH: a FILIAÇÃO aparece como "Nome do Pai" e "Nome da Mãe"
- O ENDEREÇO pode aparecer na CNH (campo "Residência") ou no comprovante de endereço

PARA CERTIDÃO DE MATRÍCULA:
- Extraia a DESCRIÇÃO COMPLETA exatamente como consta no texto da matrícula
- Identifique o TIPO DO IMÓVEL (casa, apartamento, terreno, sala comercial, etc.)
- Se for APARTAMENTO, informe isso claramente pois será necessário certidão condominial
- Copie o número da matrícula, nome do proprietário, e qualquer ônus ou gravame

Condições do negócio informadas: "${form.condicoes}"
Intermediadora(s): ${intermediadoras.map(i => i.nome).join(", ")}

Responda SOMENTE com JSON válido, sem texto fora do JSON:
{
  "vendedor": {
    "nome": "NOME EXATO DO DOCUMENTO",
    "cpf": "000.000.000-00",
    "rg": "número exato",
    "orgao_rg": "SSP/GO",
    "nascimento": "DD/MM/AAAA",
    "pai": "",
    "mae": "",
    "naturalidade": "",
    "nacionalidade": "Brasileiro(a)",
    "endereco": "endereço completo"
  },
  "vendedor2": { "nome": "", "cpf": "", "rg": "", "orgao_rg": "", "nascimento": "" },
  "proc_vendedor": { "nome": "", "cpf": "", "rg": "", "validade": "" },
  "comprador": {
    "nome": "NOME EXATO DO DOCUMENTO",
    "cpf": "000.000.000-00",
    "rg": "número exato",
    "orgao_rg": "SSP/GO",
    "nascimento": "DD/MM/AAAA",
    "pai": "",
    "mae": "",
    "naturalidade": "",
    "nacionalidade": "Brasileiro(a)",
    "endereco": "endereço completo"
  },
  "comprador2": { "nome": "", "cpf": "", "rg": "", "orgao_rg": "", "nascimento": "" },
  "proc_comprador": { "nome": "", "cpf": "", "rg": "", "validade": "" },
  "imovel": {
    "tipo": "casa ou apartamento ou terreno ou outro",
    "descricao": "DESCRIÇÃO COMPLETA EXATA DA MATRÍCULA",
    "matricula": "número",
    "proprietario_matricula": "nome exato",
    "endereco": "endereço completo",
    "inscricao_municipal": "",
    "onus": "descreva ou 'Nenhum ônus registrado'"
  },
  "iptu": { "debitos": false, "valor_debito": "" },
  "condominio": { "nome": "", "debitos": false, "valor_debito": "" },
  "certidoes": { "municipal": "", "estadual": "", "federal": "", "trabalhista": "" },
  "precisa_certidao_condominio": false,
  "alertas": [],
  "aprovado": true,
  "resumo": "resumo da análise"
}` });

      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content }] }),
      });
      const data = await resp.json();
      const text = data.content?.map(i => i.text || "").join("").replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      setExtraido(parsed);
      setAiResult(parsed);
    } catch (err) {
      setAiResult({ aprovado: false, resumo: "Erro ao processar os documentos.", alertas: [err.message] });
    }
    setLoading(false); setLoadingMsg("");
  };

  const enviar = async () => {
    setEnviando(true); setErroEnvio("");
    try {
      if (!window.emailjs) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
          s.onload = res; s.onerror = rej; document.head.appendChild(s);
        });
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
      }
      const v = extraido.vendedor || {};
      const c = extraido.comprador || {};
      const im = extraido.imovel || {};
      const params = {
        vendedor: v.nome || "—", cpf_vendedor: v.cpf || "—",
        rg_vendedor: `${v.rg || "—"} ${v.orgao_rg || ""}`.trim(),
        end_vendedor: v.endereco || "—",
        comprador: c.nome || "—", cpf_comprador: c.cpf || "—",
        rg_comprador: `${c.rg || "—"} ${c.orgao_rg || ""}`.trim(),
        end_comprador: c.endereco || "—",
        end_imovel: im.endereco || "—", matricula: im.matricula || "—",
        valor_total: "Ver condições do negócio",
        sinal: "Ver condições do negócio",
        comissao: intermediadoras.map(i => `${i.nome}: R$ ${i.comissao}`).join(" | "),
        prazo_posse: "Ver condições do negócio",
        corretor: form.corretor_nome,
        data_envio: new Date().toLocaleString("pt-BR"),
        condicoes: form.condicoes,
        alertas: (extraido.alertas || []).join("; ") || "Nenhum",
        resumo_ia: extraido.resumo || "",
      };
      await window.emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, params);
      setEnviado(true);
    } catch (err) {
      setErroEnvio("Erro ao enviar. Verifique sua conexão e tente novamente.");
    }
    setEnviando(false);
  };

  const progress = (step / (STEPS.length - 1)) * 100;

  if (enviado) return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.marromEsc}, ${C.marrom})`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.creme, borderRadius: 16, padding: "40px 28px", maxWidth: 360, width: "100%", textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
        <Logo />
        <div style={{ fontSize: 50, marginBottom: 12 }}>✅</div>
        <h2 style={{ fontSize: 18, color: C.verde, marginBottom: 8 }}>Documentos enviados!</h2>
        <p style={{ color: "#5C3D1A", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
          Seus documentos foram recebidos com sucesso.<br />Em breve você receberá o retorno.
        </p>
        <div style={{ background: C.cremeMed, borderRadius: 8, padding: 11, fontSize: 11, color: C.ouroEsc, lineHeight: 1.6 }}>
          📋 Guarde os originais dos documentos enviados.
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.marromEsc}, ${C.marrom}, ${C.marromEsc})`, display: "flex", justifyContent: "center", padding: "18px 10px 30px", fontFamily: "Georgia, serif" }}>
      <div style={{ width: "100%", maxWidth: 680 }}>
        <Logo />

        {/* Subtítulo */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <p style={{ color: C.ouroEsc, fontSize: 11, margin: 0 }}>Contrato de Compra e Venda · Financiamento Habitacional</p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, position: "relative" }}>
          <div style={{ position: "absolute", top: 13, left: "4%", right: "4%", height: 2, background: "#3A2510", zIndex: 0 }}>
            <div style={{ height: "100%", background: `linear-gradient(90deg, ${C.ouroEsc}, ${C.ouro})`, width: `${progress}%`, transition: "width 0.4s" }} />
          </div>
          {STEPS.map((s, i) => (
            <div key={s.id} onClick={() => i < step && setStep(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, zIndex: 1, cursor: i < step ? "pointer" : "default", flex: 1 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, background: i <= step ? `linear-gradient(135deg, ${C.ouroEsc}, ${C.ouro})` : "#2C1810", border: `2px solid ${i <= step ? C.ouro : "#3A2510"}`, boxShadow: i === step ? `0 0 12px rgba(200,168,75,0.5)` : "none" }}>{i < step ? "✓" : s.icon}</div>
              <span style={{ fontSize: 8, color: i <= step ? C.ouro : "#4A3520", fontWeight: i === step ? 700 : 400, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{ background: C.creme, borderRadius: 14, padding: "22px 18px 20px", boxShadow: `0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,168,75,0.15)`, marginTop: 8 }}>

          {/* STEP 0 — VENDEDOR */}
          {step === 0 && (
            <Parte prefix="vend" label="Vendedor" docs={docs} onUpload={up} onRemove={rm}
              form={form} setF={setF} showErr={showErr}
              showSecond={showVend2} setShowSecond={setShowVend2}
              hasProcurador={vendProcurador} setHasProcurador={setVendProcurador} />
          )}

          {/* STEP 1 — COMPRADOR */}
          {step === 1 && (
            <Parte prefix="comp" label="Comprador" docs={docs} onUpload={up} onRemove={rm}
              form={form} setF={setF} showErr={showErr}
              showSecond={showComp2} setShowSecond={setShowComp2}
              hasProcurador={compProcurador} setHasProcurador={setCompProcurador} />
          )}

          {/* STEP 2 — IMÓVEL */}
          {step === 2 && (
            <div>
              <InfoBox icon="📋" text="Anexe os documentos do imóvel. O número de matrícula e a descrição completa serão capturados automaticamente." color={C.azul} bg={C.azulClaro} border={C.azulBorda} />
              <Sec title="Documentos do Imóvel" icon="🏠">
                <Upload label="Certidão de Matrícula" sublabel="Certidão atualizada — o escritório extrairá todos os dados do imóvel" tag="matricula" docs={docs} onUpload={up} onRemove={rm} required showErr={showErr} />
                <Upload label="Certidão de IPTU / Talão" sublabel="Para verificação da inscrição municipal e situação fiscal" tag="iptu" docs={docs} onUpload={up} onRemove={rm} required showErr={showErr} />
                <Upload label="Certidão de Taxas Condominiais" sublabel="Obrigatória para apartamentos — anexe se for o caso" tag="condominio" docs={docs} onUpload={up} onRemove={rm} showErr={showErr} />
              </Sec>
              <Sec title="Certidões Negativas do Vendedor" icon="📜">
                <InfoBox icon="⚖️" text="Documentos recomendados para proteção jurídica do negócio." />
                <Upload label="Certidão Negativa Municipal" tag="cert_municipal" docs={docs} onUpload={up} onRemove={rm} showErr={showErr} />
                <Upload label="Certidão Negativa Estadual" tag="cert_estadual" docs={docs} onUpload={up} onRemove={rm} showErr={showErr} />
                <Upload label="Certidão Negativa Federal" tag="cert_federal" docs={docs} onUpload={up} onRemove={rm} showErr={showErr} />
                <Upload label="Certidão Negativa Trabalhista" tag="cert_trabalhista" docs={docs} onUpload={up} onRemove={rm} showErr={showErr} />
              </Sec>
              <Sec title="Comprovante de Pagamento" icon="💳">
                <Upload label="Comprovante de Pagamento do Sinal" sublabel="Se já houve pagamento de sinal ou entrada, anexe o comprovante" tag="pag_vendedor" docs={docs} onUpload={up} onRemove={rm} showErr={showErr} />
              </Sec>
              {showErr && (!docs.matricula || !docs.iptu) && (
                <div style={{ background: C.vermelhoClaro, border: `1px solid ${C.vermelhoBorda}`, borderRadius: 8, padding: "9px 13px", fontSize: 12, color: C.vermelho }}>
                  ⚠️ Certidão de Matrícula e IPTU são obrigatórios.
                </div>
              )}
            </div>
          )}

          {/* STEP 3 — CONDIÇÕES */}
          {step === 3 && (
            <div>
              <Sec title="Condições do Negócio" icon="💰">
                <InfoBox icon="✏️" text="Descreva como este negócio será realizado. Use os atalhos abaixo para facilitar ou escreva livremente." />
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                  {ATALHOS.map((a, i) => (
                    <button key={i} onClick={() => setF("condicoes")(form.condicoes + a.texto)}
                      style={{ background: C.cremeMed, border: `1px solid ${C.bege}`, borderRadius: 20, padding: "4px 11px", fontSize: 11, color: C.ouroEsc, cursor: "pointer", fontFamily: "Georgia, serif" }}
                      onMouseEnter={e => { e.currentTarget.style.background = C.ouro; e.currentTarget.style.color = C.marromEsc; }}
                      onMouseLeave={e => { e.currentTarget.style.background = C.cremeMed; e.currentTarget.style.color = C.ouroEsc; }}>
                      {a.label}
                    </button>
                  ))}
                </div>
                <textarea value={form.condicoes} onChange={e => setF("condicoes")(e.target.value)}
                  placeholder="Ex: Financiamento habitacional pela CEF. Sinal de R$ 20.000 na assinatura do contrato. Taxa administrativa de R$ 500. Prazo de posse: 15 dias úteis após liberação do financiamento..."
                  style={{ width: "100%", minHeight: 130, padding: "10px 12px", border: `1.5px solid ${showErr && !form.condicoes.trim() ? C.vermelhoBorda : C.bege}`, borderRadius: 8, fontSize: 13, fontFamily: "Georgia, serif", background: C.creme, color: C.marrom, outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = C.ouroEsc}
                  onBlur={e => e.target.style.borderColor = C.bege}
                />
                {showErr && !form.condicoes.trim() && <div style={{ fontSize: 11, color: C.vermelho, marginTop: 3 }}>Descreva as condições do negócio</div>}
              </Sec>
            </div>
          )}

          {/* STEP 4 — INTERMEDIADORA */}
          {step === 4 && (
            <div>
              <Sec title="Dados do Corretor" icon="🤝">
                <G2>
                  <Txt label="Seu Nome" value={form.corretor_nome} onChange={setF("corretor_nome")} placeholder="Nome completo" required half showErr={showErr} />
                  <Txt label="CRECI" value={form.corretor_creci} onChange={setF("corretor_creci")} placeholder="Ex: 12345-GO" half showErr={showErr} />
                  <Txt label="WhatsApp" value={form.corretor_whatsapp} onChange={setF("corretor_whatsapp")} placeholder="(62) 99999-9999" half showErr={showErr} />
                </G2>
              </Sec>
              <Sec title="Imobiliária(s) Intermediadora(s)" icon="🏢">
                {intermediadoras.map((inter, i) => (
                  <div key={i} style={{ background: i % 2 === 0 ? "#F9F6EE" : C.creme, border: `1px solid ${C.bege}`, borderRadius: 10, padding: "14px 14px 8px", marginBottom: 12, position: "relative" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.ouroEsc, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
                      {i === 0 ? "Imobiliária Principal" : `${i + 1}ª Imobiliária`}
                    </div>
                    {i > 0 && <button onClick={() => rmInter(i)} style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", cursor: "pointer", color: C.vermelho, fontSize: 16 }}>✕</button>}
                    <G2>
                      <div style={{ gridColumn: "span 2" }}>
                        <Txt label="Razão Social / Nome" value={inter.nome} onChange={v => setInter(i, "nome", v)} placeholder="Ex: My Broker Imóveis Garavelo Ltda." required showErr={showErr} />
                      </div>
                      <Txt label="CRECI" value={inter.creci} onChange={v => setInter(i, "creci", v)} placeholder="Ex: J-1234" half showErr={showErr} />
                      <Txt label="CNPJ" value={inter.cnpj} onChange={v => setInter(i, "cnpj", v)} placeholder="00.000.000/0000-00" half showErr={showErr} />
                      <div style={{ gridColumn: "span 2" }}>
                        <Txt label="Valor da Comissão (R$)" value={inter.comissao} onChange={v => setInter(i, "comissao", v)} placeholder="Ex: 16.800,00" showErr={showErr} />
                      </div>
                    </G2>
                  </div>
                ))}
                <button onClick={addInter}
                  style={{ width: "100%", background: "none", border: `1.5px dashed ${C.bege}`, borderRadius: 8, padding: "9px", fontSize: 12, color: C.ouroEsc, cursor: "pointer", fontFamily: "Georgia, serif" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.ouro; e.currentTarget.style.background = C.cremeMed; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.bege; e.currentTarget.style.background = "none"; }}>
                  + Adicionar Imobiliária
                </button>
              </Sec>
            </div>
          )}

          {/* STEP 5 — ENVIO */}
          {step === 5 && (
            <div>
              {!aiResult && !loading && (
                <div style={{ textAlign: "center", padding: "10px 0" }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>📤</div>
                  <h3 style={{ fontSize: 17, color: C.marrom, marginBottom: 6 }}>Pronto para enviar!</h3>
                  <p style={{ color: C.cinza, fontSize: 13, lineHeight: 1.7, maxWidth: 380, margin: "0 auto 18px" }}>
                    Revise o resumo abaixo e clique em enviar.<br />O escritório cuidará de todo o processo.
                  </p>
                  <div style={{ background: C.cremeMed, borderRadius: 10, padding: 14, marginBottom: 18, textAlign: "left" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.ouroEsc, marginBottom: 8 }}>Documentos anexados:</div>
                    {Object.keys(docs).length === 0
                      ? <div style={{ fontSize: 12, color: C.vermelho }}>⚠️ Nenhum documento anexado</div>
                      : Object.keys(docs).map(tag => {
                        const labels = { cnh_vendedor: "CNH/RG Vendedor", cnh_vendedor2: "CNH/RG 2º Vendedor", proc_vendedor: "Procuração Vendedor", end_vendedor: "Comprovante Endereço Vendedor", cnh_comprador: "CNH/RG Comprador", cnh_comprador2: "CNH/RG 2º Comprador", proc_comprador: "Procuração Comprador", end_comprador: "Comprovante Endereço Comprador", matricula: "Certidão de Matrícula", iptu: "IPTU", condominio: "Taxas Condominiais", cert_municipal: "Cert. Neg. Municipal", cert_estadual: "Cert. Neg. Estadual", cert_federal: "Cert. Neg. Federal", cert_trabalhista: "Cert. Neg. Trabalhista", pag_vendedor: "Comprovante de Pagamento" };
                        return <div key={tag} style={{ fontSize: 12, color: C.verde, padding: "2px 0" }}>✅ {labels[tag] || tag}</div>;
                      })
                    }
                  </div>
                  <button onClick={extrairDados}
                    style={{ background: `linear-gradient(135deg, ${C.ouroEsc}, ${C.ouro})`, color: C.marromEsc, border: "none", borderRadius: 8, padding: "14px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%", maxWidth: 320, boxShadow: `0 4px 18px rgba(139,105,20,0.4)` }}>
                    Enviar para o Escritório →
                  </button>
                </div>
              )}

              {loading && (
                <div style={{ textAlign: "center", padding: "30px 0" }}>
                  <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
                  <div style={{ fontSize: 38, marginBottom: 10, animation: "spin 2s linear infinite", display: "inline-block" }}>⚙️</div>
                  <h3 style={{ fontSize: 14, color: C.marrom, marginBottom: 6 }}>Processando documentos...</h3>
                  <p style={{ color: C.cinza, fontSize: 12, animation: "pulse 1.5s ease infinite" }}>{loadingMsg}</p>
                </div>
              )}

              {aiResult && (
                <div>
                  <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 34, marginBottom: 6 }}>{aiResult.aprovado ? "✅" : "⚠️"}</div>
                    <h3 style={{ fontSize: 15, color: aiResult.aprovado ? C.verde : C.amarelo, margin: "0 0 4px" }}>
                      {aiResult.aprovado ? "Documentos processados!" : "Verifique os alertas abaixo"}
                    </h3>
                    <p style={{ color: "#5C3D1A", fontSize: 12 }}>{aiResult.resumo}</p>
                  </div>

                  {/* Alerta certidão condomínio */}
                  {aiResult.precisa_certidao_condominio && !docs.condominio && (
                    <div style={{ background: C.vermelhoClaro, border: `1px solid ${C.vermelhoBorda}`, borderRadius: 8, padding: "10px 13px", marginBottom: 12 }}>
                      <div style={{ fontSize: 12, color: C.vermelho, fontWeight: 600 }}>⚠️ Imóvel identificado como APARTAMENTO</div>
                      <div style={{ fontSize: 12, color: "#7A1A0A", marginTop: 4 }}>A certidão de taxas condominiais é obrigatória. Volte ao passo anterior e anexe o documento.</div>
                      <button onClick={() => { setStep(2); setAiResult(null); }}
                        style={{ marginTop: 8, background: C.vermelho, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>
                        ← Voltar e anexar
                      </button>
                    </div>
                  )}

                  {/* Dados extraídos */}
                  {aiResult.vendedor?.nome && (
                    <Sec title="Vendedor — Dados Capturados" icon="👤">
                      <div style={{ background: C.verdeClaro, border: `1px solid ${C.verdeBorda}`, borderRadius: 8, padding: "11px 13px", fontSize: 12, lineHeight: 1.9 }}>
                        <div><b>Nome:</b> {aiResult.vendedor.nome}</div>
                        <div><b>CPF:</b> {aiResult.vendedor.cpf} | <b>RG:</b> {aiResult.vendedor.rg} {aiResult.vendedor.orgao_rg}</div>
                        <div><b>Nascimento:</b> {aiResult.vendedor.nascimento} | <b>Naturalidade:</b> {aiResult.vendedor.naturalidade}</div>
                        {aiResult.vendedor.mae && <div><b>Filiação:</b> {aiResult.vendedor.pai} / {aiResult.vendedor.mae}</div>}
                        {aiResult.vendedor.endereco && <div><b>Endereço:</b> {aiResult.vendedor.endereco}</div>}
                      </div>
                    </Sec>
                  )}

                  {aiResult.comprador?.nome && (
                    <Sec title="Comprador — Dados Capturados" icon="👤">
                      <div style={{ background: C.verdeClaro, border: `1px solid ${C.verdeBorda}`, borderRadius: 8, padding: "11px 13px", fontSize: 12, lineHeight: 1.9 }}>
                        <div><b>Nome:</b> {aiResult.comprador.nome}</div>
                        <div><b>CPF:</b> {aiResult.comprador.cpf} | <b>RG:</b> {aiResult.comprador.rg} {aiResult.comprador.orgao_rg}</div>
                        <div><b>Nascimento:</b> {aiResult.comprador.nascimento} | <b>Naturalidade:</b> {aiResult.comprador.naturalidade}</div>
                        {aiResult.comprador.mae && <div><b>Filiação:</b> {aiResult.comprador.pai} / {aiResult.comprador.mae}</div>}
                        {aiResult.comprador.endereco && <div><b>Endereço:</b> {aiResult.comprador.endereco}</div>}
                      </div>
                    </Sec>
                  )}

                  {aiResult.imovel?.descricao && (
                    <Sec title="Imóvel — Dados Capturados" icon="🏠">
                      <div style={{ background: C.verdeClaro, border: `1px solid ${C.verdeBorda}`, borderRadius: 8, padding: "11px 13px", fontSize: 12, lineHeight: 1.9 }}>
                        <div><b>Tipo:</b> {aiResult.imovel.tipo} | <b>Matrícula:</b> {aiResult.imovel.matricula}</div>
                        <div><b>Proprietário:</b> {aiResult.imovel.proprietario_matricula}</div>
                        {aiResult.imovel.endereco && <div><b>Endereço:</b> {aiResult.imovel.endereco}</div>}
                        <div><b>Ônus:</b> {aiResult.imovel.onus}</div>
                        <div style={{ marginTop: 6, paddingTop: 6, borderTop: `1px solid ${C.verdeBorda}` }}><b>Descrição completa:</b><br />{aiResult.imovel.descricao}</div>
                      </div>
                    </Sec>
                  )}

                  {aiResult.alertas?.length > 0 && (
                    <div style={{ background: C.vermelhoClaro, border: `1px solid ${C.vermelhoBorda}`, borderRadius: 8, padding: "11px 13px", marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: C.vermelho, marginBottom: 6 }}>⚠️ Alertas importantes:</div>
                      {aiResult.alertas.map((a, i) => <div key={i} style={{ fontSize: 12, color: "#7A1A0A", padding: "2px 0" }}>• {a}</div>)}
                    </div>
                  )}

                  {erroEnvio && (
                    <div style={{ background: C.vermelhoClaro, border: `1px solid ${C.vermelhoBorda}`, borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 12, color: C.vermelho }}>❌ {erroEnvio}</div>
                  )}

                  <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                    <button onClick={() => setAiResult(null)} style={{ flex: 1, background: C.cremeMed, border: `1.5px solid ${C.bege}`, borderRadius: 8, padding: "11px", fontSize: 12, color: "#5C3D1A", cursor: "pointer" }}>← Refazer</button>
                    <button onClick={enviar} disabled={enviando || (aiResult.precisa_certidao_condominio && !docs.condominio)}
                      style={{ flex: 2, background: `linear-gradient(135deg, ${C.verde}, #27AE60)`, color: "#fff", border: "none", borderRadius: 8, padding: "11px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                      {enviando ? "Enviando..." : "📤 Confirmar Envio"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navegação */}
          {step < 5 && (
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.bege}` }}>
              <button onClick={() => { setShowErr(false); setStep(s => s - 1); }} disabled={step === 0}
                style={{ background: "none", border: `1.5px solid ${C.bege}`, borderRadius: 8, padding: "10px 16px", fontSize: 12, color: step === 0 ? C.bege : "#5C3D1A", cursor: step === 0 ? "not-allowed" : "pointer" }}>
                ← Anterior
              </button>
              <button onClick={tryNext}
                style={{ background: `linear-gradient(135deg, ${C.ouroEsc}, ${C.ouro})`, border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700, color: C.marromEsc, cursor: "pointer", boxShadow: `0 4px 12px rgba(139,105,20,0.3)` }}>
                {step === 4 ? "Revisar e Enviar →" : "Próximo →"}
              </button>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div style={{ textAlign: "center", marginTop: 14, fontSize: 10, color: "#4A3520", lineHeight: 1.8 }}>
          <div style={{ letterSpacing: "0.05em" }}>LEANDRO MOURA ADVOCACIA · OAB/GO 27.323</div>
          <div style={{ color: "#3A2510" }}>Rua C-228 c/ C-234, Qd. 536, Lt. 16, Jardim América · Goiânia-GO · (62) 8563-0577</div>
        </div>
      </div>
    </div>
  );
}
