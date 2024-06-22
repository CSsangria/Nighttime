<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class StatisticsController extends Controller
{
    public function index()
    {
        return Inertia::render('Statistics', [
            'auth' => auth()->user(),
        ]);
    }
}
