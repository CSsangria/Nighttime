import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage } from '@inertiajs/react';

const StaffDashboard = () => {
    const { enrollments, errors } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Staff Dashboard</h1>
                {errors.access && <div className="text-red-600 font-bold mt-4">{errors.access}</div>}

                {enrollments.length > 0 ? (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">All Enrollments</h2>
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Term</th>
                                    <th className="px-4 py-2">Year</th>
                                    <th className="px-4 py-2">Department</th>
                                    <th className="px-4 py-2">Course</th>
                                    <th className="px-4 py-2">First Name</th>
                                    <th className="px-4 py-2">Last Name</th>
                                    <th className="px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment.id}>
                                        <td className="border px-4 py-2">{enrollment.id}</td>
                                        <td className="border px-4 py-2">{enrollment.term}</td>
                                        <td className="border px-4 py-2">{enrollment.year}</td>
                                        <td className="border px-4 py-2">{enrollment.department}</td>
                                        <td className="border px-4 py-2">{enrollment.course}</td>
                                        <td className="border px-4 py-2">{enrollment.first_name}</td>
                                        <td className="border px-4 py-2">{enrollment.last_name}</td>
                                        <td className="border px-4 py-2">{enrollment.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="mt-4">No enrollment data found.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default StaffDashboard;

