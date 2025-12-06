<?php

namespace App\Http\Controllers;

use App\Services\PersonService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PersonController extends Controller
{
    protected PersonService $personService;

    public function __construct(PersonService $personService)
    {
        $this->personService = $personService;
    }

    /**
     * GET /api/persons/search?q=Leonardo
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->get('q', '');
        $results = $this->personService->search($query);

        return response()->json($results);
    }
}
