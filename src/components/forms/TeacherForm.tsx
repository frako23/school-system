"use client";

import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
});

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  return <form className="">input</form>;
};

export default TeacherForm;
