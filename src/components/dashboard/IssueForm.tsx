'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface IssueFormProps {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  initialData?: any;
}

const ISSUE_TYPES = [
  { value: 'CLOUD_SECURITY', label: 'Cloud Security' },
  { value: 'RETEAM_ASSESSMENT', label: 'Reteam Assessment' },
  { value: 'VAPT', label: 'VAPT' },
];

const PRIORITIES = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'CRITICAL', label: 'Critical' },
];

const STATUSES = [
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'RESOLVED', label: 'Resolved' },
  { value: 'CLOSED', label: 'Closed' },
];

export function IssueForm({ onSubmit, onCancel, initialData }: IssueFormProps) {
  const [formData, setFormData] = useState({
    type: initialData?.type || 'CLOUD_SECURITY',
    title: initialData?.title || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'MEDIUM',
    status: initialData?.status || 'OPEN',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold mb-4">{initialData ? 'Update Issue' : 'Create Issue'}</h2>
      {/* Issue Type */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="type">Issue Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          required
        >
          {ISSUE_TYPES.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      {/* Title */}
      <Input
        type="text"
        label="Title"
        name="title"
        placeholder="Enter issue title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      {/* Description */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[120px]"
          placeholder="Describe the issue in detail"
          required
        />
      </div>
      {/* Priority */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          {PRIORITIES.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      {/* Status */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          {STATUSES.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <Button type="submit" isLoading={loading} className="flex-1">
          {initialData ? 'Update Issue' : 'Create Issue'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}