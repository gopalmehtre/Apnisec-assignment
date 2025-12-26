'use client';

import { useState, useEffect } from 'react';
import { IssueCard } from './IssueCard';
import { IssueForm } from './IssueForm';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { api } from '@/lib/api';

type IssueType = 'CLOUD_SECURITY' | 'RETEAM_ASSESSMENT' | 'VAPT';

type IssuePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

type IssueStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";

interface Issue {
  id: string;
  type: IssueType;
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  createdAt: string;
}

const FILTERS: { label: string; value: IssueType | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Cloud Security', value: 'CLOUD_SECURITY' },
  { label: 'Reteam Assessment', value: 'RETEAM_ASSESSMENT' },
  { label: 'VAPT', value: 'VAPT' },
];

export function IssueList() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [filterType, setFilterType] = useState<IssueType | 'ALL'>('ALL');

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    if (filterType === 'ALL') {
      setFilteredIssues(issues);
    } else {
      setFilteredIssues(issues.filter(issue => issue.type === filterType));
    }
  }, [filterType, issues]);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const data = await api.getIssues();
      setIssues(data);
      setFilteredIssues(filterType === 'ALL' ? data : data.filter((issue: Issue) => issue.type === filterType));
    } catch (error) {
      console.error('Failed to fetch issues:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    try {
      await api.createIssue(data);
      await fetchIssues();
      setShowForm(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingIssue) return;
    try {
      await api.updateIssue(editingIssue.id, data);
      await fetchIssues();
      setEditingIssue(null);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this issue?')) return;
    try {
      await api.deleteIssue(id);
      await fetchIssues();
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading issues...</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setFilterType(filter.value)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterType === filter.value
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filter.label}
          </button>
        ))}
        <Button onClick={() => { setShowForm(true); setEditingIssue(null); }} className="ml-auto flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Issue
        </Button>
      </div>

      {/* Issue Form */}
      {(showForm || editingIssue) && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-2">{editingIssue ? 'Edit Issue' : 'Create New Issue'}</h3>
          <IssueForm
            onSubmit={editingIssue ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditingIssue(null);
            }}
            initialData={editingIssue}
          />
        </div>
      )}

      {/* Issue List */}
      {filteredIssues.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <div className="mb-2">No issues found</div>
          <div>Create your first issue to get started</div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onEdit={() => { setEditingIssue(issue); setShowForm(false); }}
              onDelete={() => handleDelete(issue.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}