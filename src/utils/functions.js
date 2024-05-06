export async function apiCall(url) {
    try {        
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }

}

export function objetoCompleto(obj) {
    const valores = Object.values(obj);

    if (valores.includes('')) {
        console.log('Hay valores vacios');
    } else{
        console.log('campos llenos');
    }

    if (Object.values(valores[6]).includes('') || Object.values(valores[7]).includes('')) {
        console.log('Llena los contactos');
    }
}