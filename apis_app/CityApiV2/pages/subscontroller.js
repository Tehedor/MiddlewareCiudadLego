import NavBar from '../components/NavBar';

import withAuth from '../utils/withAuth';

import { mode_container,url_subcontrolapp } from '../utils/env.config';
const simulatorLink = mode_container ? 
    url_subcontrolapp 
    : 
    'http://localhost/subsControlApp/all';

function Simulator() {
    return (
        <div className="auth-container">
            <NavBar />
            <div className="form-container">
                <iframe 
                    src={simulatorLink}  
                    className="simulator-iframe"
                ></iframe> 
            </div>
            <style jsx>
            {`
                .auth-container {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #f4f4f9;
                    min-height: 100vh;
                }
                .form-container {
                    background: white;
                    padding: 0;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    flex: 1; /* Ocupa todo el espacio disponible */
                    display: flex;
                    flex-direction: column;
                    margin-top: 70px; /* Ajusta este valor según la altura de tu NavBar */
                }
                .simulator-iframe {
                    width: 100%;
                    height: calc(100vh - 70px); /* Ajusta este valor según la altura de tu NavBar */
                    border: 0;
                    flex: 1; /* Ocupa todo el espacio disponible */
                }
            `}
            </style>
        </div>
    );
}

export default withAuth(Simulator, true);
