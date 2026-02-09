
'use client';

import React, { useEffect, useState } from 'react';
import {
    Calendar,
    Clock,
    Video,
    Users,
    MessageSquare,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Star
} from 'lucide-react'; 
// code
export default function InterviewSchedulerPage() {

    /* -------------------- STATE -------------------- */
    const [filterDate, setFilterDate] = useState('Today');
    const [showScorecardModal, setShowScorecardModal] = useState(false);
    const [selectedFeedbackItem, setSelectedFeedbackItem] = useState<any>(null);

    const [allInterviews, setAllInterviews] = useState<any[]>([]);
    const [upcomingInterviewsApi, setUpcomingInterviewsApi] = useState<any[]>([]);
    const [pendingInterviewsApi, setPendingInterviewsApi] = useState<any[]>([]);

    /* -------------------- API -------------------- */
    const API_BASE_URL = 'http://localhost:8090/api/interviews';

    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                const res = await fetch(API_BASE_URL);
                if (!res.ok) throw new Error('Failed to fetch interviews');

                const data = await res.json();
                setAllInterviews(data);

                setUpcomingInterviewsApi(
                    data.filter((i: any) =>
                        i.status === 'Upcoming' || i.status === 'Scheduled'
                    )
                );

                setPendingInterviewsApi(
                    data.filter((i: any) => i.status === 'Pending')
                );

            } catch (error) {
                console.error('API Error:', error);
            }
        };

        fetchInterviews();
    }, []);

    /* -------------------- FILTER LOGIC -------------------- */
    const filteredInterviews = upcomingInterviewsApi.filter(i => {
    if (filterDate === 'All') return true;

    if (
        filterDate === 'Today' &&
        i.date &&
        i.date.includes('Today')
    ) return true;

    if (
        filterDate === 'Tomorrow' &&
        i.date &&
        i.date.includes('Tomorrow')
    ) return true;

    if (
        filterDate === 'Next Week' &&
        i.date &&
        !i.date.includes('Today') &&
        !i.date.includes('Tomorrow')
    ) return true;

    return false;
});


    const pendingList = pendingInterviewsApi;

    /* -------------------- ACTIONS -------------------- */
    const handleJoinMeeting = (platform: string) => {
        let url = 'https://meet.google.com';

        if (platform.includes('Zoom')) url = 'https://zoom.us';
        if (platform.includes('Teams')) url = 'https://teams.microsoft.com';

        window.open(url, '_blank');
    };

    const handleSync = () => {
        alert('Calendar Synced Successfully!');
    };

    const handleOpenScorecard = (item: any) => {
        setSelectedFeedbackItem(item);
        setShowScorecardModal(true);
    };

    const handleSubmitScorecard = (e: React.FormEvent) => {
        e.preventDefault();
        setShowScorecardModal(false);
        alert(`Scorecard submitted for ${selectedFeedbackItem.candidate}`);
    };

    /* -------------------- UI -------------------- */
    return (
        <div className="min-h-screen pb-20 space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900">
                        Interview <span className="text-orange-500">Scheduler</span>
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">
                        Manage upcoming interviews and submit scorecards.
                    </p>
                </div>

                <button
                    onClick={handleSync}
                    className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2"
                >
                    <Calendar size={18} /> Sync Calendar
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* INTERVIEW LIST */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Filters */}
                    <div className="flex gap-2">
                        {['Today', 'Tomorrow', 'Next Week', 'All'].map(d => (
                            <button
                                key={d}
                                onClick={() => setFilterDate(d)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold ${
                                    filterDate === d
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'bg-white border'
                                }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>

                    {/* Cards */}
                    <div className="bg-white rounded-3xl p-8 border">
                        <h3 className="font-bold mb-6 flex items-center gap-2">
                            <Clock size={20} className="text-orange-500" /> Upcoming Interviews
                        </h3>

                        {filteredInterviews.length > 0 ? (
                            filteredInterviews.map(interview => (
                                <div
                                    key={interview.id}
                                    className="p-6 rounded-2xl bg-slate-50 border mb-4"
                                >
                                    <div className="flex justify-between items-center">

                                        <div>
                                            <h4 className="font-bold text-lg">
                                                {interview.candidate}
                                            </h4>
                                            <p className="text-sm text-slate-500">
                                                {interview.role}
                                            </p>

                                            <div className="flex gap-4 text-xs mt-2 text-slate-400">
                                                <span className="flex items-center gap-1">
                                                    <Clock size={12} /> {interview.time}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Video size={12} /> {interview.platform}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users size={12} /> {interview.panel.join(', ')}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleJoinMeeting(interview.platform)}
                                            className="px-5 py-2 bg-slate-900 text-white rounded-lg flex items-center gap-1"
                                        >
                                            Join <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-400">
                                No interviews found.
                            </p>
                        )}
                    </div>
                </div>

                {/* SIDEBAR */}
                <div className="space-y-6">

                    {/* Pending Feedback */}
                    <div className="bg-white rounded-3xl p-6 border">
                        <h3 className="font-bold flex items-center gap-2 mb-4">
                            <AlertCircle size={20} className="text-red-500" />
                            Pending Feedback
                        </h3>

                        {pendingList.length > 0 ? (
                            pendingList.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => handleOpenScorecard(item)}
                                    className="p-4 rounded-xl bg-slate-50 border mb-3 cursor-pointer"
                                >
                                    <h5 className="font-bold">{item.candidate}</h5>
                                    <p className="text-xs text-slate-500">{item.role}</p>

                                    <button className="mt-3 w-full py-2 text-xs bg-white border rounded-lg">
                                        <MessageSquare size={12} /> Submit Scorecard
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400 text-sm">All caught up 🎉</p>
                        )}
                    </div>

                    {/* Guide */}
                    <div className="bg-slate-900 text-white rounded-3xl p-6">
                        <h3 className="font-bold mb-2">Interview Guide</h3>
                        <p className="text-sm text-slate-300">
                            Focus on behavioral questions for Culture Fit.
                        </p>
                    </div>
                </div>
            </div>

            {/* SCORECARD MODAL */}
            {showScorecardModal && selectedFeedbackItem && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">
                            Submit Feedback – {selectedFeedbackItem.candidate}
                        </h2>

                        <form onSubmit={handleSubmitScorecard} className="space-y-4">
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <Star key={star} />
                                ))}
                            </div>

                            <textarea
                                className="w-full h-28 border rounded-xl p-3"
                                placeholder="Comments..."
                            />

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowScorecardModal(false)}
                                    className="w-1/2 py-2 border rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-1/2 py-2 bg-slate-900 text-white rounded-xl"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
