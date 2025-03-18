"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is requiered!" }),
  lastName: z.string().min(1, { message: "Last name is requiered!" }),
  phone: z.string().min(1, { message: "Phone is requiered!" }),
  address: z.string().min(1, { message: "Address name is requiered!" }),
  birthday: z.date({ message: "Birthday is requiered!" }),
  sex: z.enum(["male", "female"], { message: "Sex name is requiered!" }),
  img: z.instanceof(File, { message: "Image is requiered!" }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication information
      </span>
      <InputField
        label="Username"
        name="username"
        defaultValue={data?.username}
        register={register}
        error={errors?.username}
      />
      <InputField
        label="Email"
        name="email"
        defaultValue={data?.email}
        register={register}
        error={errors?.email}
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        defaultValue={data?.password}
        register={register}
        error={errors?.password}
      />
      <span className="text-xs text-gray-400 font-medium">
        Personal information
      </span>
      <button className="bg-blue-400 text-white p-2 rounded-md">Create</button>
    </form>
  );
};

export default TeacherForm;
