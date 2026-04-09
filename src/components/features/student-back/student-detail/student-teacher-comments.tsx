import { MessageSquare, History } from 'lucide-react';
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
          <h3 className="font-semibold text-base text-foreground">
            ความเห็นจากครูผู้สอน
          </h3>
          <span className="text-xs text-muted-foreground">
            เทอม {term}/{year}
          </span>
        </div>

        {/* TODO: ประวัติ comment ย้อนหลัง */}
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-lg px-3 py-1.5 transition-colors">
          <History className="size-3.5" />
          ดูย้อนหลัง
        </button>
      </div>

      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground py-6 text-center">
          ยังไม่มีความเห็นจากครูในเทอมนี้
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-card border border-border rounded-2xl p-5 space-y-2"
            >
              <div>
                <p className="font-medium text-sm text-foreground">
                  {comment.teacher.firstName} {comment.teacher.lastName}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {comment.subject.name}
                </p>
              </div>

              <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>

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
