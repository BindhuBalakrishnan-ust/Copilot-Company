import React, { useEffect, useState } from 'react';

const AdminDashboardPage = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPendingUsers = async () => {
            const response = await fetch('/api/admin/pending-users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
            });
            const result = await response.json();
            if (response.ok) {
                setPendingUsers(result.users);
            } else {
                setMessage(result.message || 'Failed to fetch users.');
            }
        };
        fetchPendingUsers();
    }, []);

    const handleAction = async (userId, action) => {
        const response = await fetch(`/api/admin/users/${userId}/${action}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        const result = await response.json();
        if (response.ok) {
            setPendingUsers(pendingUsers.filter((user) => user._id !== userId));
        } else {
            setMessage(result.message || 'Action failed.');
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {message && <p>{message}</p>}
            <ul>
                {pendingUsers.map((user) => (
                    <li key={user._id}>
                        {user.name} ({user.email})
                        <button onClick={() => handleAction(user._id, 'approve')}>Approve</button>
                        <button onClick={() => handleAction(user._id, 'reject')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboardPage;
