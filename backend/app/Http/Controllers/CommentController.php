<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::with(['user', 'shows'])->paginate(20);
        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'value' => 'required|string',
            'show_id' => 'required|exists:shows,id',
        ]);

        $comment = Comment::create([
            'value' => $validated['value'],
            'user_id' => Auth::id(),
        ]);

        $comment->shows()->attach($validated['show_id']);

        return response()->json($comment->load(['user', 'shows']), 201);
    }

    public function show($id)
    {
        $comment = Comment::with(['user', 'shows'])->findOrFail($id);
        return response()->json($comment);
    }

    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        // Sprawdź czy użytkownik jest właścicielem komentarza
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'value' => 'required|string',
        ]);

        $comment->update($validated);

        return response()->json($comment->load(['user', 'shows']));
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        // Sprawdź czy użytkownik jest właścicielem komentarza
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }

    public function getByShow($showId)
    {
        $comments = Comment::with('user')
            ->whereHas('shows', function ($query) use ($showId) {
                $query->where('show_id', $showId);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($comments);
    }

    public function getByUser($userId)
    {
        $comments = Comment::with('shows')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($comments);
    }
}

