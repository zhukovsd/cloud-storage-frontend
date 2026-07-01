import {API_MOVE_FILES} from "../../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../../exception/ThrowSpecifyException.jsx";


export const sendMoveObject = async (source, target) => {
    if (import.meta.env.VITE_MOCK_FETCH_CALLS) {
        console.log("Mocked fetch call for move object");
        return;
    }

    console.log("Перемещение:");
    console.log( source + ' --> ' + target);

    const params = new URLSearchParams({from: source, to: target});

    const url = `${API_MOVE_FILES}?${params.toString()}`;

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
    });

    console.log("Ответ на запрос о перемещении: ");
    console.log(response);
    if (!response.ok) {
        console.log("Ошибка со статусом: " + response.status);
        const error = await response.json();
        throwSpecifyException(response.status, error);
    }

    return await response.json();

}
