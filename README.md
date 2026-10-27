# LexGuard AI — Indian LegalTech Contract Intelligence & Risk Review MVP

> **"Know what you're signing before you commit."**  
> An informational LegalTech decision-support web application tailored for Indian tenants, employees, freelancers, and small businesses to decode contracts, spot potential legal risks, and prepare informed questions for a qualified lawyer.

LexGuard AI was founded by **Mohit Gupta**, a Computer Science Engineering student at Presidency University. The platform serves as an accessible legal co-pilot, tackling the "Contract Blindness" that leaves millions of Indian entrepreneurs, freelancers, and tenants vulnerable. By focusing on MSMEs and freelancers who form the backbone of India’s economy, LexGuard AI ensures that legal intelligence and clause transparency are accessible to everyone. Our mission is to ensure no great idea or livelihood fails simply because of a contract the person couldn't understand.

---

## ⚖️ Product Vision & Regulatory Boundary

LexGuard AI is an **informational decision-support tool**, not a law firm.
- It does **not** provide formal legal advice, draft legally binding documents, or represent clients.
- It does **not** create an advocate-client relationship.
- Always consult a qualified Indian advocate enrolled with the relevant State Bar Council for jurisdiction-specific legal counsel.

---

## 🚀 Key Features

1. **Executive Summarization**: Automatically extracts contracting parties, apparent purpose, and primary obligations in plain English.
2. **Clause-by-Clause Findings**: Categorizes clauses by risk priority (*High Attention*, *Medium Attention*, *Low Attention*, *Informational*), backed by **exact verbatim quotations** from the text.
3. **Key Terms Audit**: Isolates financial terms (rent, deposit, penalties), duration (term, lock-in period), termination notice windows, and liability covenants.
4. **Indian Statutory Awareness**:
   - **Tenancy**: 11-month lease norms, Section 17 Registration Act compliance, unreasonable automatic painting deductions, lock-in period forfeiture penalties.
   - **Employment**: Section 27 Indian Contract Act 1872 restraint-of-trade analysis on non-competes, training bond liquidated damages scrutiny, certificate withholding prohibitions.
5. **Missing Information & Ambiguity Detection**: Highlights missing inventory schedules, utility reconciliation mechanisms, and force majeure rent suspension clauses.
6. **Negotiation Checklist**: Actionable, courteous scripts users can copy and send to counterparties to negotiate unfair clauses.
7. **Questions for an Indian Advocate**: Curated legal uncertainties to bring to a consultation.
8. **Exportable Reports**: Printable view and PDF export (`window.print()`).
9. **Privacy & Ephemeral Processing**: Uploaded documents are parsed ephemerally in memory; no contract text is permanently saved to any database. Reports are stored under the user's control in browser `localStorage`.
10. **Built-in Sample Mode**: Fully functional sample analysis of a realistic Bengaluru residential agreement available immediately without requiring an API key, clearly labeled:
    `DEMO DATA — FICTIONAL AGREEMENT — NOT A REAL LEGAL ASSESSMENT.`

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 with bespoke LegalTech theme (deep midnight navy `#0B0F19`, charcoal `#111827`, electric blue `#3B82F6`)
- **Icons**: `lucide-react`
- **Validation**: `zod`
- **Document Text Parsers**: `pdf-parse` (PDF) and `mammoth` (DOCX)
- **AI Engine**: Provider abstraction supporting Google Gemini (`gemini-2.5-flash`), OpenAI (`gpt-4o-mini`), and Groq (`llama-3.3-70b-versatile`)

---

## 📁 Application Routes

| Route | Description |
|---|---|
| `/` | Marketing landing page with hero, interactive preview, problem/solution, and privacy details |
| `/analyze` | Contract analysis workspace (drag-and-drop PDF/DOCX or paste text, with sample loaders) |
| `/report/[id]` | Full interactive report dashboard with filters, search, and printable export |
| `/report/sample-rental-agreement` | Pre-computed, fully documented fictional Indian rental sample report |
| `/history` | Session-based saved reports with search, deletion, and clear history actions |
| `/privacy` | Detailed privacy policy and ephemeral data handling architecture |
| `/terms` | Terms of service, informational limitations, and Indian jurisdiction notice |
| `POST /api/extract` | Server-side text extraction from uploaded PDF / DOCX files |
| `POST /api/analyze` | AI contract evaluation pipeline with strict Zod validation |
| `GET /api/reports/[id]` | Report retrieval endpoint (including sample fallback) |

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your preferred AI provider in `.env.local`:

```env
# Provider: 'gemini' (default), 'openai', or 'groq'
AI_PROVIDER=gemini

# Recommended: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Override model name
AI_MODEL=gemini-2.5-flash
```

*(Note: If no API key is set, the application continues to run seamlessly. The built-in Sample Report is available for demonstration, and the workspace clearly instructs the user how to configure their key).*

---

## 📦 Installation & Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Unit Tests**:
   ```bash
   npm test
   ```

3. **Build the Production Bundle**:
   ```bash
   npm run build
   ```

4. **Start the Production Server**:
   ```bash
   npm run start -- -p 3000
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Development Mode**:
   ```bash
   npm run dev
   ```

---

## 🧪 Test Verification

To run the automated test suite:
```bash
npm test
```
Verifies:
- Input validation (rejection of input < 50 characters, acceptance of valid inputs).
- Document type enumeration.
- Text cleaning and word counting utilities.
- Sample data integrity (guarantees `SAMPLE_CONTRACT_ANALYSIS` matches 100% of the Zod schema).
- P1 requirement verification: Validates suggested alternative clause wording and negotiation trade-offs.

To run HTTP route, file extraction, and API endpoint verification:
```bash
node scripts/verify-routes.mjs
```

---

## 🛡️ Security & Privacy Architecture

- **Untrusted Input Isolation**: Documents are placed inside `<untrusted_contract_text>` delimiters with instructions for the AI model to ignore embedded prompt injections.
- **No Hallucinated Citations**: The engine is instructed never to invent statutory sections or fake court precedents.
- **Client Boundary**: Stored reports stay on the user's device (`localStorage`). No documents are logged in ordinary application logs.
>>>>>>> fab1aa2 (chore: publish LexGuard AI MVP)
