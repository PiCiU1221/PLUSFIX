<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\Show;

class CommentService
{
    public function addCommentToShow(int $showId, string $content): ?Comment
    {
        $show = Show::find($showId);

        if (!$show) {
            return null;
        }

        $comment = $show->comments()->create(['content' => $content]);

        $show->popularity = $show->ratings()->count() + $show->comments()->count();
        $show->save();

        return $comment;
    }

    public function getAllComments(): array
    {
        return Comment::with('show:id,title')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'show' => $c->show->title ?? null,
                'content' => $c->content,
                'created_at' => $c->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $c->updated_at->format('Y-m-d H:i:s'),
            ])->toArray();
    }

    public function updateComment(int $id, string $content): ?array
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return null;
        }

        $comment->update(['content' => $content]);

        return [
            'id' => $comment->id,
            'show_id' => $comment->show_id,
            'content' => $comment->content,
            'created_at' => $comment->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $comment->updated_at->format('Y-m-d H:i:s'),
        ];
    }

    public function deleteComment(int $id): bool
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return false;
        }

        $show = $comment->show;
        $comment->delete();

        if ($show) {
            $show->popularity = $show->ratings()->count() + $show->comments()->count();
            $show->save();
        }
        
        return true;
    }
}
