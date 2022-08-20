const InputGroup = ({ name, isError = false }) => {
  return (
    <div className="InputGroup p-7 bg-gray-800 rounded-3xl flex items-center justify-center flex-col text-xl gap-6 max-w-[90%]">
      <label className=" font-['Open Sans'] text-3xl" htmlFor={name}>
        {name[0].toUpperCase() + name.slice(1)}
      </label>
      <input
        className={`rounded-3xl p-4 flex-1 text-black  border-2 outline-none  ${
          isError ? "border-red-700" : "border-white"
        }`}
        type={name === "password" ? "password" : "text"}
        name={name}
        id={name}
      />
    </div>
  );
};

export default InputGroup;
