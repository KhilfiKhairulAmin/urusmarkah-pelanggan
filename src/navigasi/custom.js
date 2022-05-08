import { Route } from "react-router-dom";

export default function CustomRoute (props) {
    const path = `${props.path}${props.query}`
    return (
        <Route path={path} element={props.element} />
    )
}