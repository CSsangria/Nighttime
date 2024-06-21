<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Enrollment;

class StaffEnrollmentController extends Controller
{
    public function index()
    {
        $enrollments = Enrollment::all();

        return Inertia::render('StaffDashboard', [
            'enrollments' => $enrollments,
        ]);
    }
}
