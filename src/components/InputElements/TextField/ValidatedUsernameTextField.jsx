import ValidatedTextField from "./ValidatedTextField.jsx";
import * as React from "react";
import {useEffect} from "react";


export default function ValidatedUsernameTextField({
                                                       username,
                                                       setUsername,
                                                       usernameError,
                                                       setUsernameError,
                                                       shouldValidate,
                                                       label = 'Имя пользователя'
                                                   }) {

    const minLength = window.APP_CONFIG.validUsername.minLength;
    const maxLength = window.APP_CONFIG.validUsername.maxLength;
    const namePattern = RegExp(window.APP_CONFIG.validUsername.pattern);

    const validateUsername = (value) => {

        let isValid = true;
        let errMessage = '';

        if (value && value.length < minLength && shouldValidate) {
            errMessage = 'Минимальная длина имени пользователя ' + minLength + ' символов. ';
            isValid = false;
        }
        if (value && !namePattern.test(value) && shouldValidate) {
            errMessage += 'Недопустимые символы в имени пользователя. ';
            isValid = false;
        }
        if (value && value.length > maxLength && shouldValidate) {
            errMessage += 'Максимальная длина имени пользователя: ' + maxLength + ' символов. ';
            isValid = false;
        }

        if (isValid) {
            setUsernameError('');
        } else {
            setUsernameError(errMessage);
        }
        setUsername(value);
    }

    useEffect(() => {
        validateUsername(username);
    }, [username])

    return (

        <ValidatedTextField
            id="username"
            label={label}
            placeholder="Латинские буквы и цифры "
            type="text"

            value={username}
            onChange={(e) => validateUsername(e.target.value)}
            error={usernameError}
            helperText={usernameError}
        />
    )
}
