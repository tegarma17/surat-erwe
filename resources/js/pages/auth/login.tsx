import AuthLayout from '@/layouts/auth-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FormEventHandler } from 'react';
import login from '../../../../public/login.png';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });
    // const [showPassword, setShowPassword] = useState(false);
    // const [isChecked, setIsChecked] = useState(false);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="" description="">
            <Head title="Log in eRWe" />

            <form method="POST" className="flex flex-col gap-6" onSubmit={submit}>
                <div className="flex flex-col items-center justify-center gap-5 lg:flex-row">
                    <motion.img
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.1 }}
                        exit={{ opacity: 0 }}
                        src={login}
                        alt=""
                        className="max-w-full lg:w-2/5"
                    />
                    <div className="mx-3 w-full items-center justify-center lg:w-1/2 lg:items-start lg:justify-around">
                        <motion.h1
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.1 }}
                            exit={{ opacity: 0 }}
                            className="text-center font-dua text-4xl font-bold"
                        >
                            Login ERWE 08
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
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                            <label htmlFor="">Password</label>
                            <input
                                type="password"
                                placeholder="Type here"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-black dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.1 }}
                            exit={{ opacity: 0 }}
                            className="mx-3 my-2 flex flex-row gap-3"
                        >
                            <button className="rounded-md bg-blue-800 px-5 py-2">Login</button>
                            <Link href="/register" className="rounded-md bg-yellow-600 px-5 py-2">
                                Register
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
