export const links = [
    { title: 'Профиль', url: '/profile', exact: true },
    { title: 'Научные работы', url: '/publications' },
    {
        title: 'Общие показатели',
        children: [
            { title: "Актуальные показатели", url: "/indicators/actual" },
            { title: "Показатели по годам", url: "/indicators/years" }
        ]
    },
    { title: 'Справочник', url: '/faculties' }
]