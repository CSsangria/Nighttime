<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use Inertia\Inertia;

class AdminEnrollmentController extends Controller
{
    public function index()
    {
        $enrollments = Enrollment::all();
        return Inertia::render('AdminDashboard', [
            'enrollments' => $enrollments,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'term' => 'required|string',
            'applicationType' => 'required|string',
            'course' => 'required|string',
            'department' => 'required|string',
            'year' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email',
        ]);

        $enrollment = Enrollment::findOrFail($id);
        $enrollment->update($validated);

        return redirect()->route('admindashboard')->with('message', 'Enrollment updated successfully');
    }

    public function destroy($id)
    {
        $enrollment = Enrollment::findOrFail($id);
        $enrollment->delete();

        return redirect()->route('admindashboard')->with('message', 'Enrollment deleted successfully');
    }
}
