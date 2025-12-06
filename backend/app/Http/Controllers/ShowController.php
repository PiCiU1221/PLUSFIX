<?php

namespace App\Http\Controllers;

use App\Services\ShowService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ShowController extends Controller
{
    protected ShowService $showService;

    public function __construct(ShowService $showService)
    {
        $this->showService = $showService;
    }

    /**
     * GET /api/shows
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only([
            'type_id',
            'title',
            'release_year_from',
            'release_year_to',
            'category_id',
            'tag_id',
            'country_id',
            'streaming_platform_id',
            'person_id',
            'status',
        ]);

        $sort = [
            'rating' => $request->query('sort_rating'),
            'popularity' => $request->query('sort_popularity'),
        ];

        $shows = $this->showService->getAllShowsShort($filters, $sort);

        return response()->json($shows);
    }

    /**
     * GET /api/shows/{id}
     */
    public function show(int $id): JsonResponse
    {
        $show = $this->showService->getShowDetails($id);

        if (!$show) {
            return response()->json(['message' => 'Show not found'], 404);
        }

        return response()->json($show);
    }

    /**
     * GET /api/shows/filters
     */
    public function filters(): JsonResponse
    {
        $filters = $this->showService->getFilterOptionsForClient();
        return response()->json($filters);
    }
}
