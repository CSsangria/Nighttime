<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Enrollment;

class EnrollmentController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $enrollment = $user->enrollment; 
        return Inertia::render('Enrollment', [
            'auth' => [
                'user' => $user,
                'enrollment' => $enrollment,
            ],
        ]);
    }

    

    public function store(Request $request)
    {
        $request->validate([
            // Add validation rules here
        ]);

        $user = Auth::user();

        // Ensure the user does not have an existing enrollment
        if ($user->enrollment) {
            return redirect()->route('enrollment.index')->with('error', 'You have already submitted the form.');
        }

        $enrollment = new Enrollment($request->all());
        $enrollment->user_id = $user->id;
        $enrollment->save();

        return redirect()->route('dashboard')->with('success', 'Enrollment saved successfully.');
    }


}
