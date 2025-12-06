<?php

namespace App\Http\Controllers;

use App\Services\RatingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class RatingsController extends Controller
{
    protected RatingService $ratingService;

    public function __construct(RatingService $ratingService)
    {
        $this->ratingService = $ratingService;
    }

    /**
     * POST /api/shows/{id}/ratings
     */
    public function store(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'value' => 'required|integer|min:1|max:5',
        ]);

        $rating = $this->ratingService->addRatingToShow($id, $request->input('value'));

        if (!$rating) {
            return response()->json(['message' => 'Show not found or invalid value'], 404);
        }

        return response()->json([
            'id' => $rating->id,
            'value' => $rating->value,
            'created_at' => $rating->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $rating->updated_at->format('Y-m-d H:i:s'),
        ], 201);
    }
}
