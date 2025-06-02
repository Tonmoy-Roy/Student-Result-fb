import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateStudent = () => {
    const student = useLoaderData();
    console.log(student);
    function handleUpdate(e) {
        e.preventDefault();
        const form = e.target;
        const id = form.id.value;
        const name = form.name.value;
        const cls = form.cls.value;
        const result = form.result.value;
        const user = { id, name, cls, result }
        fetch(`http://localhost:5000/students/${student._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Student Updated Successfully",
                        icon: "success"
                    });
                }
            })
    }
    return (
        <div>
            <div>
                <form onSubmit={handleUpdate}>
                    <div className="flex items-center justify-center">
                        <div className=' p-8 rounded shadow'>
                            <p className='text-3xl font-bold mb-6'>Update the Student</p>
                            <div className='flex gap-20 mb-4'>
                                <div>
                                    <p className='text-left'>ID</p>
                                    <input className='md:w-[15vw] md:h-[6vh] rounded p-3' type="text" name="id" placeholder='enter id' defaultValue={student.id} />
                                </div>
                                <div>
                                    <p className='text-left'>Name</p>
                                    <input className='md:w-[15vw] md:h-[6vh] rounded p-3' type="text" name="name" placeholder='enter name' defaultValue={student.name} />
                                </div>
                            </div>
                            <div className='flex gap-20 mb-4'>
                                <div>
                                    <p className='text-left'>Class</p>
                                    <input className='md:w-[15vw] md:h-[6vh] rounded p-3' type="text" name="cls" placeholder='enter class' defaultValue={student.cls} />
                                </div>
                                <div>
                                    <p className='text-left'>Result</p>
                                    <input className='md:w-[15vw] md:h-[6vh] rounded p-3' type="text" name="result" placeholder='enter result' defaultValue={student.result} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateStudent;