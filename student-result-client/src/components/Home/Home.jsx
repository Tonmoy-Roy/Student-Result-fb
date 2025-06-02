import React from 'react';
import Swal from 'sweetalert2';

const Home = () => {
    function handleAdd(e) {
        e.preventDefault();
        const form = e.target;
        const id = form.id.value;
        const name = form.name.value;
        const cls = form.cls.value;
        const result = form.result.value;
        const user = { id, name, cls, result };
        console.log(user);

        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Student Added Successfully",
                        icon: "success"
                    });
                }
            })
    }
    return (
        <div>
            <div>
                <form onSubmit={handleAdd}>
                    <div className="flex items-center justify-center">
                        <div className=' p-8 rounded shadow'>
                            <p className='text-3xl font-bold mb-6'>Add New Student</p>
                            <div className='flex gap-20 mb-4'>
                                <div>
                                    <p className='text-left'>ID</p>
                                    <input className='md:w-[15vw] md:h-[6vh] rounded p-3' type="text" name="id" placeholder='enter id'/>
                                </div>
                                <div>
                                    <p className='text-left'>Name</p>
                                    <input className='md:w-[15vw] md:h-[6vh] rounded p-3' type="text" name="name" placeholder='enter name' />
                                </div>
                            </div>
                            <div className='flex gap-20 mb-4'>
                                <div>
                                    <p className='text-left'>Class</p>
                                    <input className='md:w-[15vw] md:h-[6vh] rounded p-3' type="text" name="cls" placeholder='enter class' />
                                </div>
                                <div>
                                    <p className='text-left'>Result</p>
                                    <input className='md:w-[15vw] md:h-[6vh] rounded p-3' type="text" name="result" placeholder='enter result' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary'>Add Student</button>
                </form>
            </div>
        </div>
    );
};

export default Home;