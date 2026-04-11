'use client';

import { useState, useTransition } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  BookOpen,
  Plus,
  X,
  Pencil,
  Trash2,
  Loader2,
  BookMarked,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { useSubjects } from '@/lib/api/subjects/hooks/useSubjects';
import { Subject } from '@/lib/api/subjects/subject.type';
import {
  createManySubjectsAction,
  updateSubjectAction,
  deleteSubjectAction,
} from '@/lib/actions/subject.action';

// ─── Types ────────────────────────────────────────────────────────────────────

type DraftSubject = {
  localId: number;
  name: string;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreateSubjectPage() {
  const queryClient = useQueryClient();
  const { data: subjects = [], isLoading } = useSubjects();

  // draft subjects (the bulk-create form)
  const [drafts, setDrafts] = useState<DraftSubject[]>(() => [
    { localId: 1, name: '' },
  ]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isPendingSave, startSave] = useTransition();

  // search filter for existing list
  const [search, setSearch] = useState('');

  // edit dialog
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editName, setEditName] = useState('');
  const [editError, setEditError] = useState<string | null>(null);
  const [isPendingEdit, startEdit] = useTransition();

  // delete dialog
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null);
  const [isPendingDelete, startDelete] = useTransition();

  // ── Draft handlers ──────────────────────────────────────────────────────────

  const handleDraftChange = (localId: number, value: string) => {
    setDrafts(prev =>
      prev.map(d => (d.localId === localId ? { ...d, name: value } : d)),
    );
  };

  const handleDraftAdd = () => {
    setDrafts(prev => [...prev, { localId: Date.now(), name: '' }]);
  };

  const handleDraftRemove = (localId: number) => {
    setDrafts(prev => prev.filter(d => d.localId !== localId));
  };

  const handleSave = () => {
    const valid = drafts.filter(d => d.name.trim().length >= 2);
    if (valid.length === 0) {
      setSaveError('กรุณาใส่ชื่อวิชาอย่างน้อย 1 รายการ (ขั้นต่ำ 2 ตัวอักษร)');
      return;
    }
    setSaveError(null);

    startSave(async () => {
      const result = await createManySubjectsAction(
        valid.map(d => ({ name: d.name.trim() })),
      );
      if (result.error) {
        setSaveError(result.error);
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ['subjects'] });
      setDrafts([{ localId: Date.now(), name: '' }]);
    });
  };

  // ── Edit handlers ───────────────────────────────────────────────────────────

  const openEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setEditName(subject.name);
    setEditError(null);
  };

  const handleEdit = () => {
    if (!editingSubject) return;
    if (editName.trim().length < 2) {
      setEditError('ชื่อวิชาต้องมีอย่างน้อย 2 ตัวอักษร');
      return;
    }
    setEditError(null);

    startEdit(async () => {
      const result = await updateSubjectAction(
        editingSubject.id,
        editName.trim(),
      );
      if (result.error) {
        setEditError(result.error);
        return;
      }
      await queryClient.invalidateQueries({ queryKey: ['subjects'] });
      setEditingSubject(null);
    });
  };

  // ── Delete handlers ─────────────────────────────────────────────────────────

  const handleDelete = () => {
    if (!deletingSubject) return;

    startDelete(async () => {
      await deleteSubjectAction(deletingSubject.id);
      await queryClient.invalidateQueries({ queryKey: ['subjects'] });
      setDeletingSubject(null);
    });
  };

  // ── Derived ─────────────────────────────────────────────────────────────────

  const filteredSubjects = subjects.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-semibold mb-1">Subject Management</h2>
        <p className="text-sm text-muted-foreground">
          สร้างและจัดการรายวิชาของโรงเรียน วิชาเป็น Global ไม่ผูกกับปีหรือเทอม
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* ── LEFT: Bulk create ────────────────────────────────────────────── */}
        <div className="border rounded-2xl p-6 space-y-5 bg-card">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
              <BookMarked className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-base">เพิ่มวิชาใหม่</h3>
              <p className="text-xs text-muted-foreground">
                เพิ่มได้หลายวิชาพร้อมกัน
              </p>
            </div>
          </div>

          {/* Draft cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {drafts.map((draft, index) => (
              <div
                key={draft.localId}
                className="relative bg-muted/40 rounded-xl p-4 space-y-3 border"
              >
                {drafts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDraftRemove(draft.localId)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-lg shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    วิชาที่ {index + 1}
                  </span>
                </div>

                <Input
                  placeholder="ชื่อวิชา เช่น คณิตศาสตร์"
                  value={draft.name}
                  onChange={e =>
                    handleDraftChange(draft.localId, e.target.value)
                  }
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleDraftAdd();
                  }}
                />
              </div>
            ))}
          </div>

          {/* Add another */}
          <button
            type="button"
            onClick={handleDraftAdd}
            className="w-full border-2 border-dashed rounded-xl py-3 flex items-center justify-center gap-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            เพิ่มวิชา
          </button>

          {saveError && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              {saveError}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button
              variant="ghost"
              onClick={() => {
                setDrafts([{ localId: Date.now(), name: '' }]);
                setSaveError(null);
              }}
              disabled={isPendingSave}
            >
              ล้างข้อมูล
            </Button>
            <Button onClick={handleSave} disabled={isPendingSave}>
              {isPendingSave && (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              )}
              บันทึกวิชา
            </Button>
          </div>
        </div>

        {/* ── RIGHT: Existing subjects ─────────────────────────────────────── */}
        <div className="border rounded-2xl p-6 space-y-5 bg-card">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-base">วิชาทั้งหมด</h3>
              <p className="text-xs text-muted-foreground">
                {subjects.length} วิชา
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาวิชา..."
              className="pl-9"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* List */}
          <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                กำลังโหลด...
              </div>
            ) : filteredSubjects.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">
                  {search ? 'ไม่พบวิชาที่ค้นหา' : 'ยังไม่มีวิชา'}
                </p>
                {!search && (
                  <p className="text-xs mt-1">
                    เริ่มสร้างวิชาแรกด้านซ้ายได้เลย
                  </p>
                )}
              </div>
            ) : (
              filteredSubjects.map((subject, index) => (
                <div
                  key={subject.id}
                  className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3 group hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground w-5 text-right">
                      {index + 1}
                    </span>
                    <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium text-sm">{subject.name}</span>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => openEdit(subject)}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:text-destructive hover:bg-destructive/10"
                      onClick={() => setDeletingSubject(subject)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Edit Dialog ──────────────────────────────────────────────────────── */}
      <Dialog
        open={!!editingSubject}
        onOpenChange={open => !open && setEditingSubject(null)}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="w-4 h-4" />
              แก้ไขชื่อวิชา
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">
              แก้ไขวิชา:{' '}
              <span className="font-medium text-foreground">
                {editingSubject?.name}
              </span>
            </p>
            <Input
              placeholder="ชื่อวิชาใหม่"
              value={editName}
              onChange={e => setEditName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleEdit();
              }}
              autoFocus
            />
            {editError && (
              <p className="text-sm text-destructive">{editError}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setEditingSubject(null)}
              disabled={isPendingEdit}
            >
              ยกเลิก
            </Button>
            <Button onClick={handleEdit} disabled={isPendingEdit}>
              {isPendingEdit && (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              )}
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm Dialog ─────────────────────────────────────────────── */}
      <AlertDialog
        open={!!deletingSubject}
        onOpenChange={open => !open && setDeletingSubject(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ลบวิชา</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการลบวิชา{' '}
              <span className="font-semibold text-foreground">
                &quot;{deletingSubject?.name}&quot;
              </span>{' '}
              ใช่ไหม? การกระทำนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPendingDelete}>
              ยกเลิก
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPendingDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isPendingDelete && (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              )}
              ลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
