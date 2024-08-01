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
    }
];
export default function (user) {
    if (!user) return;
    if (user?.admin) {
        fields = [...fields, ...adminFields];
    }
    else {
        fields = [...fields, ...adminFields];
    }
    return fields;
};