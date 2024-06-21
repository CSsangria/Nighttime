import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faUserPlus, faUserCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Statistics = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [editMode, setEditMode] = useState(null);
    const [formData, setFormData] = useState({ name: '', course: '', status: '', dateEnrolled: '' });

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/enrollments');
            setEnrollments(response.data);
        } catch (error) {
            console.error("There was an error fetching the enrollments:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/enrollments/${id}`);
            fetchEnrollments();
        } catch (error) {
            console.error("There was an error deleting the enrollment:", error);
        }
    };

    const handleEdit = (enrollment) => {
        setEditMode(enrollment.id);
        setFormData({ 
            name: enrollment.name, 
            course: enrollment.course, 
            status: enrollment.status, 
            dateEnrolled: enrollment.dateEnrolled 
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/enrollments/${editMode}`, formData);
            setEditMode(null);
            fetchEnrollments();
        } catch (error) {
            console.error("There was an error updating the enrollment:", error);
        }
    };

    return (
        <div className="statistics-container p-6">
            <h1 className="text-3xl font-bold mb-6">Enrollment Statistics</h1>
            <p className="mb-6">Welcome to the Enrollment Statistics page. Here you can explore various statistics related to student enrollments and registrations.</p>

            {/* Statistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUserGraduate} className="text-3xl text-yellow-500 mr-4" />
                        <div>
                            <h2 className="text-xl font-bold">1500</h2>
                            <p className="text-gray-600">Total Enrollments</p>
                        </div>
                    </div>
                    <p className="text-green-500 mt-4">↑ 10% this month</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUserPlus} className="text-3xl text-pink-500 mr-4" />
                        <div>
                            <h2 className="text-xl font-bold">300</h2>
                            <p className="text-gray-600">New Enrollments</p>
                        </div>
                    </div>
                    <p className="text-green-500 mt-4">↑ 5% this month</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUserCheck} className="text-3xl text-blue-500 mr-4" />
                        <div>
                            <h2 className="text-xl font-bold">1200</h2>
                            <p className="text-gray-600">Confirmed Enrollments</p>
                        </div>
                    </div>
                    <p className="text-green-500 mt-4">↑ 8% this month</p>
                </div>
            </div>

            {/* View Complete Report Button */}
            <div className="text-center mb-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                    View Complete Report
                </button>
            </div>

            {/* Dynamic Tables */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4">Enrollment Details</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">#</th>
                                <th className="px-4 py-2 border">Student Name</th>
                                <th className="px-4 py-2 border">Course</th>
                                <th className="px-4 py-2 border">Status</th>
                                <th className="px-4 py-2 border">Date Enrolled</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments.map((enrollment, index) => (
                                <tr key={enrollment.id}>
                                    <td className="px-4 py-2 border">{index + 1}</td>
                                    <td className="px-4 py-2 border">{editMode === enrollment.id ? 
                                        <input 
                                            type="text" 
                                            value={formData.name} 
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                        /> : enrollment.name}</td>
                                    <td className="px-4 py-2 border">{editMode === enrollment.id ? 
                                        <input 
                                            type="text" 
                                            value={formData.course} 
                                            onChange={(e) => setFormData({ ...formData, course: e.target.value })} 
                                        /> : enrollment.course}</td>
                                    <td className="px-4 py-2 border">{editMode === enrollment.id ? 
                                        <input 
                                            type="text" 
                                            value={formData.status} 
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                                        /> : enrollment.status}</td>
                                    <td className="px-4 py-2 border">{editMode === enrollment.id ? 
                                        <input 
                                            type="date" 
                                            value={formData.dateEnrolled} 
                                            onChange={(e) => setFormData({ ...formData, dateEnrolled: e.target.value })} 
                                        /> : enrollment.dateEnrolled}</td>
                                    <td className="px-4 py-2 border">
                                        {editMode === enrollment.id ? (
                                            <button onClick={handleUpdate} className="text-green-500 mr-2">Save</button>
                                        ) : (
                                            <button onClick={() => handleEdit(enrollment)} className="text-blue-500 mr-2">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(enrollment.id)} className="text-red-500">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <button className="bg-gray-300 text-gray-700 py-1 px-3 rounded shadow hover:bg-gray-400 transition duration-300">Previous</button>
                        <button className="bg-gray-300 text-gray-700 py-1 px-3 rounded shadow hover:bg-gray-400 transition duration-300 ml-2">Next</button>
                    </div>
                    <span className="text-gray-600">Items per page</span>
                </div>
            </div>

            {/* Timeline Example */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4">Recent Enrollment Events</h2>
                <ul className="timeline">
                    <li className="timeline-item">
                        <div className="timeline-time">10:00 AM</div>
                        <div class  Name="timeline-content bg-gray-100 p-2 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">John Doe enrolled in Computer Science</h3>
                        </div>
                    </li>
                    <li className="timeline-item">
                        <div className="timeline-time">11:00 AM</div>
                        <div className="timeline-content bg-gray-100 p-2 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">Jane Smith's enrollment is pending</h3>
                        </div>
                    </li>
                    <li className="timeline-item">
                        <div className="timeline-time">12:00 PM</div>
                        <div className="timeline-content bg-gray-100 p-2 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">Michael Brown confirmed enrollment in Mechanical Engineering</h3>
                        </div>
                    </li>
                </ul>
                <div className="text-center mt-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                        View All Events
                    </button>
                </div>
            </div>

            {/* Tasks List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Enrollment Tasks List</h2>
                <ul className="task-list">
                    <li className="task-item flex items-center justify-between mb-2">
                        <span className="task-text">Verify pending enrollments</span>
                        <span className="task-status text-yellow-500">IN PROGRESS</span>
                    </li>
                    <li className="task-item flex items-center justify-between mb-2">
                        <span className="task-text">Send confirmation emails</span>
                        <span className="task-status text-green-500">COMPLETED</span>
                    </li>
                    <li className="task-item flex items-center justify-between mb-2">
                        <span className="task-text">Update enrollment records</span>
                        <span className="task-status text-red-500">PENDING</span>
                    </li>
                </ul>
                <div className="text-right mt-4">
                    <a href={route('dashboard')} className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 inline-block">
                        Back
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Statistics;