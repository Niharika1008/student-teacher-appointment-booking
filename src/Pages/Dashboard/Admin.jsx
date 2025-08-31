import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/UI/Spinner";

function Admin() {
  const navigate = useNavigate();
  const email = localStorage.getItem("Admin Email");

  // Dummy teachers + students
  const teachers = [
    { id: 1, name: "Teacher One", subject: "Math" },
    { id: 2, name: "Teacher Two", subject: "Science" },
  ];

  const students = [
    { id: 1, name: "Student One", class: "10th", subject: "Math" },
    { id: 2, name: "Student Two", class: "12th", subject: "Science" },
  ];

  const [spinner, setSpinner] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  const openMessageModal = (user) => {
    setSelectedUser(user);
    setMessageModal(true);
  };

  const sendMessage = () => {
    toast.success(`Message sent to ${selectedUser.name}`);
    setMessage("");
    setMessageModal(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("Admin Email");
    localStorage.removeItem("Admin Name");
    localStorage.removeItem("Admin jwtToken");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="bg-gray-100 dark:bg-slate-900 min-h-screen p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Admin Dashboard</h2>
            <div className="flex items-center gap-4">
              <span className="dark:text-gray-200">{email}</span>
              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Teachers Table */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Teachers</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-slate-700">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Subject</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    <td className="p-2">{teacher.name}</td>
                    <td className="p-2">{teacher.subject}</td>
                    <td className="p-2">
                      <button
                        onClick={() => openMessageModal(teacher)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Students Table */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Students</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-slate-700">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Class</th>
                  <th className="p-2 text-left">Subject</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    <td className="p-2">{student.name}</td>
                    <td className="p-2">{student.class}</td>
                    <td className="p-2">{student.subject}</td>
                    <td className="p-2">
                      <button
                        onClick={() => openMessageModal(student)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Quick Stats</h3>
              <p className="dark:text-gray-300">Total Teachers: {teachers.length}</p>
              <p className="dark:text-gray-300">Total Students: {students.length}</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Messages</h3>
              <p className="text-gray-600 dark:text-gray-300">No new messages</p>
            </div>
          </div>

          {/* Message Modal */}
          {messageModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">
                  Send Message to {selectedUser.name}
                </h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-slate-700"
                  rows="4"
                />
                <div className="flex justify-end mt-4 gap-3">
                  <button
                    onClick={() => setMessageModal(false)}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Admin;
