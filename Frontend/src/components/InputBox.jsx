export function InputBox({label, placeholder, onChange}) {
    return(
        <div>
            <div className="text-sm font-medium text-left py-2 text-white">
                {label}
            </div>
            <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
        </div>
    );
}