import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Plus,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  Play,
  CheckCircle2,
  AlertCircle,
  X,
  BookOpen,
  Filter,
  Check
} from 'lucide-react';
import { Question, DifficultyLevel } from '../types';
import { DIFFICULTY_LABELS, QUESTIONS_DATABASE } from '../data/questions';

interface QuestionManagerProps {
  questions: Question[];
  onSaveQuestions: (updated: Question[]) => void;
  onBackToMenu: () => void;
  onPlayGame: () => void;
}

export const QuestionManager: React.FC<QuestionManagerProps> = ({
  questions,
  onSaveQuestions,
  onBackToMenu,
  onPlayGame,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Form State
  const [formQuestion, setFormQuestion] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDifficulty, setFormDifficulty] = useState<'nhanh' | 'vua' | 'kho' | 'chuyen_gia'>('nhanh');
  const [formOptions, setFormOptions] = useState<[string, string, string, string]>(['', '', '', '']);
  const [formCorrectIndex, setFormCorrectIndex] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Counts by difficulty
  const counts = useMemo(() => {
    return {
      all: questions.length,
      nhanh: questions.filter((q) => q.difficulty === 'nhanh').length,
      vua: questions.filter((q) => q.difficulty === 'vua').length,
      kho: questions.filter((q) => q.difficulty === 'kho').length,
      chuyen_gia: questions.filter((q) => q.difficulty === 'chuyen_gia').length,
    };
  }, [questions]);

  // Filtered list
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchDiff = filterDifficulty === 'all' || q.difficulty === filterDifficulty;
      const term = searchTerm.trim().toLowerCase();
      if (!term) return matchDiff;

      const matchText = q.question.toLowerCase().includes(term);
      const matchCat = q.category.toLowerCase().includes(term);
      const matchOpt = q.options.some((opt) => opt.toLowerCase().includes(term));
      const matchExp = q.explanation ? q.explanation.toLowerCase().includes(term) : false;

      return matchDiff && (matchText || matchCat || matchOpt || matchExp);
    });
  }, [questions, filterDifficulty, searchTerm]);

  // Open Form for Adding
  const handleOpenAddForm = () => {
    setEditingQuestion(null);
    setFormQuestion('');
    setFormCategory('Mẹo Sống & Sơ Cứu');
    setFormDifficulty('nhanh');
    setFormOptions(['', '', '', '']);
    setFormCorrectIndex(0);
    setFormExplanation('');
    setFormError(null);
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const handleOpenEditForm = (q: Question) => {
    setEditingQuestion(q);
    setFormQuestion(q.question);
    setFormCategory(q.category);
    setFormDifficulty(q.difficulty);
    setFormOptions([...q.options] as [string, string, string, string]);
    setFormCorrectIndex(q.correctIndex);
    setFormExplanation(q.explanation || '');
    setFormError(null);
    setIsFormOpen(true);
  };

  // Handle Form Submission (Add or Edit)
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuestion = formQuestion.trim();
    const cleanCategory = formCategory.trim() || 'Thường Thức';
    const cleanOptions = formOptions.map((o) => o.trim()) as [string, string, string, string];

    if (!cleanQuestion) {
      setFormError('Vui lòng nhập nội dung câu hỏi!');
      return;
    }

    for (let i = 0; i < 4; i++) {
      if (!cleanOptions[i]) {
        setFormError(`Vui lòng nhập đầy đủ đáp án ${['A', 'B', 'C', 'D'][i]}!`);
        return;
      }
    }

    if (editingQuestion) {
      // Update existing
      const updated = questions.map((q) =>
        q.id === editingQuestion.id
          ? {
              ...q,
              question: cleanQuestion,
              category: cleanCategory,
              difficulty: formDifficulty,
              options: cleanOptions,
              correctIndex: formCorrectIndex,
              explanation: formExplanation.trim(),
            }
          : q
      );
      onSaveQuestions(updated);
      showToast('Đã cập nhật câu hỏi thành công!');
    } else {
      // Add new
      const newQ: Question = {
        id: 'user_' + Date.now(),
        question: cleanQuestion,
        category: cleanCategory,
        difficulty: formDifficulty,
        options: cleanOptions,
        correctIndex: formCorrectIndex,
        explanation: formExplanation.trim(),
      };
      onSaveQuestions([newQ, ...questions]);
      showToast('Đã thêm câu hỏi mới thành công!');
    }

    setIsFormOpen(false);
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    if (questions.length <= 4) {
      alert('Ngân hàng câu hỏi cần tối thiểu 4 câu để vận hành trò chơi kéo co!');
      return;
    }
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này khỏi danh sách?');
    if (confirmed) {
      const updated = questions.filter((q) => q.id !== id);
      onSaveQuestions(updated);
      showToast('Đã xóa câu hỏi!');
    }
  };

  // Reset to default
  const handleResetDefault = () => {
    const confirmed = window.confirm(
      'Khôi phục danh sách câu hỏi gốc từ hệ thống? Tất cả câu hỏi tùy chỉnh sẽ được đặt lại.'
    );
    if (confirmed) {
      onSaveQuestions(QUESTIONS_DATABASE);
      showToast('Đã khôi phục ngân hàng câu hỏi mặc định!');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 overflow-hidden select-none">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-stone-900 text-white dark:bg-white dark:text-stone-900 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="bg-white/95 dark:bg-stone-900/95 border-b border-stone-200 dark:border-stone-800 px-3 sm:px-5 py-2.5 shrink-0 backdrop-blur-sm z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Back & Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onBackToMenu}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95"
              title="Quay lại Menu chính"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Menu Chính</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-sm shadow-sm">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm sm:text-base leading-tight">
                  Quản Lý Câu Hỏi Kéo Co
                </h1>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                  Tổng cộng: <strong className="text-amber-600 dark:text-amber-400">{questions.length}</strong> câu hỏi trong ngân hàng
                </p>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleResetDefault}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              title="Khôi phục danh sách câu hỏi mặc định"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Khôi phục</span>
            </button>
            <button
              type="button"
              onClick={handleOpenAddForm}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Câu Hỏi</span>
            </button>
            <button
              type="button"
              onClick={onPlayGame}
              className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm hover:opacity-90 transition cursor-pointer active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Vào Chơi Ngay</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-3 sm:px-5 py-2 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
          {/* Difficulty Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setFilterDifficulty('all')}
              className={`px-2.5 py-1 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                filterDifficulty === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Tất Cả ({counts.all})
            </button>
            <button
              type="button"
              onClick={() => setFilterDifficulty('nhanh')}
              className={`px-2.5 py-1 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                filterDifficulty === 'nhanh'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Nhanh ({counts.nhanh})
            </button>
            <button
              type="button"
              onClick={() => setFilterDifficulty('vua')}
              className={`px-2.5 py-1 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                filterDifficulty === 'vua'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Vừa ({counts.vua})
            </button>
            <button
              type="button"
              onClick={() => setFilterDifficulty('kho')}
              className={`px-2.5 py-1 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                filterDifficulty === 'kho'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Khó ({counts.kho})
            </button>
            <button
              type="button"
              onClick={() => setFilterDifficulty('chuyen_gia')}
              className={`px-2.5 py-1 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                filterDifficulty === 'chuyen_gia'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Chuyên Gia ({counts.chuyen_gia})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm nội dung, chủ đề..."
              className="w-full pl-8 pr-7 py-1 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Question Cards List */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-5">
        <div className="max-w-6xl mx-auto space-y-2.5">
          {filteredQuestions.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
              <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-700 dark:text-stone-300">
                Không tìm thấy câu hỏi phù hợp
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Thử thay đổi từ khóa tìm kiếm hoặc bấm nút "Thêm Câu Hỏi" bên trên.
              </p>
            </div>
          ) : (
            filteredQuestions.map((q, qIndex) => {
              const diffMeta = DIFFICULTY_LABELS[q.difficulty] || {
                label: q.difficulty,
                color: 'text-stone-700',
                bg: 'bg-stone-100',
                border: 'border-stone-300',
              };

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-stone-900 rounded-xl sm:rounded-2xl border border-stone-200 dark:border-stone-800 p-3 sm:p-4 shadow-2xs hover:shadow-xs transition flex flex-col gap-2"
                >
                  {/* Card Header: Category, Difficulty, & Actions */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[10px] font-bold text-stone-400">
                        #{qIndex + 1}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${diffMeta.bg} ${diffMeta.color} ${diffMeta.border}`}
                      >
                        {diffMeta.label}
                      </span>
                      <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full">
                        {q.category}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditForm(q)}
                        className="p-1 sm:px-2 sm:py-1 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                        title="Chỉnh sửa câu hỏi"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Sửa</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(q.id)}
                        className="p-1 sm:px-2 sm:py-1 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                        title="Xóa câu hỏi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Xóa</span>
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 leading-snug">
                    {q.question}
                  </h3>

                  {/* Options 2x2 Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = optIdx === q.correctIndex;
                      const letter = ['A', 'B', 'C', 'D'][optIdx];

                      return (
                        <div
                          key={optIdx}
                          className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-lg border text-xs ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-semibold'
                              : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700/80 text-stone-700 dark:text-stone-300'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                            }`}
                          >
                            {letter}
                          </span>
                          <span className="flex-1 truncate">{opt}</span>
                          {isCorrect && (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 shrink-0">
                              <Check className="w-3 h-3" /> Đáp án đúng
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation if any */}
                  {q.explanation && (
                    <div className="mt-0.5 p-1.5 rounded-lg bg-amber-50/70 dark:bg-stone-800/50 border border-amber-200/50 dark:border-stone-700 text-[11px] text-stone-600 dark:text-stone-400">
                      <strong className="text-amber-800 dark:text-amber-400">Giải thích:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Add / Edit Question Modal */}
      {isFormOpen && (
        <div
          id="question-form-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-4 sm:p-6 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                  {editingQuestion ? '✏️ Chỉnh Sửa Câu Hỏi' : '➕ Thêm Câu Hỏi Mới'}
                </h2>
                <p className="text-xs text-stone-500">
                  Điền câu hỏi trắc nghiệm 4 phương án và chọn đáp án chính xác
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="mt-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmitForm} className="space-y-3 py-3 text-xs">
              {/* Question Text */}
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Nội dung câu hỏi <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="Ví dụ: Loại vitamin nào được cơ thể tổng hợp chủ yếu khi tiếp xúc với ánh nắng mặt trời?"
                  className="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none font-medium"
                  required
                />
              </div>

              {/* Category & Difficulty Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Chủ đề / Lĩnh vực
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="Ví dụ: Mẹo Sống, Khoa Học, v.v."
                    className="w-full p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                    Mức độ thử thách
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) =>
                      setFormDifficulty(e.target.value as 'nhanh' | 'vua' | 'kho' | 'chuyen_gia')
                    }
                    className="w-full p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                  >
                    <option value="nhanh">Nhanh (Mẹo sống, phản xạ nhanh)</option>
                    <option value="vua">Vừa (Khoa học thường thức, hiện tượng)</option>
                    <option value="kho">Khó (Kỳ quan, vũ trụ & lịch sử)</option>
                    <option value="chuyen_gia">Chuyên Gia (Lượng tử & vật lý đỉnh cao)</option>
                  </select>
                </div>
              </div>

              {/* 4 Options */}
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  4 Phương án trả lời (Chọn nút tròn để chỉ định đáp án đúng) <span className="text-rose-500">*</span>
                </label>
                <div className="space-y-2">
                  {(['A', 'B', 'C', 'D'] as const).map((letter, idx) => {
                    const isSelected = formCorrectIndex === idx;

                    return (
                      <div
                        key={letter}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition ${
                          isSelected
                            ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600'
                            : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        {/* Radio selector for correct answer */}
                        <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                          <input
                            type="radio"
                            name="correctOption"
                            checked={isSelected}
                            onChange={() => setFormCorrectIndex(idx)}
                            className="w-4 h-4 text-emerald-600 accent-emerald-600 cursor-pointer"
                          />
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                            }`}
                          >
                            {letter}
                          </span>
                        </label>

                        {/* Input text for option */}
                        <input
                          type="text"
                          value={formOptions[idx]}
                          onChange={(e) => {
                            const copy = [...formOptions] as [string, string, string, string];
                            copy[idx] = e.target.value;
                            setFormOptions(copy);
                          }}
                          placeholder={`Nội dung phương án ${letter}...`}
                          className="flex-1 p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                          required
                        />

                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0 hidden sm:inline">
                            ĐÚNG ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Lời giải thích hoặc kiến thức thú vị (Hiện sau khi trả lời)
                </label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Ví dụ: Tia UVB kích hoạt phản ứng biến đổi tiền chất trong da tạo thành Vitamin D3."
                  className="w-full p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none font-medium"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-sm transition cursor-pointer active:scale-95"
                >
                  {editingQuestion ? 'Cập Nhật Câu Hỏi' : 'Lưu Câu Hỏi Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
