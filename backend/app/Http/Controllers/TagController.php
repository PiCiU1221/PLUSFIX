<?php

namespace App\Http\Controllers;

use App\Services\TagService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class TagController extends Controller
{
    protected TagService $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    /**
     * GET /api/tags/search?q=action
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->query('q', '');
        $limit = (int) $request->query('limit', 5);

        $tags = $this->tagService->search($query, $limit);

        return response()->json($tags);
    }
}
