<?php

namespace App\Http\Controllers;

use App\Models\StreamingPlatform;
use Illuminate\Http\Request;

class StreamingPlatformController extends Controller
{
    public function index()
    {
        $platforms = StreamingPlatform::withCount('shows')->get();
        return response()->json($platforms);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:streaming_platforms,name',
        ]);

        $platform = StreamingPlatform::create($validated);

        return response()->json($platform, 201);
    }

    public function show($id)
    {
        $platform = StreamingPlatform::with('shows')->findOrFail($id);
        return response()->json($platform);
    }

    public function update(Request $request, $id)
    {
        $platform = StreamingPlatform::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:streaming_platforms,name,' . $id,
        ]);

        $platform->update($validated);

        return response()->json($platform);
    }

    public function destroy($id)
    {
        $platform = StreamingPlatform::findOrFail($id);
        $platform->delete();

        return response()->json(['message' => 'Streaming platform deleted successfully'], 200);
    }
}

