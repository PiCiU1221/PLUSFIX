<?php

namespace App\Http\Controllers;

use App\Services\TagService;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class TagController extends Controller
{
    protected TagService $tagService;

    public function __construct(TagService $tagService)
    {
        $this->tagService = $tagService;
    }

    public function search(Request $request)
    {
        $query = $request->input('query', '');
        $limit = (int) $request->input('limit', 10);

        return response()->json($this->tagService->search($query, $limit));
    }

    public function index()
    {
        return response()->json($this->tagService->getAll());
    }
}
