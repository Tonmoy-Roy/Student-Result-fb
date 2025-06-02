import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Student = ({ student = {}, students, setStudents }) => {
    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/students/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaining = students.filter(std => std._id !== id);
                            setStudents(remaining);

                        }
                    })
            }
        });
    }
    return (
        <div className="card card-dash bg-base-100 w-96 border-4 border-green-600 rounded">
            <div className="card-body ">
                <h2 className="card-title">{student.name}</h2>
                <div className='text-left text-xl'>
                    <p>ID : {student.id}</p>
                    <p>Class : {student.cls}</p>
                    <p>Result : {student.result}</p>
                </div>
                <div className="card-actions justify-start">
                    <Link to={`/update/${student._id}`}><button className="btn btn-active btn-success">Update</button></Link>
                    <button onClick={() => handleDelete(student._id)} className="btn btn-active btn-error">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Student;