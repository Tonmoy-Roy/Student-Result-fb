import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Student from '../Student/Student';

const StudentDetails = () => {
    const loadstudents = useLoaderData();
    const [students, setStudents] = useState(loadstudents);
    return (
        <div className='md:grid grid-cols-3 gap-10'>
            {
                students.map(student => <Student key={student._id} student={student} students={students} setStudents={setStudents}></Student>)
            }
        </div>
    );
};

export default StudentDetails;