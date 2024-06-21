import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Review = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(null);
    const [totalTuition, setTotalTuition] = useState(0);

    useEffect(() => {
        axios.get('/enrollments')
            .then(response => {
                setEnrollments(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('There was an error fetching the enrollments.');
                setLoading(false);
            });
    }, []);

    const fetchSubjects = (enrollmentId) => {
        axios.get(`/enrollments/${enrollmentId}/subjects`)
            .then(response => {
                const subjectsData = response.data.subjects;
                setSubjects(subjectsData);
                setSelectedEnrollmentId(enrollmentId);
                const total = subjectsData.reduce((sum, subject) => sum + (parseFloat(subject.tuition_fee) || 0), 0);
                setTotalTuition(total);
            })
            .catch(error => {
                console.error(error);
            });
    };

    if (loading) {
        return <div className="text-center text-lg mt-6">Loading enrollments...</div>;
    }

    if (error) {
        return <div className="text-center text-lg text-red-500 mt-6">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 font-sans">
            <h1 className="text-2xl font-bold text-center mb-6">Enrollments Review</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="w-full bg-gray-100">
                            <th className="py-2 px-4 border-b">First Name</th>
                            <th className="py-2 px-4 border-b">Last Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Department</th>
                            <th className="py-2 px-4 border-b">Course</th>
                            <th className="py-2 px-4 border-b">Term</th>
                            <th className="py-2 px-4 border-b">Year</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enrollment) => (
                            <tr key={enrollment.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{enrollment.first_name}</td>
                                <td className="py-2 px-4 border-b">{enrollment.last_name}</td>
                                <td className="py-2 px-4 border-b">{enrollment.email}</td>
                                <td className="py-2 px-4 border-b">{enrollment.department}</td>
                                <td className="py-2 px-4 border-b">{enrollment.course}</td>
                                <td className="py-2 px-4 border-b">{enrollment.term}</td>
                                <td className="py-2 px-4 border-b">{enrollment.year}</td>
                                <td className="py-2 px-4 border-b">
                                    <button onClick={() => fetchSubjects(enrollment.id)} className="text-blue-500">View Subjects</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedEnrollmentId && (
                    <div className="mt-6">
                        <h2 className="text-xl font-bold">Subjects for Enrollment ID: {selectedEnrollmentId}</h2>
                        <ul className="list-disc pl-6">
                            {subjects.map(subject => (
                                <li key={subject.subject_name}>
                                    {subject.subject_name} - ${parseFloat(subject.tuition_fee).toFixed(2)} - Professor: {subject.professor} - Room: {subject.room}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 font-bold">
                            Total Tuition Fee: ${totalTuition.toFixed(2)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Review;
