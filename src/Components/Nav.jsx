import { propTypes } from "react-bootstrap/esm/Image";
import { useState } from 'react';

export default function Navbar() {
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" />
        </div>
    </nav>
}

const [mode, setMode] = useState('light');
	const [theme, setTheme] = useState('light');

	const toggleMode = () => {
		if (mode === "light") {
		  setmode("dark");
		  document.body.style.backgroundColor = "#050122"; //'#042743'
		  showAlert("Dark Mode has been Enabled", "success");
		} else {
		  setmode("light");
		  document.body.style.backgroundColor = "white";
		  showAlert("Light Mode has been Enabled", "success");
		}
};