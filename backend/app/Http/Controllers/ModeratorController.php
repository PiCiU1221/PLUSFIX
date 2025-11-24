<?php

namespace App\Http\Controllers;

use App\Models\Moderator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ModeratorController extends Controller
{
    public function index()
    {
        $moderators = Moderator::all();
        return response()->json($moderators);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:moderators,name',
            'password' => 'required|string|min:8',
        ]);

        $moderator = Moderator::create([
            'name' => $validated['name'],
            'password' => Hash::make($validated['password']),
            'creation_date' => now(),
        ]);

        return response()->json($moderator, 201);
    }

    public function show($id)
    {
        $moderator = Moderator::findOrFail($id);
        return response()->json($moderator);
    }

    public function update(Request $request, $id)
    {
        $moderator = Moderator::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:moderators,name,' . $id,
            'password' => 'sometimes|string|min:8',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $moderator->update($validated);

        return response()->json($moderator);
    }

    public function destroy($id)
    {
        $moderator = Moderator::findOrFail($id);
        $moderator->delete();

        return response()->json(['message' => 'Moderator deleted successfully'], 200);
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        $moderator = Moderator::where('name', $validated['name'])->first();

        if (!$moderator || !Hash::check($validated['password'], $moderator->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'moderator' => $moderator,
        ]);
    }
}

