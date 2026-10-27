'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HistoryItem } from '@/types/contract';
import { getHistoryList, deleteReportFromStorage, clearAllHistory } from '@/lib/storage';
import {
  Clock,
  Trash2,
  FileText,
  ArrowRight,
  Shield,
  Search,
} from 'lucide-react';

export default function HistoryPage() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      return getHistoryList();
    }
    return [];
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setHistoryItems(getHistoryList());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (confirm('Delete this report from your device history?')) {
      deleteReportFromStorage(id);
      setHistoryItems(getHistoryList());
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all locally stored reports?')) {
      clearAllHistory();
      setHistoryItems(getHistoryList());
    }
  };

  const filteredItems = historyItems.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.documentType.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-950/60 border border-blue-900/40 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5" />
              <span>Session History</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Report History
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Access previously generated contract reviews saved locally on your current device.
            </p>
          </div>

          {historyItems.some((i) => !i.isSample) && (
            <button
              onClick={handleClearAll}
              className="text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg border border-rose-900/40 hover:bg-rose-950/40 transition-colors flex items-center gap-1.5 w-fit"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* Disclaimer / Privacy Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-xs text-slate-400 flex items-start gap-2.5">
          <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-300">Local Storage Privacy:</strong> Reports are kept exclusively in your browser&apos;s localStorage for your convenience. LexGuard AI does not retain your contract history on any permanent server database.
          </span>
        </div>

        {/* Search Bar */}
        {historyItems.length > 1 && (
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter saved reports by title or document type..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        {/* History List */}
        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/report/${item.id}`}
                className="block bg-[#111827] border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-950 border border-blue-800 text-blue-300">
                        {item.documentType}
                      </span>
                      {item.isSample && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/60 text-amber-300">
                          Demo Sample
                        </span>
                      )}
                      <span className="text-xs text-slate-500 font-mono">
                        {new Date(item.analyzedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {item.summaryPreview}
                    </p>
                  </div>

                  {/* Badges & Actions */}
                  <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                    <div className="flex items-center gap-2">
                      {item.highRiskCount > 0 && (
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/40 text-rose-300">
                          {item.highRiskCount} High Risk
                        </span>
                      )}
                      {item.mediumRiskCount > 0 && (
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40 text-amber-300">
                          {item.mediumRiskCount} Medium
                        </span>
                      )}
                    </div>

                    {!item.isSample && (
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="p-1.5 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        title="Delete from local history"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <div className="p-1.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="bg-[#111827] border border-slate-800 rounded-xl p-12 text-center space-y-4">
              <FileText className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs sm:text-sm text-slate-400">
                No reports found matching your criteria.
              </p>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                <span>Analyze Your First Contract</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
