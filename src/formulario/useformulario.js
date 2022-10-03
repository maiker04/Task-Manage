import { useState } from "react";

const useFormulario = (initial) => {
    const [formulario, setformulario] = useState(initial)
    const handlechange = (e) => {
        setformulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }
    const reset = () => {
        setformulario(initial)
    }
    return [formulario, handlechange, reset]
}
export default useFormulario;
