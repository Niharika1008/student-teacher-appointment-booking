import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../../components/Header";
import Spinner from "../../components/UI/Spinner";

function Student() {
  const navigate = useNavigate();
  const [lectureDetails, setLectureDetails] = useState([]);
  const [email, setEmail] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Dummy fetch (no backend)
  useEffect(() => {
    const emailAdd = localStorage.getItem("email");
    setEmail(emailAdd || "student@gmail.com");

    // Dummy teachers and lectures
    const dummyTeachers = [
      {
        name: "John Doe",
        subject: "Mathematics",
        email: "john.doe@gmail.com",
        appointments: [
          { _id: "1", scheduleAt: new Date().toISOString() },
          { _id: "2", scheduleAt: new Date(Date.now() + 3600000).toISOString() }, // 1 hr later
        ],
      },
      {
        name: "Jane Smith",
        subject: "Science",
        email: "jane.smith@gmail.com",
        appointments: [],
      },
    ];

    const dummyLectures = [
      { name: "John Doe", scheduleAt: new Date().toISOString() },
      { name: "Jane Smith", scheduleAt: new Date(Date.now() + 7200000).toISOString() },
    ];

    setTeachers(dummyTeachers);
    setLectureDetails(dummyLectures);
  }, []);

  const [formData, setFormData] = useState({ message: "" });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // Dummy message sender
  function submitHandler(event) {
    event.preventDefault();
    setShowModal(false);
    toast.success(`Message sent to ${teacherEmail}`);
    setFormData({ message: "" });
  }

  // Dummy book appointment
  const handleBookAppointment = (appointmentId, scheduleAt) => {
    setSpinner(true);
    setTimeout(() => {
      toast.success("Appointment booked successfully!");
      setSpinner(false);
    }, 800);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          {/* message modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen bg-gray-500 bg-opacity-90 transition-opacity">
                <div className="bg-white dark:bg-slate-800 dark:text-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
                  <div className="border-b border-gray-200 p-4">
                    <h5 className="text-lg font-medium">Message Modal</h5>
                  </div>
                  <form onSubmit={submitHandler}>
                    <div className="p-4">
                      <input
                        className="w-full px-4 py-2 border border-gray-300 rounded dark:bg-slate-700"
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={changeHandler}
                        placeholder="Your Message Goes Here"
                      />
                    </div>
                    <div className="flex justify-end border-t border-gray-200 p-4">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <input
                        type="submit"
                        value="Send Message"
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* header */}
          <Header
            name="Student Dashboard"
            style="bg-gradient-to-r from-cyan-500 to-blue-500"
          />
          <div className="px-4 dark:bg-slate-900 dark:text-white">
            {/* info table */}
            <div className="container mx-auto py-4">
              <h2 className="text-2xl font-bold mb-2">
                Your Upcoming Lectures Details
              </h2>
              <hr className="mt-0 mb-4" />
              {lectureDetails.length > 0 ? (
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Sr.No</th>
                      <th className="px-4 py-2">Teacher</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Time Slot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lectureDetails.map((detail, index) => (
                      <tr
                        key={index}
                        className="bg-gray-100 dark:bg-slate-800 text-center hover:dark:bg-slate-950"
                      >
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">{detail.name}</td>
                        <td className="border px-4 py-2">
                          {formatDate(detail.scheduleAt)}
                        </td>
                        <td className="border px-4 py-2">
                          {formatTime(detail.scheduleAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h1 className="text-center text-xl">No Upcoming Lectures</h1>
              )}
            </div>

            {/* card container */}
            <div className="container mx-auto py-4">
              <h2 className="text-2xl font-bold mb-2">All Teachers</h2>
              <hr className="mt-0 mb-4" />
              <div className="flex flex-wrap justify-center gap-4">
                {teachers.map((teacher, index) => (
                  <div
                    className="rounded max-w-80 border shadow-lg p-4 flex flex-col gap-6 justify-between dark:text-white"
                    key={index}
                  >
                    <div>
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/002/406/452/non_2x/female-teacher-teaching-a-lesson-at-the-school-free-vector.jpg"
                        className="w-full"
                        alt="teacher"
                      />
                      <div className="px-6 py-4 flex flex-col gap-4">
                        <h5 className="font-bold text-xl">Name: {teacher.name}</h5>
                        <p className="text-gray-700 dark:text-gray-400">
                          Subject: {teacher.subject}
                        </p>
                        <p className="text-gray-700 dark:text-gray-400">
                          Email: {teacher.email}
                        </p>

                        {teacher.appointments.length > 0 ? (
                          teacher.appointments.map((appointment, aIndex) => (
                            <div key={aIndex} className="flex flex-col gap-4">
                              <p className="text-gray-700 dark:text-gray-400">
                                Timing: {formatTime(appointment.scheduleAt)}
                              </p>
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() =>
                                  handleBookAppointment(
                                    appointment._id,
                                    appointment.scheduleAt
                                  )
                                }
                              >
                                Book Appointment
                              </button>
                            </div>
                          ))
                        ) : (
                          <h2>No scheduled appointments</h2>
                        )}
                      </div>
                    </div>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border w-full"
                      onClick={() => {
                        setTeacherEmail(teacher.email);
                        setShowModal(true);
                      }}
                    >
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Student;
