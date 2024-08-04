// import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { FaCopy } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        console.log(passwords)
        setPasswordArray(passwords);



    }

    useEffect(() => {
        getPasswords()


    }, [])


    const copyText = (text) => {

        toast.info('🦄 copied to clipboard!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {

        if (ref.current.src.includes("eye2.png")) {

            ref.current.src = "eye.png"
            ref.current.style.width = '44px'
            ref.current.style.bottom= '29px'
        
            passwordRef.current.type = 'password'

        }
        else {
            ref.current.src = "eye2.png"
            ref.current.style.width = '36px'
            ref.current.style.bottom= '33px'

            passwordRef.current.type = 'text'
        }




        // const eye1 = document.getElementById('eye1').style.display = 'block'



        //     if (eye1) {
        //         document.getElementById('eye1').style.display = 'none';
        //         document.getElementById('eye2').style.display = 'block';


        //     }
        //     else {
        //         document.getElementById('eye2').style.display = 'none';
        //         document.getElementById('eye1').style.display = 'block';


        //     }


    }
    const savePassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            //IF ANY SUCH ID EXISTS IN THE DB , DELETE IT
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify({id:  form.id})})
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
           await fetch("http://localhost:3000/",{method:"POST",headers:{"content-Type":"application/json"},body:JSON.stringify({ ...form, id: uuidv4() })})
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast.info('🦄 saved sucessfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

        }
        else {
            toast.error('🦄 Error:please enter more than 3 words or numbers!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }
    const deletePassword = async(id) => {
        console.log("Deleting password with id", id)
        let c = confirm("do you really want to delete this password?")
        if (c) {

            setPasswordArray(passwordArray.filter(item => item.id !== id))
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-Type":"application/json"},body:JSON.stringify({ id})})
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast.info('🦄 deleted sucessfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

    }
    const editPassword = (id) => {



        setform({...passwordArray.filter(i => i.id === id !== id)[0] , id:id})
        setPasswordArray(passwordArray.filter(item => item.id !== id))


    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />

            <div className="absolute top-0 z-[-2] h-screen w-screen bg-green-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,263,255,0)_50%,rgba(0,363,255,0)_100%)]"></div>
            <div className="p-3 md:p-0  md:mycontainer min-h-[77.5vh]  ">
                <h1 className='text-center '><span className='text-green-700'>&lt;</span>Pass
                    <span className='text-green-500'>Op/&gt;</span></h1>
                <p className=' text-center  capitalize text-green-900 text-lg'>your own password manager</p>
                <div className="text-black p-4 flex flex-col gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row gap-8 w-full ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name='username' id='username' />

                        <div className="">

                            <input value={form.password} onChange={handleChange} ref={passwordRef} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1' type="password" name='password' id='password' />
                            <span className=' cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1 w-11 relative left-[8rem] bottom-7 block ' id='eye1' src="eye.png" alt="eye" />

                            </span>


                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 border border-green-900 bg-green-400 rounded-full w-fit px-8 py-2 hover:bg-green-300'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save </button>
                </div>
                <div className="passwords">
                    <h3 className='text-center py-2'>YOUR PASSWORDS</h3>


                    {/* Table */}
                    {passwordArray.length === 0 && <div> No Passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100 '>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>

                                    <td className='py-2 text-center  border border-white  '>
                                        <div className=' gap-3 flex text-center items-center justify-center '><span>{item.site}</span>
                                            <FaCopy className='cursor-pointer size-6 ' onClick={() => { copyText(item.site) }} />
                                        </div>
                                    </td>
                                    <td className=' py-2 text-center  border border-white '>
                                        <div className=' gap-3 flex items-center text-center justify-center'><span>{item.username} </span>
                                            <FaCopy className='cursor-pointer size-6 ' onClick={() => { copyText(item.username) }} />
                                        </div>
                                    </td>
                                    <td className='py-2 text-center  border border-white  '>
                                        <div className=' gap-3 flex items-center text-center justify-center'><span>{'*'.repeat(item.password.length)}</span>
                                            <FaCopy className='cursor-pointer size-6 ' onClick={() => { copyText(item.password) }} />
                                        </div>
                                    </td>
                                    <td className='py-2 text-center  border border-white '>
                                        <span className='flex  gap-3 justify-center'>
                                            <FaEdit className='size-6 ' onClick={() => { editPassword(item.id) }} />
                                            <lord-icon onClick={() => { deletePassword(item.id) }}
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    )
}

export default Manager
