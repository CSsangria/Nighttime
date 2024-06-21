import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage, useForm } from '@inertiajs/react';

const AdminDashboard = () => {
    const { enrollments, errors, message } = usePage().props;
    const [editId, setEditId] = useState(null);
    const { data, setData, put, processing } = useForm({
        term: '',
        applicationType: '',
        course: '',
        department: '',
        year: '',
        first_name: '',
        last_name: '',
        email: '',
    });

    const handleEdit = (enrollment) => {
        setEditId(enrollment.id);
        setData({
            term: enrollment.term,
            applicationType: enrollment.applicationType,
            course: enrollment.course,
            department: enrollment.department,
            year: enrollment.year,
            first_name: enrollment.first_name,
            last_name: enrollment.last_name,
            email: enrollment.email,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('enrollments.update', editId));
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this enrollment?')) {
            Inertia.delete(route('enrollments.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                {errors.access && <div className="text-red-600 font-bold mt-4">{errors.access}</div>}
                {message && <div className="text-green-600 font-bold mt-4">{message}</div>}

                {enrollments.length > 0 ? (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">All Enrollments</h2>
                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Application Type</th>
                                    <th className="px-4 py-2">Year</th>
                                    <th className="px-4 py-2">Department</th>
                                    <th className="px-4 py-2">Course</th>
                                    <th className="px-4 py-2">First Name</th>
                                    <th className="px-4 py-2">Last Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Created At</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.map((enrollment) => (
                                    <tr key={enrollment.id}>
                                        <td className="border px-4 py-2">{enrollment.id}</td>
                                        <td className="border px-4 py-2">{enrollment.application_type}</td>
                                        <td className="border px-4 py-2">{enrollment.year}</td>
                                        <td className="border px-4 py-2">{enrollment.department}</td>
                                        <td className="border px-4 py-2">{enrollment.course}</td>
                                        <td className="border px-4 py-2">{enrollment.first_name}</td>
                                        <td className="border px-4 py-2">{enrollment.last_name}</td>
                                        <td className="border px-4 py-2">{enrollment.email}</td>
                                        <td className="border px-4 py-2">{new Date(enrollment.created_at).toLocaleDateString()}</td>
                                        <td className="border px-4 py-2">
                                            <button onClick={() => handleEdit(enrollment)} className="text-blue-600 hover:underline mr-2">Edit</button>
                                            <button onClick={() => handleDelete(enrollment.id)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {editId && (
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-2">Edit Enrollment</h2>
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                                            Term
                                        </label>
                                        <input
                                            type="text"
                                            name="term"
                                            value={data.term}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="applicationType" className="block text-sm font-medium text-gray-700">
                                            Application Type
                                        </label>
                                        <input
                                            type="text"
                                            name="applicationType"
                                            value={data.applicationType}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                                            Course
                                        </label>
                                        <input
                                            type="text"
                                            name="course"
                                            value={data.course}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                            Department
                                        </label>
                                        <input
                                            type="text"
                                            name="department"
                                            value={data.department}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                                            Year
                                        </label>
                                        <input
                                            type="text"
                                            name="year"
                                            value={data.year}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={data.first_name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                        disabled={processing}
                                    >
                                        Update
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="mt-4">No enrollment data found.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;
