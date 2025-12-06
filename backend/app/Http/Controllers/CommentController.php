<?php

namespace App\Http\Controllers;

use App\Services\CommentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CommentController extends Controller
{
    protected CommentService $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;

        $this->middleware('auth:sanctum')->except('store');
    }

    /**
     * POST /api/shows/{id}/comments
     */
    public function store(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment = $this->commentService->addCommentToShow($id, $request->input('content'));

        if (!$comment) {
            return response()->json(['message' => 'Show not found'], 404);
        }

        return response()->json([
            'id' => $comment->id,
            'content' => $comment->content,
            'created_at' => $comment->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $comment->updated_at->format('Y-m-d H:i:s'),
        ], 201);
    }

    /**
     * GET /api/moderator/comments
     */
    public function index(): JsonResponse
    {
        $comments = $this->commentService->getAllComments();
        return response()->json($comments);
    }

    /**
     * PUT /api/moderator/comments/{id}
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment = $this->commentService->updateComment($id, $request->input('content'));

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        return response()->json($comment);
    }

    /**
     * DELETE /api/moderator/comments/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->commentService->deleteComment($id);

        if (!$deleted) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
