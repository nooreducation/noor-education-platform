export const COURSE_CONTENT = {
    id: "the-last-photo", // Unique slug
    title: "The Last Photo",
    level: "Niveau 1",
    slides: [
        {
            id: 'slide-0',
            type: 'SPLASH',
            title: 'Welcome!',
            image: '/course-assets/cover.png',
            description: 'Story 6 : Billy and the Queen'
        },
        {
            id: 'slide-1',
            type: 'STORY',
            title: 'Lisez l\'histoire',
            url: 'https://www.noor.tn/stories/his07/index.html'
        },
        {
            id: 'slide-2',
            type: 'MATCHING_PAIRS',
            title: 'Exercice 1 : Vocabulaire',
            instruction: 'Reliez chaque mot anglais à son équivalent français.',
            pairs: [
                { en: 'laugh', fr: 'rire' },
                { en: 'look for', fr: 'chercher' },
                { en: 'tired', fr: 'fatigué' },
                { en: 'picture', fr: 'image' },
                { en: 'want', fr: 'vouloir' },
                { en: 'wait', fr: 'attendre' }
            ]
        },
        {
            id: 'slide-3',
            type: 'DRAG_IMAGE',
            title: 'Exercice 2 : Identification',
            instruction: 'Sélectionnez le bon mot pour chaque image.',
            items: [
                { id: 1, image: '/course-assets/money.png', correct: 'money', options: ['money', 'a map', 'a box'] },
                { id: 2, image: '/course-assets/tent.png', correct: 'a tent', options: ['a tent', 'a house', 'a bag'] },
                { id: 3, image: '/course-assets/cap.png', correct: 'a cap', options: ['a hat', 'a cap', 'glasses'] },
                { id: 4, image: '/course-assets/man.png', correct: 'a man', options: ['a boy', 'a man', 'a doctor'] },
                { id: 5, image: '/course-assets/rucksack.png', correct: 'a rucksack', options: ['a rucksack', 'a suitcase', 'a packet'] },
                { id: 6, image: '/course-assets/newspaper.png', correct: 'a newspaper', options: ['a book', 'a newspaper', 'a letter'] }
            ]
        },
        {
            id: 'slide-4',
            type: 'GAP_FILL',
            title: 'Exercice 3 : Les Contraires',
            instruction: 'Complétez les paires de contraires.',
            pairs: [
                { word: 'old', opposite: 'new' },
                { word: 'near', opposite: 'far' },
                { word: 'happy', opposite: 'angry' },
                { word: 'cry', opposite: 'laugh' },
                { word: 'give', opposite: 'take' }
            ],
            bank: ['new', 'far', 'laugh', 'take', 'angry']
        },
        {
            id: 'slide-5',
            type: 'LABEL_IMAGE',
            title: 'Exercice 4 : Visage',
            instruction: 'Placez les étiquettes sur les bonnes parties du visage.',
            image: '/course-assets/who wants to be .png', // Placeholder or correct image
            labels: [
                { id: 'l1', text: 'a cap', x: 50, y: 10 },
                { id: 'l2', text: 'glasses', x: 50, y: 35 },
                { id: 'l3', text: 'a nose', x: 50, y: 50 },
                { id: 'l4', text: 'a beard', x: 50, y: 70 }
            ]
        },
        {
            id: 'slide-6',
            type: 'MATCHING_PAIRS',
            title: 'Exercice 5 : Verbes',
            instruction: 'Associez les verbes.',
            pairs: [
                { en: 'run', fr: 'courir' },
                { en: 'sleep', fr: 'dormir' },
                { en: 'eat', fr: 'manger' },
                { en: 'drink', fr: 'boire' }
            ]
        },
        {
            id: 'slide-7',
            type: 'GAP_FILL',
            title: 'Exercice 6 : Phrases',
            instruction: 'Complétez les phrases de l\'histoire.',
            pairs: [
                { word: 'Billy', opposite: 'wants' },
                { word: 'The Queen', opposite: 'laughs' }
            ],
            bank: ['wants', 'laughs', 'cries', 'sleeps']
        },
        {
            id: 'slide-8',
            type: 'DRAG_IMAGE',
            title: 'Exercice 7 : Objets',
            instruction: 'Identifiez ces nouveaux objets.',
            items: [
                { id: 1, image: '/course-assets/clock1.png', correct: 'clock', options: ['clock', 'watch', 'time'] },
                { id: 2, image: '/course-assets/clock2.png', correct: 'watch', options: ['clock', 'watch', 'band'] }
            ]
        },
        {
            id: 'slide-9',
            type: 'MATCHING_PAIRS',
            title: 'Exercice 8 : Révision',
            instruction: 'Révision du vocabulaire.',
            pairs: [
                { en: 'Photo', fr: 'Photo' },
                { en: 'Camera', fr: 'Appareil' },
                { en: 'Smile', fr: 'Sourire' }
            ]
        },
        {
            id: 'slide-10',
            type: 'GAP_FILL',
            title: 'Exercice 9 : Advanced',
            instruction: 'Niveau avancé.',
            pairs: [
                { word: 'Take', opposite: 'Give' },
                { word: 'Up', opposite: 'Down' }
            ],
            bank: ['Give', 'Down', 'Left', 'Right']
        },
        {
            id: 'slide-11',
            type: 'DRAG_IMAGE',
            title: 'Exercice 10 : Final',
            instruction: 'Dernière identification.',
            items: [
                { id: 1, image: '/course-assets/521661331105246.png', correct: 'tent', options: ['tent', 'house'] }
            ]
        },
        {
            id: 'slide-report',
            type: 'REPORT',
            title: 'Bilan de la leçon'
        }
    ]
};
