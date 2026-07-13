import React, { useState } from 'react';
import axios from 'axios';
import { EmailTemplate } from '../types';
import { Mail, Plus, X, Send, Edit2, Trash2 } from 'lucide-react';

export function EmailTemplatesManager({ templates, onUpdate, token }: { 
  templates: EmailTemplate[]; 
  onUpdate: (updated: EmailTemplate[]) => void;
  token: string | null;
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTemplate) {
      onUpdate(templates.map(t => t.id === editingTemplate.id ? { ...t, name, subject, body } : t));
    } else {
      onUpdate([...templates, { id: Date.now().toString(), name, subject, body }]);
    }
    setShowForm(false);
    setEditingTemplate(null);
    setName("");
    setSubject("");
    setBody("");
  };

  const handleEdit = (t: EmailTemplate) => {
    setEditingTemplate(t);
    setName(t.name);
    setSubject(t.subject);
    setBody(t.body);
    setShowForm(true);
  };

  const handleSend = async (template: EmailTemplate, recipientEmail: string) => {
    try {
      await axios.post('/api/send-email', {
        to: recipientEmail,
        subject: template.subject,
        body: template.body.replace("{{name}}", "Candidate")
      });
      alert(`Email "${template.name}" sent successfully to ${recipientEmail}!`);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Mail className="w-4 h-4 text-purple-600" /> Email Templates
        </h3>
        <button onClick={() => setShowForm(true)} className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer hover:bg-purple-200">
          <Plus className="w-3 h-3" /> Add Template
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-3 bg-slate-50 rounded-lg space-y-2 text-xs">
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-1 border rounded" />
          <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="w-full p-1 border rounded" />
          <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} className="w-full p-1 border rounded" rows={3} />
          <button type="submit" className="w-full bg-purple-600 text-white py-1 rounded cursor-pointer">Save</button>
          <button type="button" onClick={() => setShowForm(false)} className="w-full bg-slate-200 text-slate-700 py-1 rounded cursor-pointer flex items-center justify-center gap-1"><X size={12}/> Cancel</button>
        </form>
      )}

      <div className="space-y-2">
        {templates.map(t => (
          <div key={t.id} className="text-xs p-2 border border-slate-100 rounded-lg flex justify-between items-center bg-slate-50">
            <span>{t.name}</span>
            <div className='flex gap-1'>
                <button onClick={() => handleEdit(t)} className='p-1 hover:bg-slate-200 rounded cursor-pointer'><Edit2 size={12}/></button>
                <button onClick={() => onUpdate(templates.filter(item => item.id !== t.id))} className='p-1 hover:bg-red-200 rounded cursor-pointer text-red-600'><Trash2 size={12}/></button>
                <button onClick={() => handleSend(t, "candidate@example.com")} className='p-1 hover:bg-purple-200 rounded cursor-pointer'><Send size={12}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
