<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use Inertia\Inertia;

class StaffEnrollmentController extends Controller
{
    public function index()
    {
        $enrollments = Enrollment::all();

        return Inertia::render('StaffDashboard', [
            'enrollments2' => $enrollments,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'term' => 'required|string|max:255',
            'application_type' => 'required|string|max:255',
            'course' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'year' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
        ]);

        $enrollment = Enrollment::findOrFail($id);
        $enrollment->update($validated);

        return redirect()->route('staffdashboard')->with('message', 'Enrollment updated successfully.');
    }

    public function destroy($id)
    {
        $enrollment = Enrollment::findOrFail($id);
        $enrollment->delete();

        return redirect()->route('staff.dashboard')->with('message', 'Enrollment deleted successfully.');
    }
}
