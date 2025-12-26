'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Issue {
  id: string;
  type: 'CLOUD_SECURITY' | 'RETEAM_ASSESSMENT' | 'VAPT';
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
}

interface IssueCardProps {
  issue: Issue;
  onEdit: () => void;
  onDelete: () => void;
}

export function IssueCard({ issue, onEdit, onDelete }: IssueCardProps) {
  const typeLabels: Record<Issue['type'], string> = {
    CLOUD_SECURITY: 'Cloud Security',
    RETEAM_ASSESSMENT: 'Reteam Assessment',
    VAPT: 'VAPT',
  };

  const priorityColors: Record<Issue['priority'], string> = {
    LOW: 'bg-blue-100 text-blue-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    CRITICAL: 'bg-red-100 text-red-800',
  };

  const statusColors: Record<Issue['status'], string> = {
    OPEN: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    RESOLVED: 'bg-green-100 text-green-800',
    CLOSED: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-4 flex flex-col gap-3">
      <div className="flex flex-wrap gap-2 items-center mb-2">
        <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColors[issue.priority]}`}>
          {issue.priority}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[issue.status]}`}>
          {issue.status.replace('_', ' ')}
        </span>
        <span className="px-2 py-1 rounded text-xs font-semibold bg-indigo-100 text-indigo-800">
          {typeLabels[issue.type]}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{issue.title}</h3>
      <p className="text-gray-700 mb-2">{issue.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onEdit}
            className="flex items-center gap-1 px-3 py-1"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={onDelete}
            className="flex items-center gap-1 px-3 py-1"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}