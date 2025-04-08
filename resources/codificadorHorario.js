const convertirDiasCompletos = (dias) => {
    const diasCompletos = {
        'L': 'Lunes',
        'M': 'Martes',
        'X': 'Miércoles',
        'J': 'Jueves',
        'V': 'Viernes',
        'S': 'Sábado',
        'D': 'Domingo'
    };

    return dias.map(dia => diasCompletos[dia] || dia);
};

const convertirHorasSemanalesAMediasHoras = (horas) => {
    return horas * 2;
};
