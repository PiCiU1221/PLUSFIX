<?php

namespace App\Http\Controllers;

use App\Models\Show;
use Illuminate\Http\Request;

class ShowController extends Controller
{
    public function index()
    {
        $shows = Show::with(['categories', 'streamingPlatforms', 'persons', 'comments.user'])
            ->paginate(20);

        return response()->json($shows);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:Film,Serial',
            'rating' => 'nullable|numeric|min:0|max:10',
            'seasons' => 'nullable|integer|min:1',
            'length' => 'nullable|integer|min:1',
            'country' => 'nullable|string|max:255',
            'release_date' => 'nullable|date',
            'status' => 'nullable|string|in:Ongoing,Finished',
            'popularity' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'languages' => 'nullable|string',
            'categories' => 'nullable|array',
            'streaming_platforms' => 'nullable|array',
            'persons' => 'nullable|array',
        ]);

        $show = Show::create($validated);

        if (isset($validated['categories'])) {
            $show->categories()->attach($validated['categories']);
        }

        if (isset($validated['streaming_platforms'])) {
            $show->streamingPlatforms()->attach($validated['streaming_platforms']);
        }

        if (isset($validated['persons'])) {
            foreach ($validated['persons'] as $person) {
                $show->persons()->attach($person['id'], ['role' => $person['role'] ?? null]);
            }
        }

        return response()->json($show->load(['categories', 'streamingPlatforms', 'persons']), 201);
    }

    public function show($id)
    {
        $show = Show::with(['categories', 'streamingPlatforms', 'persons', 'comments.user'])
            ->findOrFail($id);

        return response()->json($show);
    }

    public function update(Request $request, $id)
    {
        $show = Show::findOrFail($id);

        $validated = $request->validate([
            'type' => 'sometimes|string|in:Film,Serial',
            'rating' => 'nullable|numeric|min:0|max:10',
            'seasons' => 'nullable|integer|min:1',
            'length' => 'nullable|integer|min:1',
            'country' => 'nullable|string|max:255',
            'release_date' => 'nullable|date',
            'status' => 'nullable|string|in:Ongoing,Finished',
            'popularity' => 'nullable|numeric|min:0',
            'description' => 'nullable|string',
            'languages' => 'nullable|string',
            'categories' => 'nullable|array',
            'streaming_platforms' => 'nullable|array',
            'persons' => 'nullable|array',
        ]);

        $show->update($validated);

        if (isset($validated['categories'])) {
            $show->categories()->sync($validated['categories']);
        }

        if (isset($validated['streaming_platforms'])) {
            $show->streamingPlatforms()->sync($validated['streaming_platforms']);
        }

        if (isset($validated['persons'])) {
            $syncData = [];
            foreach ($validated['persons'] as $person) {
                $syncData[$person['id']] = ['role' => $person['role'] ?? null];
            }
            $show->persons()->sync($syncData);
        }

        return response()->json($show->load(['categories', 'streamingPlatforms', 'persons']));
    }

    public function destroy($id)
    {
        $show = Show::findOrFail($id);
        $show->delete();

        return response()->json(['message' => 'Show deleted successfully'], 200);
    }

    public function search(Request $request)
    {
        $query = Show::with(['categories', 'streamingPlatforms', 'persons']);

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('category_id', $request->category);
            });
        }

        if ($request->has('platform')) {
            $query->whereHas('streamingPlatforms', function ($q) use ($request) {
                $q->where('streaming_platform_id', $request->platform);
            });
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('search')) {
            $query->where('description', 'like', '%' . $request->search . '%');
        }

        return response()->json($query->paginate(20));
    }
}

