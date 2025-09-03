// import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

export default function Register() {
	const navigate = useNavigate();
	const [apiError, setapiError] = useState("");
	const [isLoading, setisLoading] = useState(false);

	const schema = z
		.object({
			name: z
				.string()
				.min(1, "Name is required")
				.max(10, "max length is 10"),
			email: z.email(),
			password: z
				.string()
				.regex(
					/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
					"capital letter &small letter & number & spcical char atleast and min length 8 chars"
				),
			rePassword: z.string(),
			dateOfBirth: z
				.string()
				.regex(/^\d{4}-\d{2}-\d{2}$/, "invalid date")
				.refine((date) => {
					const userDate = new Date(date); // user data
					const nowDate = new Date(); // now date
					nowDate.setHours(0, 0, 0, 0);

					return userDate < nowDate;
				}, "can't be future date"),

			gender: z.enum(
				["male", "female"],
				"gender must be one of male or female"
			),
		})
		.refine((obj) => obj.password === obj.rePassword, {
			error: "password & repassword not matched !",
			path: ["rePassword"],
		});

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			rePassword: "",
			dateOfBirth: "",
			gender: "",
		},
		resolver: zodResolver(schema),
	});

	const { register, handleSubmit, formState } = form; // {onChange, onBlur, ref, name}

	function handleRegister(values) {
		setisLoading(true);
		axios
			.post(`https://linked-posts.routemisr.com/users/signup`, values)
			.then((res) => {
				if (res.data.message === "success") {
					// go login
					setisLoading(false);
					console.log("done");
					navigate("/login");
				}
			})
			.catch((err) => {
				// console.log(err.response.data.error);
				// show error
				// console.log(err.response.data.error);
				setapiError(err.response.data.error);
				setisLoading(false);
			});
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(handleRegister)}
				className="max-w-md mx-auto">
				{apiError && (
					<h1 className="bg-red-600 text-white text-center  rounded-md font-bold p-3 my-4">
						{apiError}
					</h1>
				)}

				<div className="relative z-0 w-full mb-5 group">
					<input
						{...register("name")}
						type="text"
						id="name"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						htmlFor="name"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Enter Your Name
					</label>
					{formState.errors.name && formState.touchedFields.name ? (
						<p className="text-center my-2 text-red-600 font-bold">
							{formState.errors.name.message}
						</p>
					) : (
						""
					)}
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="email"
						{...register("email")}
						id="email"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						htmlFor="email"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Enter Your Email
					</label>
					{formState.errors.email && formState.touchedFields.email ? (
						<p className="text-center my-2 text-red-600 font-bold">
							{formState.errors.email.message}
						</p>
					) : (
						""
					)}
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="password"
						{...register("password")}
						id="password"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						htmlFor="password"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Enter Your Passowrd
					</label>
					{formState.errors.password &&
					formState.touchedFields.password ? (
						<p className="text-center my-2 text-red-600 font-bold">
							{formState.errors.password.message}
						</p>
					) : (
						""
					)}
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="password"
						{...register("rePassword")}
						id="rePassword"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						htmlFor="rePassword"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Enter Your rePassowrd
					</label>
					{formState.errors.rePassword &&
					formState.touchedFields.rePassword ? (
						<p className="text-center my-2 text-red-600 font-bold">
							{formState.errors.rePassword.message}
						</p>
					) : (
						""
					)}
				</div>
				<div className="relative z-0 w-full mb-5 group">
					<input
						type="date"
						{...register("dateOfBirth")}
						id="dateOfBirth"
						className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						htmlFor="dateOfBirth"
						className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
						Enter Your Birthday
					</label>
					{formState.errors.dateOfBirth &&
					formState.touchedFields.dateOfBirth ? (
						<p className="text-center my-2 text-red-600 font-bold">
							{formState.errors.dateOfBirth.message}
						</p>
					) : (
						""
					)}
				</div>
				<div className="flex gap-4">
					<div className="flex items-center mb-4">
						<input
							id="male"
							type="radio"
							{...register("gender")}
							value="male"
							className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label
							htmlFor="male"
							className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
							Male
						</label>
					</div>
					<div className="flex items-center mb-4">
						<input
							id="female"
							type="radio"
							{...register("gender")}
							value="female"
							className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label
							htmlFor="female"
							className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
							feMale
						</label>
					</div>
					{formState.errors.gender ? (
						<p className="text-center my-2 text-red-600 font-bold">
							{formState.errors.gender.message}
						</p>
					) : (
						""
					)}
				</div>

				<button
					disabled={isLoading}
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					{isLoading ? (
						<i className="fas fa-spinner fa-spin text-white"></i>
					) : (
						"Register"
					)}
				</button>
			</form>
		</>
	);
}
