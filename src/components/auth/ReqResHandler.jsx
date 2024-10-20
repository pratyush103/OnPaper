import { jwtDecode } from 'jwt-decode'; // Named import
import { useContext } from 'react';
import { useAuth } from './AuthContext';

const AuthBaseURL = "https://onpaper-auth.wonderfultree-e5f4d080.centralindia.azurecontainerapps.io/Auth";



export const LoginHandler = async (email, password, setError, login, addToast) => {
    const endpoint = AuthBaseURL + "/LoginWithEmailPassword";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        

        const data = await ValidateResponse(response, addToast); // Parse JSON directly from response

        if (data.error) {
            const errorMessage = data.error.message.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + " : " + data.error.code;
            setError({ form: errorMessage });
            return;
        }

        if (data.idToken ) {
            const userInfo = JSON.stringify(data);
            login({ idToken: data.idToken, refreshToken: data.refreshToken }, userInfo);
            addToast('success', { Header: 'Success', Message: 'Logged in successfully!' });
            console.log("Login successful");
        } else {
            setError({ form: "Login failed. Please check your credentials and try again." });
        }
    } catch (e) {
        setError({ form: "Login failed. Please try again." });
        console.error('Error:', e);
    }
};
export const RegisterHandler = async (username, password, email, fullname, setErrors, login, addToast) => {

    const response = await fetch(`${AuthBaseURL}/Register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email, fullname }),
    });  

    const data = await ValidateResponse(response, addToast);

    if (data.error) {
        setErrors({ form: data.error.message.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + " : " + data.error.code });
        throw new Error(data.error.message);
    }

    if (data.idToken) {
        const userInfo = JSON.stringify(data);
        login({ idToken: data.idToken, refreshToken: data.refreshToken }, userInfo);
        addToast('success', { Header: 'Success', Message: 'Registration successful' });
        console.log("Registration successful");
    } else {
        setErrors({ form: "Registration failed. Please check your details and try again." });
    }
};


export const ValidateResponse = async (response, addToast) => {
    let responseBody = null;
    if (response.status != 200) {
        addToast('danger', { Header: `Error ${response.status}`, Message: 'Network response was not ok' }, true);
        throw new Error('Network response was not ok' + JSON.stringify(response));
    };

    try {
        try {
            responseBody = await response.json();
        } catch (e) {
            responseBody = response.data;
        }
        console.log(responseBody);
    } catch (e) {
        addToast('danger', { Header: 'Error', Message: `Invalid JSON string ${e.message}` }, true);
        throw new Error(`Invalid JSON string ${e.message}`);
    }
    
    if (responseBody.error) {
        const errorMessage = responseBody.error.message.toLowerCase()
            .replace(/[_]/g, ' ') // Replace underscores with spaces
            .replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + " : " + responseBody.error.code;

        addToast('danger', { Header: 'Error', Message: errorMessage }, true);
        throw new Error(errorMessage);
    }

    return responseBody;
};

export const VerifyToken = async (authToken, updateToken) => {
    const endpoint = AuthBaseURL + "/RefreshUserToken";
    const token = authToken;
    if (jwtDecode(token.idToken).exp > (Date.now() / 1000)) {
        return token.idToken;
    } else {
        console.log(token);
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authToken.refreshToken),
        });
        console.log(response);
        const data = await response.json(); // Parse JSON directly from response
        console.log(data);

        if (data.id_token && data.refresh_token) {
            updateToken(data.id_token, data.refresh_token);
            return data.id_token;
        } else {
            throw new Error("Token refresh failed");
        }
    }
};

