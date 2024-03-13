import PropTypes from "prop-types";

const Input = (props) => {
  const { id, error, label, layout, type, options } = props;

  return (
    <div className="py-2">
      {layout === "flex" ? (
        <>
          {
            <RenderInput
              className="inline px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type={type}
              options={options}
              {...props}
            />
          }
          <label htmlFor={id} className="inline px-2 text-sm font-medium text-gray-900">
            {label}
          </label>
        </>
      ) : (
        <>
          <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
          <div className="mt-2">
            {
              <RenderInput
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type={type}
                options={options}
                {...props}
              />
            }
          </div>
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

const RenderInput = (props) => {
  const { className, type, options } = props;
  switch (type) {
    case "select":
      return (
        <select
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          {...props}
        >
          {options.map((option, index) => (
            <option key={option + index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    default:
      return <input className={className} {...props} />;
  }
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  options: PropTypes.array,
  layout: PropTypes.string,
};

RenderInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array || undefined,
};

export default Input;
