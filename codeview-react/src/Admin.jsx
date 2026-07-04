import { useState } from 'react'
import initial from './content.json'

// ponytail: dev-only. Save/upload/publish hit the Vite middleware (vite.config.js).
// None of this ships to the built/static site.

async function uploadImage(file) {
  const res = await fetch(`/api/upload?name=${encodeURIComponent(file.name)}`, { method: 'POST', body: file })
  if (!res.ok) throw new Error('upload failed')
  return (await res.json()).path
}

function Field({ label, children }) {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold small text-secondary text-uppercase">{label}</label>
      {children}
    </div>
  )
}

function ImageField({ value, onChange }) {
  return (
    <div className="d-flex align-items-center gap-3">
      {value
        ? <img src={value} alt="" style={{ height: 56, width: 56, objectFit: 'cover', borderRadius: 8, border: '1px solid #dee2e6' }} />
        : <div style={{ height: 56, width: 56, borderRadius: 8, background: '#eef0f2', display: 'grid', placeItems: 'center', color: '#adb5bd', fontSize: 22 }}>🖼</div>}
      <div className="flex-grow-1">
        <input className="form-control form-control-sm mb-2" placeholder="/images/… or paste a URL"
          value={value} onChange={(e) => onChange(e.target.value)} />
        <label className="btn btn-sm btn-outline-primary mb-0">
          Upload / replace picture
          <input type="file" accept="image/*" hidden onChange={async (e) => {
            const file = e.target.files?.[0]
            if (!file) return
            try { onChange(await uploadImage(file)) }
            catch { alert('Upload only works in `npm run dev`.') }
          }} />
        </label>
      </div>
    </div>
  )
}

// Multi-select toggle grid of all skill logos — click to add/remove
function StackPicker({ value = [], skills, onChange }) {
  const toggle = (label) =>
    onChange(value.includes(label) ? value.filter((l) => l !== label) : [...value, label])
  return (
    <div className="d-flex flex-wrap gap-2">
      {skills.map(({ icon, label }) => {
        const on = value.includes(label)
        return (
          <button key={label} type="button" title={label} onClick={() => toggle(label)}
            className={`btn btn-sm d-flex align-items-center gap-1 ${on ? 'btn-primary' : 'btn-outline-secondary'}`}>
            <img src={icon} alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            {label}
          </button>
        )
      })}
    </div>
  )
}

function Card({ title, action, children }) {
  return (
    <section className="bg-white rounded-3 shadow-sm border mb-4">
      <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
        <h5 className="mb-0">{title}</h5>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </section>
  )
}

// Flat add/remove list (skills, projects, socials)
function ListEditor({ title, items, fields, template, onChange, skills }) {
  const setItem = (i, key, val) => onChange(items.map((it, j) => (j === i ? { ...it, [key]: val } : it)))
  return (
    <Card title={title} action={<button className="btn btn-sm btn-primary" onClick={() => onChange([...items, { ...template }])}>+ Add</button>}>
      {items.length === 0 && <p className="text-muted mb-0">Nothing yet — click “+ Add”.</p>}
      {items.map((it, i) => (
        <div key={i} className="border rounded-3 p-3 mb-3 bg-light">
          <div className="row g-3">
            {fields.map((f) => (
              <div key={f.key} className={`col-12 col-md-${f.col ?? 6}`}>
                <label className="form-label small mb-1">{f.label}</label>
                {f.type === 'image'
                  ? <ImageField value={it[f.key] ?? ''} onChange={(v) => setItem(i, f.key, v)} />
                  : f.type === 'stack'
                  ? <StackPicker value={it[f.key] ?? []} skills={skills || []} onChange={(v) => setItem(i, f.key, v)} />
                  : f.type === 'textarea'
                  ? <textarea className="form-control" rows={3} value={it[f.key] ?? ''} onChange={(e) => setItem(i, f.key, e.target.value)} />
                  : <input className="form-control" value={it[f.key] ?? ''} onChange={(e) => setItem(i, f.key, e.target.value)} />}
              </div>
            ))}
          </div>
          <button className="btn btn-sm btn-outline-danger mt-3" onClick={() => onChange(items.filter((_, j) => j !== i))}>Remove</button>
        </div>
      ))}
    </Card>
  )
}

// Custom sections: title + text + picture + a list of link-buttons
function SectionsEditor({ sections, onChange }) {
  const set = (i, key, val) => onChange(sections.map((s, j) => (j === i ? { ...s, [key]: val } : s)))
  const setBtns = (i, btns) => set(i, 'buttons', btns)
  const addSection = () => onChange([...sections, { title: 'New Section', text: '', image: '', buttons: [] }])

  return (
    <Card title="Custom Sections" action={<button className="btn btn-sm btn-primary" onClick={addSection}>+ Add Section</button>}>
      {sections.length === 0 && <p className="text-muted mb-0">Add a section — each gets its own page area and a navbar link.</p>}
      {sections.map((s, i) => (
        <div key={i} className="border rounded-3 p-3 mb-3 bg-light">
          <Field label="Section title"><input className="form-control" value={s.title} onChange={(e) => set(i, 'title', e.target.value)} /></Field>
          <Field label="Text"><textarea className="form-control" rows={3} value={s.text ?? ''} onChange={(e) => set(i, 'text', e.target.value)} /></Field>
          <Field label="Picture"><ImageField value={s.image ?? ''} onChange={(v) => set(i, 'image', v)} /></Field>

          <label className="form-label fw-semibold small text-secondary text-uppercase d-flex justify-content-between align-items-center">
            Buttons (links)
            <button className="btn btn-sm btn-outline-primary" onClick={() => setBtns(i, [...(s.buttons || []), { label: '', href: '' }])}>+ Button</button>
          </label>
          {(s.buttons || []).map((b, bi) => (
            <div key={bi} className="input-group input-group-sm mb-2">
              <span className="input-group-text">Label</span>
              <input className="form-control" value={b.label} onChange={(e) => setBtns(i, s.buttons.map((x, k) => k === bi ? { ...x, label: e.target.value } : x))} />
              <span className="input-group-text">Link</span>
              <input className="form-control" placeholder="https://…" value={b.href} onChange={(e) => setBtns(i, s.buttons.map((x, k) => k === bi ? { ...x, href: e.target.value } : x))} />
              <button className="btn btn-outline-danger" onClick={() => setBtns(i, s.buttons.filter((_, k) => k !== bi))}>×</button>
            </div>
          ))}

          <div className="mt-3">
            <button className="btn btn-sm btn-outline-danger" onClick={() => onChange(sections.filter((_, j) => j !== i))}>Remove section</button>
          </div>
        </div>
      ))}
    </Card>
  )
}

export default function Admin() {
  const [data, setData] = useState({ sections: [], ...initial })
  const [status, setStatus] = useState(null) // {type, text}
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('Update portfolio content')

  const setSection = (key, val) => setData((d) => ({ ...d, [key]: val }))
  const setProfile = (key, val) => setData((d) => ({ ...d, profile: { ...d.profile, [key]: val } }))

  const save = async () => {
    const res = await fetch('/api/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data, null, 2) })
    if (!res.ok) throw new Error(await res.text())
  }

  const onSave = async () => {
    setBusy('save')
    try { await save(); setStatus({ type: 'success', text: '✓ Saved — the site hot-reloads with your changes.' }) }
    catch { setStatus({ type: 'warning', text: 'Dev save unavailable — use “Download JSON” and replace src/content.json.' }) }
    setBusy('')
  }

  const onPublish = async () => {
    if (!window.confirm('Publish will git add + commit + push ALL current repo changes to your live site. Continue?')) return
    setBusy('publish')
    try {
      await save()
      const res = await fetch('/api/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) })
      const text = await res.text()
      setStatus({ type: res.ok ? 'success' : 'danger', text: (res.ok ? '🚀 Published!\n' : 'Publish failed:\n') + text })
    } catch (e) { setStatus({ type: 'danger', text: 'Publish failed: ' + (e?.message || e) }) }
    setBusy('')
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    a.download = 'content.json'; a.click(); URL.revokeObjectURL(a.href)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Sticky toolbar */}
      <div className="sticky-top bg-white border-bottom shadow-sm">
        <div className="container py-2 d-flex flex-wrap align-items-center gap-2" style={{ maxWidth: 920 }}>
          <strong className="me-auto fs-5">Portfolio Editor</strong>
          <input className="form-control form-control-sm" style={{ maxWidth: 240 }} value={message}
            onChange={(e) => setMessage(e.target.value)} placeholder="Commit message" />
          <a className="btn btn-sm btn-outline-secondary" href="#">View site</a>
          <button className="btn btn-sm btn-outline-secondary" onClick={download}>Download</button>
          <button className="btn btn-sm btn-success" onClick={onSave} disabled={!!busy}>{busy === 'save' ? 'Saving…' : 'Save'}</button>
          <button className="btn btn-sm btn-dark" onClick={onPublish} disabled={!!busy}>{busy === 'publish' ? 'Publishing…' : 'Publish 🚀'}</button>
        </div>
      </div>

      <div className="container py-4" style={{ maxWidth: 920 }}>
        {status && <pre className={`alert alert-${status.type} py-2`} style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{status.text}</pre>}

        <Card title="Profile / Info">
          <div className="row g-3">
            <div className="col-md-6"><Field label="Name"><input className="form-control" value={data.profile.name} onChange={(e) => setProfile('name', e.target.value)} /></Field></div>
            <div className="col-md-6"><Field label="Subtitle"><input className="form-control" value={data.profile.subtitle} onChange={(e) => setProfile('subtitle', e.target.value)} /></Field></div>
            <div className="col-12"><Field label="Profile picture"><ImageField value={data.profile.image} onChange={(v) => setProfile('image', v)} /></Field></div>
            <div className="col-12">
              <label className="form-label fw-semibold small text-secondary text-uppercase d-flex justify-content-between">
                Bio paragraphs
                <button className="btn btn-sm btn-outline-primary" onClick={() => setProfile('bio', [...data.profile.bio, ''])}>+ Paragraph</button>
              </label>
              {data.profile.bio.map((p, i) => (
                <div key={i} className="input-group mb-2">
                  <textarea className="form-control" rows={2} value={p} onChange={(e) => setProfile('bio', data.profile.bio.map((x, j) => j === i ? e.target.value : x))} />
                  <button className="btn btn-outline-danger" onClick={() => setProfile('bio', data.profile.bio.filter((_, j) => j !== i))}>×</button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <ListEditor title="Skills / Tech Stack" items={data.skills} template={{ icon: '', label: '' }}
          onChange={(v) => setSection('skills', v)}
          fields={[{ key: 'label', label: 'Label' }, { key: 'icon', label: 'Icon', type: 'image' }]} />

        <ListEditor title="Projects / Works" items={data.projects} template={{ href: '', img: '', title: '', desc: '', stack: [] }}
          onChange={(v) => setSection('projects', v)} skills={data.skills}
          fields={[{ key: 'title', label: 'Title' }, { key: 'href', label: 'Link (optional)' }, { key: 'img', label: 'Image', type: 'image' }, { key: 'desc', label: 'Description', type: 'textarea', col: 12 }, { key: 'stack', label: 'Stack logos (click to toggle)', type: 'stack', col: 12 }]} />

        <SectionsEditor sections={data.sections} onChange={(v) => setSection('sections', v)} />

        <ListEditor title="Socials" items={data.socials} template={{ href: '', icon: '', label: '', cls: 'social-icon' }}
          onChange={(v) => setSection('socials', v)}
          fields={[{ key: 'label', label: 'Label', col: 4 }, { key: 'href', label: 'Link', col: 4 }, { key: 'cls', label: 'CSS class', col: 4 }, { key: 'icon', label: 'Icon', type: 'image' }]} />
      </div>
    </div>
  )
}
