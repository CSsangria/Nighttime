<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use Inertia\Inertia;

class HigherEditController extends Controller
{
    protected $dashboardRoute;

    public function __construct($dashboardRoute)
    {
        $this->dashboardRoute = $dashboardRoute;
    }

    public function index()
    {
        $enrollments = Enrollment::all();

        return Inertia::render($this->dashboardRoute, [
            'enrollments' => $enrollments,
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

        return redirect()->route($this->dashboardRoute)->with('message', 'Enrollment updated successfully.');
    }

    public function destroy($id)
    {
        $enrollment = Enrollment::findOrFail($id);
        $enrollment->delete();

        return redirect()->route($this->dashboardRoute)->with('message', 'Enrollment deleted successfully.');
    }
}
