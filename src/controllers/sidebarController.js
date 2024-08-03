let fields = [
    {
        id: 0,
        label: 'Inicio',
        url: "/",
        icon: "home",
    },
];

const adminFields = [
    {
        id: 1,
        label: 'Agregar Escuelas',
        url: "/escuelas",
        icon: "buildings",
    },
    {
        id: 1,
        label: 'Agregar Cursos',
        url: "/cursos",
        icon: "building",
    },
    {
        id: 1,
        label: 'Agregar Alumnos',
        url: "/alumnos",
        icon: "user",
    },
    {
        id: 1,
        label: 'Agregar Examen',
        url: "/examenes",
        icon: "spreadsheet",
    },
];
export default function (user) {
    if (!user) return;

    if (user?.admin === 1) {
        fields = [...fields, ...adminFields];
    }
    return fields;
};