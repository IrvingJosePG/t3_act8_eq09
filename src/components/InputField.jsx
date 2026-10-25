export default function InputField({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-base font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-4 border border-gray-200 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-base"
        placeholder={placeholder}
      />
    </div>
  );
}