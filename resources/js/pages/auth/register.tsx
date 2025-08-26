import AuthLayout from '@/layouts/auth-layout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import login from '../../../../public/login.png';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    // const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    //     name: '',
    //     email: '',
    //     password: '',
    //     password_confirmation: '',
    // });

    // const submit: FormEventHandler = (e) => {
    //     e.preventDefault();
    //     post(route('register'), {
    //         onFinish: () => reset('password', 'password_confirmation'),
    //     });
    // };

    return (
        <AuthLayout title="" description="">
            <form method="POST" className="flex flex-col gap-6">
                <div className="flex flex-col items-center justify-center gap-5 lg:flex-row">
                    <img src={login} alt="" className="max-w-full lg:w-2/5" />
                    <div className="mx-3 flex w-full flex-col items-center justify-center gap-3 lg:w-1/2 lg:items-start lg:justify-around">
                        <motion.h1
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.1 }}
                            exit={{ opacity: 0 }}
                            className="text-center font-dua text-4xl font-bold"
                        >
                            Register ERWE 08
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.1 }}
                            exit={{ opacity: 0 }}
                            className="my-3 flex w-full flex-col justify-center gap-3 p-3"
                        >
                            <label htmlFor="">Username</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="name"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                            <label htmlFor="">Nama</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="nama"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                            <label htmlFor="">Email</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                name="email"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                            <label htmlFor="">Password</label>
                            <input
                                type="password"
                                placeholder="Type here"
                                name="password"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.1 }}
                            exit={{ opacity: 0 }}
                            className="my-2 flex flex-row gap-3"
                        >
                            <Link href="/login" className="mx-3 rounded-md bg-yellow-600 px-5 py-2 font-satu">
                                {' < '}Kembali
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
}
