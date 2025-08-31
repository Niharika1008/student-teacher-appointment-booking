import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/UI/Spinner";

function Teacher() {
  const navigate = useNavigate();
  const email = localStorage.getItem("Teacher Email");

  // Dummy students data
  const students = [
    { id: 1, name: "Student One", subject: "Math", date: "2025-08-25" },
    { id: 2, name: "Student Two", subject: "Science", date: "2025-08-26" },
  ];

  const [spinner, setSpinner] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState("");

  const openMessageModal = (student) => {
    setSelectedStudent(student);
    setMessageModal(true);
  };

  const sendMessage = () => {
    toast.success(`Message sent to ${selectedStudent.name}`);
    setMessage("");
    setMessageModal(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("Teacher Email");
    localStorage.removeItem("Teacher Name");
    localStorage.removeItem("Teacher jwtToken");
    toast.success("Logged out successfully");
    navigate("/teacher/login");
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="bg-gray-100 dark:bg-slate-900 min-h-screen p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Teacher Dashboard</h2>
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

          {/* Students Table */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">My Students</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-slate-700">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Subject</th>
                  <th className="p-2 text-left">Date</th>
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
                    <td className="p-2">{student.subject}</td>
                    <td className="p-2">{student.date}</td>
                    <td className="p-2">
                      <button
                        onClick={() => openMessageModal(student)}
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

          {/* Cards Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Upcoming Appointments</h3>
              <ul className="space-y-3">
                {students.map((student) => (
                  <li
                    key={student.id}
                    className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-700 rounded"
                  >
                    <span>{student.name} - {student.subject}</span>
                    <span className="text-sm">{student.date}</span>
                  </li>
                ))}
              </ul>
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
                  Send Message to {selectedStudent.name}
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

export default Teacher;
