import axios from "axios";

let palvelin = 'http://localhost:8080/';

export const getKysymykset = async () => {
    try {
        const response = await axios.get(palvelin + 'kysymys/all');
        return (response);
    } catch (error) {
        return ({ status: 400, message: 'Haku ei onnistunut: ' + error.message });
    }
}

export const addKysymys = async (kysymys) => {
    try {
        const response = await axios.post(palvelin + 'kysymys/add', kysymys, {
            headers: { 'Content-Type': 'application/json' }
        });
        return (response);
    } catch (error) {
        return ({ status: 400, message: 'Lisäys ei onnistunut: ' + error.message });
    }
}

export const updateKysymys = async (kysymys) => {
    try {
        const response = await axios.put(palvelin + 'kysymys/update', kysymys, {
            headers: { 'Content-Type': 'application/json' }
        });
        return (response);
    } catch (error) {
        return ({ status: 400, message: 'Päivitys ei onnistunut: ' + error.message });
    }
}

export const deleteKysymys = async (id) => {
    try {
        const response = await axios.delete(palvelin + 'kysymys/delete/' + id);
        return (response);
    } catch (error) {
        return ({ status: error.status, message: 'Poisto ei onnistunut: ' + error.message });
    }
}
