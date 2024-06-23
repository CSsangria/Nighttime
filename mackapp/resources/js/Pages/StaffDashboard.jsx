import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const StaffDashboard = () => {
    const { enrollments2, errors, message, auth } = usePage().props;
    const [editId, setEditId] = useState(null);
    const [filters, setFilters] = useState({
        id: '',
        application_type: '',
        year: '',
        department: '',
        course: '',
        first_name: '',
        last_name: ''
    });
    const { data, setData, put, processing } = useForm({
        term: '',
        application_type: '',
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
            application_type: enrollment.application_type,
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('enrollments2.update', editId));
        setEditId(null); // Hide the edit form after submission
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this enrollment?')) {
            Inertia.delete(route('enrollments2.destroy', id));
            window.location.href = '/staffdashboard';
        }
    };

    const filteredenrollments2 = enrollments2.filter((enrollment) => {
        return (
            enrollment.status !== 'Not Saved' &&
            (!filters.id || enrollment.id.toString().includes(filters.id)) &&
            (!filters.application_type || enrollment.application_type.includes(filters.application_type)) &&
            (!filters.year || enrollment.year.includes(filters.year)) &&
            (!filters.department || enrollment.department.includes(filters.department)) &&
            (!filters.course || enrollment.course.includes(filters.course)) &&
            (!filters.first_name || enrollment.first_name.includes(filters.first_name)) &&
            (!filters.last_name || enrollment.last_name.includes(filters.last_name))
        );
    });

    if (auth.user.id !== 2) {
        return (
            <AuthenticatedLayout>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                    <p>You do not have permission to view this page.</p>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>
                {errors.access && <div className="text-red-600 font-bold mt-4">{errors.access}</div>}
                {message && <div className="text-green-600 font-bold mt-4">{message}</div>}

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="filterId" className="block text-sm font-medium text-gray-700">
                                ID
                            </label>
                            <input
                                type="text"
                                name="id"
                                value={filters.id}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="filterApplicationType" className="block text-sm font-medium text-gray-700">
                                Application Type
                            </label>
                            <select
                                name="application_type"
                                value={filters.application_type}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">All</option>
                                <option value="new">New</option>
                                <option value="transfer">Transfer</option>
                                <option value="returning">Returning</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="filterYear" className="block text-sm font-medium text-gray-700">
                                Year
                            </label>
                            <select
                                name="year"
                                value={filters.year}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">All</option>
                                <option value="1st year - Baccalaureate">1st year - Baccalaureate</option>
                                <option value="2nd year - Baccalaureate">2nd year - Baccalaureate</option>
                                <option value="3rd year - Baccalaureate">3rd year - Baccalaureate</option>
                                <option value="4th year - Baccalaureate">4th year - Baccalaureate</option>
                                <option value="5th year - Baccalaureate">5th year - Baccalaureate</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="filterDepartment" className="block text-sm font-medium text-gray-700">
                                Department
                            </label>
                            <select
                                name="department"
                                value={filters.department}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">All</option>
                                <option value="CITC">CITC</option>
                                <option value="CEA">CEA</option>
                                <option value="CON">CON</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="filterCourse" className="block text-sm font-medium text-gray-700">
                                Course
                            </label>
                            <select
                                name="course"
                                value={filters.course}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">All</option>
                                {filters.department === "CITC" && (
                                    <>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Information Technology">Information Technology</option>
                                    </>
                                )}
                                {filters.department === "CEA" && (
                                    <>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Architecture">Architecture</option>
                                    </>
                                )}
                                {filters.department === "CON" && (
                                    <option value="Nursing">Nursing</option>
                                )}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="filterFirstName" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={filters.first_name}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="filterLastName" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={filters.last_name}
                                onChange={handleFilterChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Total enrollments: {filteredenrollments2.length}</h2>
                </div>

                {filteredenrollments2.length > 0 ? (
                    <div className="mt-6 overflow-x-auto">
                        <div className="min-w-full align-middle inline-block shadow overflow-hidden rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 bg-gray-200 w-20">ID</th>
                                        <th className="px-4 py-2 bg-gray-200">Term</th>
                                        <th className="px-4 py-2 bg-gray-200">Application Type</th>
                                        <th className="px-4 py-2 bg-gray-200">Course</th>
                                        <th className="px-4 py-2 bg-gray-200">Department</th>
                                        <th className="px-4 py-2 bg-gray-200">Year</th>
                                        <th className="px-4 py-2 bg-gray-200">First Name</th>
                                        <th className="px-4 py-2 bg-gray-200">Last Name</th>
                                        <th className="px-4 py-2 bg-gray-200">Email</th>
                                        <th className="px-4 py-2 bg-gray-200">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredenrollments2.map((enrollment) => (
                                        <tr key={enrollment.id}>
                                            <td className="border px-4 py-2">{enrollment.id}</td>
                                            <td className="border px-4 py-2">{enrollment.term}</td>
                                            <td className="border px-4 py-2">{enrollment.application_type}</td>
                                            <td className="border px-4 py-2">{enrollment.course}</td>
                                            <td className="border px-4 py-2">{enrollment.department}</td>
                                            <td className="border px-4 py-2">{enrollment.year}</td>
                                            <td className="border px-4 py-2">{enrollment.first_name}</td>
                                            <td className="border px-4 py-2">{enrollment.last_name}</td>
                                            <td className="border px-4 py-2">{enrollment.email}</td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    onClick={() => handleEdit(enrollment)}
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(enrollment.id)}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p className="mt-6 text-gray-600">No enrollments found.</p>
                )}
            </div>

            {editId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-3/4">
                        <h2 className="text-2xl font-semibold mb-4">Edit Enrollment</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                                        Term
                                    </label>
                                    <input
                                        type="text"
                                        name="term"
                                        value={data.term}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="application_type" className="block text-sm font-medium text-gray-700">
                                        Application Type
                                    </label>
                                    <select
                                        name="application_type"
                                        value={data.application_type}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="new">New</option>
                                        <option value="transfer">Transfer</option>
                                        <option value="returning">Returning</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                                        Course
                                    </label>
                                    <input
                                        type="text"
                                        name="course"
                                        value={data.course}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                        Department
                                    </label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={data.department}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                                        Year
                                    </label>
                                    <input
                                        type="text"
                                        name="year"
                                        value={data.year}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={data.first_name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={data.last_name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setEditId(null)}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default StaffDashboard;
