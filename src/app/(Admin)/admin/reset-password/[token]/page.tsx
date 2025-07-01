interface Props {
  params: {
    token: string;
  };
}

export default function ResetPasswordPage({ params }: Props) {
  return (
    <section>
      <div className="flex justify-center items-center">
        <form className="bg-white flex-col mt-20 px-10 min-w-xs">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Reset Your Password
          </h2>
          <p className="text-center mt-5 mb-16 text-sm">
            Kindly enter your new Password and confirm
          </p>
          <input
            type="password"
            placeholder="New Password"
            className="mb-6 py-4 px-6 border border-gray-300 rounded w-full"
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="mb-6 py-4 px-6 border border-gray-300 rounded w-full"
          />
          <button
            type="submit"
            className="bg-secondary text-lg text-white w-full px-4 py-3 rounded hover:bg-secondary/60 transition duration-200 mt-6"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}
