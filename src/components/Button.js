import React, {useState, useEffect} from "react";

const Button = (props) => {
    const [click, setClick] = useState(1);
    // для класів використовується componentDidUpdate(prev){}; як альтернатива useEffect
    useEffect(() => {
        document.title = `You press ${click} try`
    })
    console.log(click)
    return(
        <button onClick={()=> setClick(click+1)}>{props.text} {click}</button>
    )
}

Button.defaultProps = {
    text: "On default text of button"
}

export default Button;