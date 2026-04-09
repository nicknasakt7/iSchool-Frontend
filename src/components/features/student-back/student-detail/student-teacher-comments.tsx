import { MessageSquare, History, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import type { CommentInDetail } from '@/lib/api/student/student.type';

type Props = {
  comments: CommentInDetail[];
  term: number;
  year: number;
};

export default function StudentTeacherComments({ comments, term, year }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-muted-foreground" />
          <h3 className="font-semibold text-base text-foreground">ความเห็นจากครูผู้สอน</h3>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            เทอม {term}/{year}
          </span>
          {comments.length > 0 && (
            <span className="text-xs text-muted-foreground">({comments.length} รายการ)</span>
          )}
        </div>

        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-1.5 transition-colors">
          <History className="size-3.5" />
          ดูย้อนหลัง
        </button>
      </div>

      {comments.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl py-10 flex flex-col items-center gap-2 text-muted-foreground">
          <MessageSquare className="size-7 opacity-40" />
          <p className="text-sm">ยังไม่มีความเห็นจากครูในเทอมนี้</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-card border border-border rounded-2xl p-5 space-y-3 hover:shadow-sm transition-shadow"
            >
              {/* Teacher info */}
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground leading-tight">
                    {comment.teacher.firstName} {comment.teacher.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{comment.subject.name}</p>
                </div>
              </div>

              {/* Comment */}
              <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>

              {/* Time */}
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                  locale: th,
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}